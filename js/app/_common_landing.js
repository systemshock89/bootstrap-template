/**
 * @description Скрипты для Landing Page
 * version: 1.0.0
 */

$(function () {

    /* Верхнее меню */
    var navLi = $('.menu-top ul > li > a, .slicknav_nav > ul > li > a');

    // Выделение активного пункта при скролле
    $('.landing-block')
        .waypoint( function (dir) {
            var hash = $(this).attr('id');

            if (dir === "down") { //скролл сверху вниз
                menuItemSelect(navLi, hash);
            }
        }, {
            offset: $('header').height()
        })
        .waypoint( function (dir) {
            var hash = $(this).attr('id');

            if (dir === "up") { //скролл снизу вверх
                menuItemSelect(navLi, hash);
            }
        }, {
            offset: function() {
                return - $(this).outerHeight() + $('header').height();
            }
        });


    //ф-я подставляет активному пункту класс selected
    function menuItemSelect(navLi, hash){
        navLi.parent().removeClass('selected');

        $.each( navLi, function() {
            if ( $(this).attr('href').slice(1) === hash ){
                $(this).parent().addClass('selected');
            }
        });
    }

    //плавный скролл
    function smoothScroll(){
        var headerHeight = $('header').height();
        navLi.click(function (e) {
            e.preventDefault();

            var elementClick = $(this).attr("href"),
                destination = Math.round($(elementClick).offset().top),
                offset = 0;

            $('html, body').stop().animate( { scrollTop: destination - headerHeight - offset }, 800 );
        });
    }

    smoothScroll();
    $(window).resize(function () {
        smoothScroll();
    });
    /* /Верхнее меню */


    /* скролл хедера с position:fixed при маленьком размере окна */
    //$(document).scroll(function() {
    //    $( "header" ).css('left', -$(document).scrollLeft());
    //});
    /* /скролл хедера с position:fixed при маленьком размере окна */


    /* Прилипающий элемент */
    try {

        $('header').waypoint('sticky', {
            offset: $('header').height()
        });

        $('.sticky-element').waypoint('sticky', {
            offset: $('header').height()
        });

    } catch (err) {

    }
    /* /Прилипающий элемент */

}); // END READY