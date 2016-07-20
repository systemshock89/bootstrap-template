/**
 * @description Скрипты для Landing Page
 * version: 1.0.0
 */

$(function () {

    /* Fullpage.js */
    var navigationTooltipsArr = [],
        anchorsArr = [];
    $('.section').each(function(n){
        navigationTooltipsArr[n] = $(this).data('tooltip');  // Берем название секции из атрибута data-tooltip
        anchorsArr[n] = $(this).data('anchor');  // Берем название анкора из атрибута data-anchor
    });


    $('#fullpage').fullpage({
        menu: '#menu',
        // lockAnchors:true,
        anchors: anchorsArr,
        sectionsColor: ['#C63D0F', '#1BBC9B', '#7E8F7C'],
        scrollOverflow: true,
        scrollOverflowOptions: {
            interactiveScrollbars: false
        },
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: navigationTooltipsArr,
        showActiveTooltip: true,
        // paddingTop: '169px',
        paddingBottom: '0px', //нужно, чтоб можно было указать отступ сверху путем css
        loopBottom: true,
        afterLoad: function(){

            $.fn.fullpage.reBuild(); // чтоб не зависал скролл

            //убирать точки, если слайд только один
            if ( $('#fullpage section.section').size()> 1 ){
                $('#fp-nav').show();
            }
        }
    });
    // чтоб не зависал скролл
    setTimeout(function() {
        $.fn.fullpage.reBuild();
    }, 500);
    /* /Fullpage.js */


    // Плавный скролл по пуктам верхнего меню с выбором активного пункта, скролл по логотипу наверх
    // $('.menu-top ul li a, .slicknav_menu ul li a, .logo').mPageScroll2id({
    //     offset : $('header').height(),
    //     highlightClass: 'selected'
    // });

    //Плавный скролл по пуктам верхнего меню с выбором активного пункта, скролл по логотипу наверх
    try {
        $('.menu-top').standart_landing_menu_scroll({
            sections: $('section, .index_slider'), // секции, отображающиеся в виде пунктов верхнего меню
            nav: $('.menu-top ul li a, .slicknav_menu ul li a, .logo'), // сами пункты меню и логотип
            nav_height: $('header').outerHeight(), //  отступ сверхну, например от хедера
            offset: 150 // еще один отсуп, если нужно чтобы пункт меню становидся активным уже на подходе к секции
        });
    } catch (err) {

    }


    /* Прилипающий элемент */
    // try {
    //
    //     $('header').waypoint('sticky', {
    //         offset: $('header').height()
    //     });
    //
    //     $('.sticky-element').waypoint('sticky', {
    //         offset: $('header').height()
    //     });
    //
    // } catch (err) {
    //
    // }
    /* /Прилипающий элемент */

}); // END READY