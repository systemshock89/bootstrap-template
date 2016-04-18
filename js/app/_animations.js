/**
 * @description Анимации
 * version: 1.0.0
 */

$(function(){

    /* CSS3 анимации */
    //определяем анимации для всех анимируемых блоков
    var animations = {
        "animated-block-container":{
            //скролл сверху вниз CSS3
            down:function($this){
                $this.find('.item')
                    .removeClass('fadeOut')
                    .addClass('fadeInDown');
            },
            //скролл сверху вниз IE9
            ie9Down:function($this){
                elementVisibility($this.find('.item'));

                //if ie9. используем .animate()
                var positionY = 150;
                $this.find('.item')
                    .css('top', -positionY )
                    .stop()
                    .animate({
                        opacity: 1,
                        top: '+='+positionY
                    }, 500);
            },
            //скролл сверху вниз IE8
            ie8Down:function($this){
                elementVisibility($this.find('.item'));
            },

            //скролл снизу вверх CSS3
            up:function($this){
                $this.find('.item')
                    .removeClass('fadeInDown')
                    .addClass('fadeOut');
            },
            //скролл снизу вверх IE9
            ie9Up:function($this){
                elementVisibility($this.find('.item'));

                $this.find('.item')
                    .stop()
                    .animate({
                        opacity: 0
                    }, 500);
            },
            //скролл снизу вверх IE8
            ie8Up:function($this){
                elementVisibility($this.find('.item'));
            }
        }
    };

    //подключаем waypoint к блоку, в котором находятся анимируемые эл-ты
    $('#block1, #block2, #block3')
    //оффсет 80%
        .waypoint( function (dir) {

            if (dir === 'down') { //скролл сверху вниз
                differentBrowsersDown($(this));
            }
            else { //скролл снизу вверх
                differentBrowsersUp($(this));
            }

        }, {
            offset: '80%'
        })
        //350px от нижнего края
        .waypoint( function (dir) {

            if (dir === 'down') { //скролл вниз
                differentBrowsersUp($(this));
            }
            else { //скролл вверх
                differentBrowsersDown($(this));
            }

        }, {
            offset: function() {
                //высота блока-контейнера с анимациями минус высота хедера и еще 100px
                return - $(this).outerHeight() + $('header').height() + 100;
            }
        });

    // вызов функций анимации в зависимости от возможностей браузера (down)
    function differentBrowsersDown($this){
        if (Modernizr.cssanimations) {
            animations[$this.attr("data-key")].down($this);

        } else if (Modernizr.opacity)  {
            animations[$this.attr("data-key")].ie9Down($this);
        } else {
            animations[$this.attr("data-key")].ie8Down($this);
        }
    }

    // вызов функций анимации в зависимости от возможностей браузера (up)
    function differentBrowsersUp($this){
        if (Modernizr.cssanimations) {
            animations[$this.attr("data-key")].up($this);

        } else if (Modernizr.opacity)  {
            animations[$this.attr("data-key")].ie9Up($this);
        } else {
            animations[$this.attr("data-key")].ie8Up($this);
        }
    }

    //просто показываем элемент, без анимации
    function elementVisibility($this){
        $this.css('visibility','visible');
    }

    //зацикленная анимация
    var logo = $('header .logo');
    elementVisibility(logo);

    setInterval(function() {

        logo.removeClass('flip');
        setTimeout(function() {
            logo.addClass('flip');
        }, 100);

    }, 7000);
    /* /CSS3 анимации */

}); // END READY