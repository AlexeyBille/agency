var gulp         = require('gulp'), // Подключаем Gulp
	sass         = require('gulp-sass'), //Подключаем Sass пакет,
	browserSync  = require('browser-sync'), // Подключаем Browser Sync
	concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
	uglifyjs     = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
	uglifycss    = require('gulp-uglifycss'), // Подключаем gulp-uglifycss (для сжатия css)
	cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
	rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
	del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
	imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
	pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
	cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
	autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов

	gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'src' // Директория для сервера - src
		}
		});
});
	
gulp.task('sass', function(){ // Создаем таск Sass
	return gulp.src('src/s*ss/**/*.s*ss') // Берем источник
		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
		.pipe(gulp.dest('src/css')) // Выгружаем результата в папку src/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});



gulp.task('scripts', function() {
	return gulp.src([ // Берем все необходимые библиотеки
		'src/libs/jquery/dist/jquery.min.js', // Берем jQuery
		'src/libs/bootstrap/dist/js/bootstrap.min.js', // Берем Magnific Popup
		'src/libs/parallax.js/parallax.min.js' // Берем parallax.js
		])
		.pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
		.pipe(uglifyjs()) // Сжимаем JS файл
		.pipe(gulp.dest('src/js')); // Выгружаем в папку src/js
});
gulp.task('csss', function() {
	return gulp.src([ // Берем все необходимые библиотеки
		'src/libs/font-awesome/css/font-awesome.min.css', // Берем font-awesome
		'src/libs/bootstrap/dist/css/bootstrap.min.css' // Берем bootstrap
		])
		.pipe(concat('libs.min.css')) // Собираем их в кучу в новом файле libs.min.css
		.pipe(uglifycss()) // Сжимаем css файл
		.pipe(gulp.dest('src/css')); // Выгружаем в папку src/css
});

gulp.task('css-libs', ['sass'], function() {
	return gulp.src('src/css/libs.css') // Выбираем файл для минификации
		.pipe(cssnano()) // Сжимаем
		.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
		.pipe(gulp.dest('src/css')); // Выгружаем в папку src/css
});

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts', 'csss'], function() {
	gulp.watch('src/s*ss/**/*.s*ss', ['sass']); // Наблюдение за sass файлами в папке sass
	gulp.watch('src/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('src/js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
});

gulp.task('clean', function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {
	return gulp.src('src/img/**/*') // Берем все изображения из src
		.pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

gulp.task('build', ['clean', 'img', 'sass', 'scripts', 'csss'], function() {

	var buildCss = gulp.src([ // Переносим библиотеки в продакшен
		'src/css/**/*.css'
		])
	.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src('src/fonts/**/*') // Переносим шрифты в продакшен
	.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src('src/js/**/*') // Переносим скрипты в продакшен
	.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('src/*.html') // Переносим HTML в продакшен
	.pipe(gulp.dest('dist'));

});

gulp.task('clear', function (callback) {
	return cache.clearAll();
})

gulp.task('default', ['watch']);