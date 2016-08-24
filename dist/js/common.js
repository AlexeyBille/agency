$(function () {
    $(function () {
        $('ul.categories').on('click', 'li.btn:not(.active)', function () {
            $(this)
                .addClass('active').siblings().removeClass('active')
                .closest('div.tabs').find('div.items').removeClass('active').eq($(this).index()).addClass('active');
        });
    });
});

$(document).ready(function () {
    $("#sticker").sticky({
        topSpacing: 0
    });
    $('.go_to').click(function () { // ловим клик по ссылке с классом go_to
        var scroll_el = $(this).attr('href'); // возьмем содержимое атрибута href, должен быть селектором, т.е. например начинаться с # или .
        if ($(scroll_el).length != 0) { // проверим существование элемента чтобы избежать ошибки
            $('html, body').animate({
                scrollTop: $(scroll_el).offset().top - 200
            }, 800); // анимируем скроолинг к элементу scroll_el
        }
        return false; // выключаем стандартное действие
    });

    var s1 = $('#section-1').offset().top - 300;
    var s2 = $('#section-2').offset().top - 300;
    var s3 = $('#section-3').offset().top - 300;
    var s4 = $('#section-4').offset().top - 300;
    var s5 = $('#section-5').offset().top - 300;
    var s6 = $('#section-6').offset().top - 300;

    function toggleActiveClass(a) {
        $('.go_to.active').removeClass('active');
        $(".go_to:nth-child(" + a + ")").addClass('active')
    }
    $(window).scroll(function () {
        var bo = $("body").scrollTop();
        if (bo > s1) toggleActiveClass(1);
        if (bo > s2) toggleActiveClass(2);
        if (bo > s3) toggleActiveClass(3);
        if (bo > s4) toggleActiveClass(4);
        if (bo > s5) toggleActiveClass(5);
        if (bo > s6) toggleActiveClass(6);
    })
});