/**
 * @description Основные скрипты
 * version: 1.0.2
 */

$(function () {

    /* MINI КОРЗИНА */
    $('body').standart_load({force: 1, url: '/cart.php?dont_show=1'});

    $('.mini-cart-show-button').click(function () {
        $(this).closest('.mini-cart').toggleClass('show');
    });
    /* /MINI КОРЗИНА */


    /* Картинка для элемента по дефолту */
    $(".row .item").each(function () {
        var cur_img = $(this).find('img').attr('src');
        if (cur_img == "")
            $(this).find('img').attr({'src': 'img/empty_icon.png'});
    });
    /* /Картинка для элемента по дефолту */


    // задаем одинаковую высоту для элементов
    $(".catalog-products .item .img-container").matchHeight();
    $(".catalog-products .item .name").matchHeight();
    $(".catalog-gallery .item .img-container").matchHeight();
    $(".catalog-gallery .item .name").matchHeight();
    $(".catalog-sections .item .img-container").matchHeight();
    $(".catalog-sections .item .name").matchHeight();
    // /задаем одинаковую высоту для элементов

    
    /* Стартуем стандартную ajax обработку */
    $('form.standart_load,a.standart_load').standart_load();
    /* /Стартуем стандартную ajax обработку */


    /* Адаптивное верхнее меню */
    try {
        $('.menu-top').eq(0).slicknav({
            label: '',
            prependTo: '.menu-top-container',
            closeOnClick:true,
            allowParentLinks: true
        });
    } catch (err) {

    }
    /* /Адаптивное верхнее меню */


    // Отменить перетаскивание картинок и ссылок
    $("img, a").on("dragstart", function (event) {
        event.preventDefault();
    });


    /* Index Owl Slider */
    $(function() {
        if( $(".index_slider .owl-carousel").is("div") ){

            var owl =  $('.index_slider .owl-carousel');

            owl.owlCarousel({
                items: 1,
                loop: true,
                margin: 10,
                autoplay: true,
                autoplayTimeout: 12000,
                autoplayHoverPause: true,
                lazyLoad:true,
                nav: true,
                navText:  [
                    "",
                    ""
                ],
                // эффект FadeUp
                animateOut: 'owl-fadeUp-out',
                animateIn: 'owl-fadeUp-in'
            });

            owl.find('.owl-nav .owl-prev').attr('title', 'Предыдущий');
            owl.find('.owl-nav .owl-next').attr('title', 'Следующий');
        }
    });
    /* /Index Owl Slider */


    /* /Carousel Owl Slider */
    $(function () {
        if ($(".carousel_slider .owl-carousel").is("div")) {

            var owl = $('.carousel_slider .owl-carousel');

            owl.owlCarousel({
                autoplay: true,
                autoplayTimeout: 12000,
                autoplayHoverPause: true,
                lazyLoad:true,
                navText:  [
                    "",
                    ""
                ],
                dots: false,
                responsiveBaseElement: $('#overflow_div'),
                responsive:{
                    0:{
                        items:1,
                        margin: 5,
                        nav: false,
                        dots: true,
                        stagePadding: 25,
                        loop: true
                    },
                    768:{
                        items: 3,
                        margin: 10,
                        nav: true,
                        rewind:true
                    },
                    1170:{
                        items: 4,
                        margin: 10,
                        nav: true,
                        rewind:true
                    }

                }
            });

            owl.find('.owl-nav .owl-prev').attr('title', 'Предыдущий');
            owl.find('.owl-nav .owl-next').attr('title', 'Следующий');

            owl.on('mousewheel', '.owl-stage', function (e) {
                if (e.deltaY>0) {
                    owl.trigger('prev.owl');
                } else {
                    owl.trigger('next.owl');
                }
                e.preventDefault();
            });
        }
    });
    /* /Carousel Owl Slider */


    /* SYNCED Owl Slider */
    if ($(".synced_slider1 .owl-carousel").is("div")) {

        var sync1 = $(".synced_slider1 .owl-carousel"),
            sync2 = $(".synced_slider2 .owl-carousel"),
            carouselNext = sync2.parent().parent().find(".to_right"),
            carouselPrev = sync2.parent().parent().find(".to_left");

        sync1.owlCarousel({
            singleItem: true,
            autoPlay: 12000,
            stopOnHover: true,
            slideSpeed: 1000,
            navigation: false,
            pagination: false,
            afterAction: syncPosition,
            responsiveRefreshRate: 200,
            responsiveBaseWidth : $('#overflow_div'),
            touchDrag: false,
            mouseDrag: false,
            lazyLoad : true
        });

        sync2.owlCarousel({
            items: 3,
            itemsDesktop: [1200, 3],
            itemsDesktopSmall: [992, 3],
            itemsTablet: [768, 2],
            itemsMobile: [480, 2],
            pagination: false,
            navigation: true,
            lazyLoad : true,
            responsiveRefreshRate: 100,
            responsiveBaseWidth : $('#overflow_div'),
            afterInit: function (el) {
                el.find(".owl-item").eq(0).addClass("synced");
            },
            afterAction: function () {
                if (this.itemsAmount > this.visibleItems.length) {
                    $(carouselNext).show();
                    $(carouselPrev).show();

                    $(carouselNext).removeClass('disabled');
                    $(carouselPrev).removeClass('disabled');
                    if (this.currentItem == 0) {
                        $(carouselPrev).addClass('disabled');
                    }
                    if (this.currentItem == this.maximumItem) {
                        $(carouselNext).addClass('disabled');
                    }

                } else {
                    $(carouselNext).hide();
                    $(carouselPrev).hide();
                }
            }
        });

        $(".synced_slider2 .owl-carousel").on("click", ".owl-item", function (e) {
            e.preventDefault();
            var number = $(this).data("owlItem");
            sync1.trigger("owl.goTo", number);
        });

    }

    function syncPosition(el) {
        var current = this.currentItem;
        $(".synced_slider2 .owl-carousel")
            .find(".owl-item")
            .removeClass("synced")
            .eq(current)
            .addClass("synced");
        if ($(".synced_slider2 .owl-carousel").data("owlCarousel") !== undefined) {
            center(current)
        }
    }

    function center(number) {
        var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
        var num = number;
        var found = false;
        for (var i in sync2visible) {
            if (num === sync2visible[i]) {
                found = true;
            }
        }

        if (found === false) {
            if (num > sync2visible[sync2visible.length - 1]) {
                sync2.trigger("owl.goTo", num - sync2visible.length + 2)
            } else {
                if (num - 1 === -1) {
                    num = 0;
                }
                sync2.trigger("owl.goTo", num);
            }
        } else if (num === sync2visible[sync2visible.length - 1]) {
            sync2.trigger("owl.goTo", sync2visible[1])
        } else if (num === sync2visible[0]) {
            sync2.trigger("owl.goTo", num - 1)
        }

    }

    /* /SYNCED Owl Slider */


    /* placeholder */
    if ($('input').attr('placeholder') || $('textarea').attr('placeholder')) {
        $.getScript('https://cdnjs.cloudflare.com/ajax/libs/jquery-placeholder/2.3.1/jquery.placeholder.min.js', function () {

            $('input[placeholder], textarea[placeholder]').placeholder();

        });
    }
    /* /placeholder */


    /* fancybox для картинок в контенте */
    // adds .naturalWidth() and .naturalHeight() methods to jQuery
    // for retreaving a normalized naturalWidth and naturalHeight.
    (function($){
        var
            props = ['Width', 'Height'],
            prop;

        while (prop = props.pop()) {
            (function (natural, prop) {
                $.fn[natural] = (natural in new Image()) ?
                    function () {
                        return this[0][natural];
                    } :
                    function () {
                        var
                            node = this[0],
                            img,
                            value;

                        if (node.tagName.toLowerCase() === 'img') {
                            img = new Image();
                            img.src = node.src,
                                value = img[prop];
                        }
                        return value;
                    };
            }('natural' + prop, prop.toLowerCase()));
        }
    }(jQuery));

    $('.content-wrapper .container p img').each(function(){
        if(
            //$(this).attr('style').indexOf('width:') != -1 &&
            $(this).attr('style').indexOf('max-width:') == -1 &&
            !$(this).attr('class') &&
            ( $(this).width() <  $(this).naturalWidth() || $(this).height() <  $(this).naturalHeight() ) //если размер натуральной картинки больше чем показываемой картинки
        ){
            // Формируем фансибокс ссылку
            var $a_elem = $("<a href='" + $(this).attr('src') + "' title='" + $(this).attr('alt') + "' style='" + $(this).attr('style') + ";display: block;'  class='fancybox-thumb img-container'></a>");
            // добавляем к ней код текущего элемента
            $(this).css('margin',0);
            $a_elem.append($(this).clone());
            // Производим подмену с текущим элементом

            $(this).replaceWith($a_elem);
        }
    });
    /* /fancybox для картинок в контенте */


    /* /fancybox3 beta1 */
    try {
        if ($("a").is(".fancybox-thumb")) {

            /* Подрубаем галерею */
            $(".fancybox-thumb").fancybox({
                openEffect: 'none',
                closeEffect: 'elastic',
                prevEffect: 'fade',
                nextEffect: 'fade',
                //theme : 'dark',
                //locked : false,
                padding: 0,
                caption: {
                    type: 'outside'
                },
                arrows: '!isTouch',
                helpers: {
                    thumbs: {
                        width: 50,
                        height: 50
                    }
                },
                locale: 'ru',
                locales: {
                    'ru': {
                        CLOSE: 'Закрыть',
                        NEXT: 'Следующий',
                        PREV: 'Предыдущий',
                        ERROR: 'Запрашиваемый слайд не может быть загружен.<br/> Пожалуйста, повторите попытку позже.',
                        EXPAND: 'Показать оригинальный размер',
                        SHRINK: 'Вписать в экран',
                        PLAY_START: 'Просмотр слайдшоу',
                        PLAY_STOP: 'Поставить показ слайдов на паузу'
                    }
                },
                // размытие
                beforeLoad: function() {
                    $('#overflow_div, footer').addClass('blur');
                },
                beforeClose: function() {
                    $('#overflow_div, footer').removeClass('blur');
                }
            });

            /* Открываем автоматом по id через класс */
            var start_id = window.location.href.indexOf("#");
            if (start_id > 0) {
                var id = window.location.href.substring(start_id + 1);
                $('a.fancybox-thumb.id' + id).click();
            }

            /* обновляем при ресайзе */
            $(window).resize(function () {
                $.fancybox.update();
            });
        }
    } catch (err) {

    }
    /* /fancybox3 beta1 */


    /* Табы */
    $('.tabs-controls > .item').on('click', function (e) {
        e.preventDefault();

        var item = $(this),
            contentItem = $(this).parent().parent().find('.tabs-list > .item'),
            itemPosition = item.index();

        contentItem.eq(itemPosition)
            .add(item)
            .addClass('active')
            .siblings()
            .removeClass('active');
    });
    /* /Табы */


    /* кнопка Наверх */
    toTop();
    function toTop() {
        $('body').append('<div class="toTop" title="Наверх"></div>');

        var toTop = $('.toTop'),
            contentBlock = $('.container'), // блок с контентом сайта
            toTopOffset = 30, // отступ кнопки от контента в px
            documentWidth,
            contentBlockWidth,
            contentOfsetLeft,
            toTopWidth = toTop.width();

        $(window).scroll(function () {
            if ($(this).scrollTop() != 0) {
                toTop.stop().fadeIn();
            } else {
                toTop.stop().fadeOut();
            }
        });

        toTop.click(function () {
                $('body,html').animate({scrollTop: 0}, 500);

            })
            .hover(
                function () {
                    $(this).stop().animate({
                        opacity: 1
                    }, 250);
                }, function () {
                    $(this).stop().animate({
                        opacity: 0.3
                    }, 250);
                }
            );


        //определение позиции кнопки "Наверх"
        if (contentBlock.size() > 0) { // если указанный блок с контентом существует
            toTopPosition();

            $(window).resize(function () {
                toTopPosition();
            });
        }
        function toTopPosition() {
            documentWidth = $(document).width();
            contentBlockWidth = contentBlock.width();

            contentOfsetLeft = (documentWidth - contentBlockWidth) / 2;

            if (documentWidth <= (contentBlockWidth + (toTopOffset + toTopWidth) * 2 )) {
                // когда ширина окна браузера меньше чем ширина контента + ширина кнопки Назад
                toTop.css('left', 15);
            } else {
                // когда ширина окна браузера больше чем ширина контента + ширина кнопки Назад
                toTop.css('left', contentOfsetLeft - toTopWidth - toTopOffset);
            }
        }
    }
    /* /кнопка Наверх */


    /* WIDGET PHONE */
    if ($('.widget-phone').size() > 0) {
        $('.widget-phone').standart_widgetPhone({
            // widgetTimer: 0, // таймер ,по истечении которого появится виджет
            //contentBlock: $('#overflow_div'), // блок с контентом сайта (для позиционирования виджета)
        });
    }
    /* /WIDGET PHONE */


    /* КАРТА YANDEX*/
    try {
        if ($('#map').size() > 0) {

            var myMap;

            function init() {
                // Создание экземпляра карты и его привязка к контейнеру с
                // заданным id ("map").
                myMap = new ymaps.Map('map', {
                    // При инициализации карты обязательно нужно указать
                    // её центр и коэффициент масштабирования.
                    center: [55.76, 37.64],
                    zoom: 10
                });

                // Создаем геообъект с типом геометрии "Точка".
                myGeoObject = new ymaps.GeoObject({
                    // Описание геометрии.
                    geometry: {
                        type: "Point",
                        coordinates: [55.76, 37.64]
                    },
                    // Свойства.
                    properties: {
                        // Контент метки.
                        iconContent: 'Москва златоглавая',
                        hintContent: 'Дополнительная инфа всплывает'
                    }
                }, {
                    // Опции.
                    // Иконка метки будет растягиваться под размер ее содержимого.
                    preset: 'islands#blackStretchyIcon',
                    // Метку можно перемещать.
                    draggable: false
                });

                myMap.behaviors.disable('scrollZoom');

                myMap.geoObjects
                    .add(myGeoObject);

                // ховер на геообъект
                myGeoObject.events
                    .add('mouseenter', function (e) {
                        // Ссылку на объект, вызвавший событие,
                        // можно получить из поля 'target'.
                        e.get('target').options.set('preset', 'islands#redStretchyIcon');
                    })
                    .add('mouseleave', function (e) {
                        e.get('target').options.set('preset', 'islands#blackStretchyIcon');
                    });

            }

            // Дождёмся загрузки API и готовности DOM.
            ymaps.ready(init);
        }
    } catch (err) {

    }
    /* /КАРТА YANDEX*/


}); // END READY


var Load = function (url, param) { // Функция для стандартизации общения с сервером
    $.post(
        url,
        param,
        function (data) {
            var sc_ = '';
            if (data['script']) {
                sc_ = data['script'];
                delete data['script'];
            }
            for (i in data) {
                $(i).html(data[i]);
            }
            eval(sc_);
        },
        'json'
    );
};


var Message = function (message) { // Всплывающее сообщение на базе наработки standart_window

    $('.window.message').remove();
    /* Удалилил старое окно */
    /* Добавлеяем новое окно */
    $('body').append(
        '<div class="window message">' +
        '<div class="window-popup-overflower"></div>' +
        '    <div class="window_body">' +
        '        <div class="close">x</div>' +
        '        <div class="content">' +
        '            <div class="block">' +
        message +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>');

    $('.window.message').standart_window();
};


//Скрипт добавления ссылки на источник при копировании
function addLink() {
    //Get the selected text and append the extra info
    var selection = window.getSelection(),
        pagelink = '<br /><br /> Подробнее: ' + document.location.href,
        copytext = selection + pagelink,
        newdiv = document.createElement('div');

    //hide the newly created container
    newdiv.style.position = 'absolute';
    newdiv.style.left = '-99999px';

    //insert the container, fill it with the extended text, and define the new selection
    document.body.appendChild(newdiv);
    newdiv.innerHTML = copytext;
    selection.selectAllChildren(newdiv);

    window.setTimeout(function () {
        document.body.removeChild(newdiv);
    }, 100);
}
document.addEventListener('copy', addLink);