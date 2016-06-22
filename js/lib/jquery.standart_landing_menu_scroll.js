/**
 * @description Плавный скролл по пуктам верхнего меню с выбором активного пункта, скролл по логотипу наверх
 * version: 1.0.1
 */

jQuery.fn.standart_landing_menu_scroll = function(options){

    var options = jQuery.extend({
        sections: $('section'), // секции, отображающиеся в виде пунктов верхнего меню
        nav: $('.menu-top ul li a, .slicknav_menu ul li a, .logo'), // сами пункты меню и логотип
        nav_height: 0, //  отступ сверхну, например от хедера
        offset: 0, // еще один отсуп, если нужно чтобы пункт меню становидся активным уже на подходе к секции
        speed: 500, //скорость анимации скролла
        updateHash: false // Обновлять URL ссылки во время прокрутки
    },options);

    return this.each(function() {

        // плавная прокрутка для пунктов верхнего меню
        options.nav.bind('click', function (e) {
            e.preventDefault();

            showSection($(this).attr('href'), true, options.sections, options.nav_height);

        });

        // мгновенная прокрутка к нужной секции, если перещли по ссылке с хешом (нужен таймаут, чтоб загрузились слайдеры и другие скрипты)
        setTimeout(function () {
            showSection(window.location.hash, false, options.sections, options.nav_height);
        }, 100);

        $(window).scroll(function () {
            checkSection(options.sections, options.nav, options.nav_height);
        });


        // ф-я плавной прокрутки к выбранному пункту меню
        function showSection(sectionHash, isAnimate, sections, nav_height) {
            var
                direction = sectionHash.replace(/#/, ''),
                reqSection,
                reqSectionPos;

            if( direction === 'top' ){
                $('body,html').stop().animate({scrollTop: 0}, options.speed, function() {
                    history.pushState("", document.title, window.location.pathname  + window.location.search);
                });
                return false;
            }

            if(direction){
                reqSection = sections.filter('[data-section="' + direction + '"]');
                reqSectionPos = reqSection.offset().top - nav_height + 1;
            } else{
                return false;
            }

            if (isAnimate){
                $('body, html').stop().animate({scrollTop: reqSectionPos}, options.speed);
            } else {
                $('body, html').scrollTop(reqSectionPos);
            }

        }

        //ф-я, которая будет определять, видно ли сейчас данную секцию или нет и ставить активный пункт меню ти хеш
        function checkSection(sections, nav, nav_height) {
            sections.each(function () {
                var
                    $this = $(this),
                    topEdge = $this.offset().top - nav_height - options.offset,
                    bottomEdge = topEdge + $this.height(),
                    wScroll = $(window).scrollTop();

                if (topEdge < wScroll && bottomEdge > wScroll){
                    var
                        currentId = $this.data('section'),
                        reqLink = nav.filter('[href="#' + currentId + '"]');

                    nav.closest('li').removeClass('selected');
                    reqLink.closest('li').addClass('selected');

                    if(currentId){
                        if(options.updateHash){
                            window.location.hash = currentId;
                        }
                    }
                   
                }
            });

        }

    });
};