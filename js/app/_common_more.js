/**
 * @description Дополнительные скрипты
 * version: 1.0.0
 */

$(function () {

    /* ЭЛЕМЕНТЫ КАТАЛОГА */
    if ($('.catalog .catalog-container .item').size() > 0) {

        var curPositionTop = $('.catalog .catalog-container > .item').eq(0).position().top, //берем позицию первого эл-та
            elementsInRow = []; //массив, в кот-й помещаем элементы, находящиеся на одной строке

        $('.catalog .catalog-container').each(function () {

            var catalog = $(this),
                catalog_item_height = 0;

            catalog.find('.item').each(function () {

                /* Картинка по дефолту */
                var cur_img = $(this).find('.img-container img').attr('src');
                if (cur_img == "")
                    $(this).find('.img-container img').attr({'src': '/img/empty_icon.png'});
                /* /Картинка по дефолту */


                /* Выравнивание высоты*/
                //если эл-ты находятся на одной строке
                if ($(this).position().top != curPositionTop) {

                    curPositionTop = $(this).position().top;

                    for (var k in elementsInRow) {
                        elementsInRow[k].height(catalog_item_height);
                    }

                    catalog_item_height = $(this).height();

                    elementsInRow = [];

                }

                elementsInRow.push($(this));

                var cur_height = $(this).height();
                if (cur_height > catalog_item_height)
                    catalog_item_height = cur_height;

                /* Выравнивание высоты*/
            });

            //для последней строки элементов, если она не полная, повторяем
            for (var k in elementsInRow) {
                elementsInRow[k].height(catalog_item_height);
            }
            elementsInRow = [];
        });

    }
    /* /ЭЛЕМЕНТЫ КАТАЛОГА */


    /* Переносим правый блок вправо */
    $('.floatblock.center-min, .floatblock.center-middle').before($('.floatblock.right').show());
    $('.padding-right').hide();
    /* /Переносим правый блок вправо */


    /* Стартуем слайдеры */
    if ($(".standart_slider").is(".index_slider2")) {
        $.getScript('/js/lib/jquery.standart.slider.js', function () {

            $('.index_slider2').standart_slider({
                timeout: 12000,
                time: 400,
                timer: 1, /* Включение-выключение перелистывания */
                size: 1, /* Количество отображаемых обьектов в окне показов */
                type: 'scroll_horiz'
            });

        });
    }
    if ($(".standart_slider").is(".tovar_slider2")) {
        $.getScript('/js/lib/jquery.standart.slider.js', function () {

            $('.tovar_slider2').standart_slider({
                timeout: 12000,
                time: 400,
                timer: 1, /* Включение-выключение перелистывания */
                size: 1, /* Количество отображаемых обьектов в окне показов */
                type: 'scroll_horiz'
            });

        });
    }
    /* /Стартуем слайдеры */


    /* uniform */
    if ($('input[type=checkbox]')) { //checkbox
        $('head').append("<link rel='stylesheet' type='text/css'  href='/css/uniform.default.min.css'/>");
        $('head').append("<link rel='stylesheet' type='text/css'  href='/css/uniform.checkbox.css'/>"); //стили checkbox
        $.getScript('/js/lib/jquery.uniform.min.js', function () {

            $('input[type=checkbox]').uniform();

        });
    }
    if ($('input[type=radio]')) { //radio
//        $('head').append("<link rel='stylesheet' type='text/css'  href='/css/uniform.default.min.css'/>");
        $('head').append("<link rel='stylesheet' type='text/css'  href='/css/uniform.radio.css'/>"); //стили radio
        $.getScript('/js/lib/jquery.uniform.min.js', function () {

            $('input[type=radio]').uniform();

        });
    }
    if ($('select').is('.uniform')) { //select
//        $('head').append("<link rel='stylesheet' type='text/css'  href='/css/uniform.default.min.css'/>");
        $('head').append("<link rel='stylesheet' type='text/css'  href='/css/uniform.select.css'/>"); //стили select
        $.getScript('/js/lib/jquery.uniform.min.js', function () {

            $('select.uniform').uniform();

        });
    }
    /* /uniform */


    /* selectik */
    if ($('select').is('.selectik')) {
        $('head').append("<link rel='stylesheet' type='text/css'  href='/css/selectik.css'/>");
        $.getScript('/js/lib/jquery.mousewheel.js', function () {
            $.getScript('/js/lib/jquery.selectik.min.js', function () {

                $('select.selectik').selectik({maxItems: 8, minScrollHeight: 20});

            });

        });
    }
    /* /selectik */


    /* Slider-range с возможностью вводить значения */
    /* НЕ ЗАБЫТЬ:
     подставить перед document.ready условия, проверяющие, заданы ли параметры слайдера range через php, либо подставляющие дефолтные значения
     ( они здесь находятся внизу файла) */
    if ($('div').is('.slider-range')) {
        $('head').append("<link rel='stylesheet' type='text/css'  href='/css/jquery-ui.css'/>");
        $.getScript('/js/lib/jquery-ui.min.js', function () {
            var slider_range, input_value_1, input_value_2;

            // параметры, задаваемые пользователем в инпутах
            input_value_1 = $(".slider_range_input_values.input_value1");
            input_value_2 = $(".slider_range_input_values.input_value2");
            if (input_value_1.val() != "")
                slider_range_val1 = input_value_1.val();
            if (input_value_2.val() != "")
                input_value_2 = input_value_2.val();

            slider_range = $(".slider-range").slider({
                range: true,
                min: slider_range_min,
                max: slider_range_max,
                values: [slider_range_val1, slider_range_val2],
                step: slider_range_step,
                slide: function (event, ui) { //cобытие происходит на каждое движении мыши, при перетаскивании рукоятки ползунка

                    stepRange(parseInt(ui.values[0]), parseInt(ui.values[1]), slider_range_max);
                },
                stop: function (event, ui) { //событие происходит в момент завершения перетаскивания рукоятки ползунка.

                    stepRange(parseInt(ui.values[0]), parseInt(ui.values[1]), slider_range_max);

                }
            });

            //дефолтные значения цены у input-ов
            input_value_1.val(slider_range_val1);
            input_value_2.val(slider_range_val2);

            inputRestriction(input_value_1);
            inputRestriction(input_value_2);

            // при вводе значения в инпут 1 проверять, боьше, либо равно оно значению в инпуте 2
            input_value_1.change(function () {

                var val1 = parseInt($(this).val());
                var val2 = parseInt(input_value_2.val());
                var stepRangeVal = Math.max(Math.round(slider_range_max * 0.05), 1); //вычисление минимального расстояния, которое остается между бегунками
                if (val2 - val1 < stepRangeVal) {
                    val2 = Math.min(val1 + stepRangeVal, slider_range_max);
                    val1 = val2 - stepRangeVal;
                    input_value_1.val(val1);
                    input_value_2.val(val2);
                }
                slider_range.slider({values: [val1, val2]});

            });

            // при вводе значения в инпут 2 проверять, меньше, либо равно оно значению в инпуте 1
            input_value_2.change(function () {

                var val1 = parseInt(input_value_1.val());
                var val2 = parseInt($(this).val());
                var stepRangeVal = Math.max(Math.round(slider_range_max * 0.05), 1); //вычисление минимального расстояния, которое остается между бегунками
                if (val2 - val1 < stepRangeVal) {
                    val1 = Math.max(val2 - stepRangeVal, 0);
                    val2 = val1 + stepRangeVal;
                    input_value_1.val(val1);
                    input_value_2.val(val2);
                }
                slider_range.slider({values: [val1, val2]});

            });

            //ф-я позволяющая вводить в инпут только цифры
            function inputRestriction(item) {
                item.keypress(function (event) {
                        if ((event.which > 57 || event.which < 48) && event.which != 8)
                            event.preventDefault();
                    })
                    .change(function () {
                        input_value_1.val(input_value_1.val());
                        input_value_2.val(input_value_2.val());
                    });
            }

            function stepRange(val1, val2, max) {

                var stepRangeVal = Math.max(Math.round(max * 0.05), 1); //вычисление минимального расстояния, которое остается между бегунками

                if (val2 - val1 < stepRangeVal) {
                    val2 = Math.min(val1 + stepRangeVal, max);
                    val1 = val2 - stepRangeVal;
                }

                // записываются значения бегунков в input-ы цены "от ... до"
                input_value_1.val(val1);
                input_value_2.val(val2);
                slider_range.slider({values: [val1, val2]});
            }
        });
    }
    /* /Slider-range с возможностью вводить значения */


    /* scrollbar */
    if ($('div').is('.content-with-scroll')) {
        $('head').append("<link rel='stylesheet' type='text/css'  href='/css/jquery.scrollbar.css'/>");
        $.getScript('/js/lib/jquery.scrollbar.min.js', function () {

            $('.content-with-scroll').scrollbar();

        });
    }
    /* /scrollbar */


    /* свернуть-развенуть */
    $('.parametr.block').find('.checkbox-container').removeClass('expand').hide();
    $('.see-all').html('Показать всё');
//    по умолчанию показываем только 4 пункта у каждой характеристики


    $('.parametr.block').each(function () {
        for (var i = 0; i <= 3; i++) {
            $(this).find('.checkbox-container').eq(i).show();
        }
    });

    $('.see-all').click(function () {  // при клике на "Показать всё"
        if ($(this).hasClass('expand')) {
            $(this).parent().find('.checkbox-container').hide();
            for (var i = 0; i <= 3; i++) {
                $(this).parent().find('.checkbox-container').eq(i).show();
            }
            $(this).removeClass('expand');
            $(this).html('Показать всё');
        } else {
            $(this).parent().find('.checkbox-container').show();
            $(this).addClass('expand');
            $(this).html('Свернуть');
        }
    });
    /* /свернуть-развенуть */


    /* развернуть список услуг */
    $('.uslugi .item .button.more').click(function (e) {
        e.preventDefault();

        var block = $(this).parent().find('.text-container'),
            heightBlockFull = block.find('.text').height(),
            btnTextOpened = 'Свернуть';

        if (typeof heightBlock == 'undefined') {
            heightBlock = block.height();
        }

        if (typeof btnTextClosed == 'undefined') {
            btnTextClosed = $(this).html();
        }

        if ($(this).hasClass('opened')) {

            block.animate({
                height: heightBlock
            }, 500);
            $(this).removeClass('opened');
            $(this).html(btnTextClosed);

        } else {

            block.animate({
                height: heightBlockFull
            }, 500);
            $(this).addClass('opened');
            $(this).html(btnTextOpened);
        }
    });
    /* развернуть список услуг */


    /* jquery.form*/
    if ($(".open-popup").is('div')) {
        $.getScript('/js/lib/jquery.form.min.js', function () {
        });
    }
    /* jquery.form*/


}); // END READY



/* условия, проверяющие, заданы ли параметры слайдера range через php, либо подставляющие дефолтные значения */
if (slider_range_val1 == null)
    var slider_range_val1 = 7500;

if (slider_range_val2 == null)
    var slider_range_val2 = 24000;

if (slider_range_min == null)
    var slider_range_min = 0;

if (slider_range_max == null)
    var slider_range_max = 32000;

if (slider_range_step == null)
    var slider_range_step = 50;
/* /условия, проверяющие, заданы ли параметры слайдера range через php, либо подставляющие дефолтные значения */


/* кастомный input file */
/**
 * Кастомный инпут - клик
 */
function customInputFile(obj) {
    obj.click();
}

/**
 * Вставляет название файла в кастомный инпут
 * @param obj
 */
function setInputFileName(obj) {
    if (obj.val() !== '') {
        obj.parent().find('.file-name').html('<img class="clear-input-file" src="img/close.png" onclick="clearInputFile($(this))" alt=""/>')
            .css('display', 'inline-block')
            .append(obj.val().replace(/.*[\\\/](.*)/, "$1"))
            .parent().parent().find('.validation-informer').hide();
    } else {
        obj.parent().find('.file-name').html('');
    }
}

/**
 * Очистка поля файл
 * @param obj
 */
function clearInputFile(obj) {
    obj.parent().html('').hide()
        .parent().parent().find('input[type=file]').val('')
}
/* /кастомный input file */
