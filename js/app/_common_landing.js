/**
 * @description Скрипты для Landing Page
 * version: 1.0.0
 */

$(function () {


    //НОВОЕ МЕНЮ
    var menu_offset = $('header').height();
    $(window).resize(function () {
        menu_offset = $('header').height();
    });
    $('.menu-top ul li a, .slicknav_menu ul li a').on('click', function(e){
        e.preventDefault();
        showSection($(this).attr('href'), true, menu_offset);
    });

    showSection(window.location.hash, false, menu_offset);

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

    //Возвращение в начало при клике на лого
    $( ".logo" ).click(function(e) {
        e.preventDefault();
        $('body, html').animate({scrollTop: 0}, 500, function(){
            window.location.href.substr(0, window.location.href.indexOf('#'));
        });
    });

}); // END READY


//НОВОЕ МЕНЮ
$(window).scroll(function(){
    checkSection();
});

//ф-я скролла по пунктам верхнего меню
function showSection(section, isAnimate, menu_offset){
    var
        direction = section.replace(/#/, ''),
        reqSection = $('.landing-section').filter('[data-section="' + direction + '"]'),
        reqSectionPos = reqSection.offset().top - menu_offset + 1;

    if (isAnimate) {
        $('body, html').animate({scrollTop: reqSectionPos}, 500);
    } else {
        $('body, html').scrollTop(reqSectionPos);
    }

}

//ф-я определения, находимся ли в границах секции или нет
function checkSection(){
    $('.landing-section').each(function(){
        var
            $this = $(this),
            topEdge = $this.offset().top - $('header').height(), // верхняя граница секции
            bottomEdge = topEdge + $this.height(), // нижняя граница секции
            wScroll = $(window).scrollTop(); // на сколько проскроллили страницу

        if (topEdge < wScroll && bottomEdge > wScroll) { //если находимся в пределах секции
            var
                currentId = $this.data('section'),
                reqLink = $('.menu-top ul li a, .slicknav_menu ul li a').filter('[href="#' + currentId + '"]');

            $('.menu-top ul li, .slicknav_menu ul li').removeClass('selected');
            reqLink.closest('li').addClass('selected');

            window.location.hash = currentId;
        }

    });
}

