/**
 * @description Скрипты для Landing Page
 * version: 1.0.0
 */

$(function () {

    // Плавный скролл по пуктам верхнего меню с выбором активного пункта, скролл по логотипу наверх
    $('.menu-top ul li a, .slicknav_menu ul li a, .logo').mPageScroll2id({
        offset : $('header').height(),
        highlightClass: 'selected'
    });


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