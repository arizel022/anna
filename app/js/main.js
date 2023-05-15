

/*


// плавный скролл на Партнеры на главной, с других страниц - перенаправление
// Ожидаем полной загрузки DOM, чтобы начать работу скрипта
$(document).ready(function () {
    // Проверяем, является ли текущая страница главной страницей путем проверки наличия класса "home" у элемента body
    var isHomepage = $("body.home").length > 0;
    // Находим все ссылки, у которых href="#partners-main-section", и назначаем им обработчик события "click"
    $('a[href="#partners-main-section"]').on('click', function (e) {
        // Находим элементы с классами "burger-button" и "mobile-menu" и удаляем у них класс "active"
        $('.burger-button').removeClass('active');
        $('.mobile-menu').removeClass('active');
        // Отменяем стандартное поведение при клике на ссылку
        e.preventDefault();
        // Находим целевой элемент, к которому нужно выполнить плавный скролл, используя значение атрибута "href" из кликнутой ссылки
        var target = $($(this).attr('href'));
        // Если текущая страница является главной
        if (isHomepage) {
            // Если целевой элемент найден
            if (target.length) {
                // Выполняем плавный скролл к целевому элементу, отнимая от его верхней позиции высоту заголовка и 100 пикселей, и анимируя это действие в течение 1000 миллисекунд
                $('html, body').animate({
                    scrollTop: target.offset().top - $('header').height() - 100
                }, 1000);
            }
        } else { // Если текущая страница не является главной
            // Перенаправляем пользователя на главную страницу с якорем "partners-main-section"

            //этот путь - для сервера на гитхабе
            window.location.href = '/myph/#partners-main-section';
            //второй путь - для нашего сервера
            // window.location.href = '/#partners-main-section';
        }
    });
});





//при клике на бургер-кнопку сама кнопка меняется/появляется меню
$(function () {
    $('.burger-button').click(function () {
        $(this).toggleClass('active');
        $('.main-title-ghost').toggleClass('active');
        $('body').toggleClass('lock');
        $('.mobile-menu').toggleClass('active');
    });
});

//текст лейбла занимает место над полем при фокусе на поле
$(function () {
    $('.form__input').on('focus blur', function () {
        var label = $(this).parent('.form__label');
        if ($(this).val() === '') {
            if (event.type === 'focus') {
                label.addClass('focused');
            } else if (event.type === 'blur') {
                label.removeClass('focused');
            }
        } else {
            label.addClass('focused');
        }
    });
});


$(function () {
    $('.gallery__slider').slick({
        dots: true,
        slidesToShow: 1,
        infinite: true,
        autoplaySpeed: 5000,
        autoplay: true,
        arrows: false
    });
});



//галерея с увеличением по клику, можно использовать на любой странице
$(function () {
    $('.zoom-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        image: {
            verticalFit: true,
            titleSrc: function (item) {
                return item.el.attr('title');
            }
        },
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300,
            opener: function (element) {
                return element.find('img');
            }
        },
        swipe: {
            enabled: true
        }
    });
});

//слайдеры на главной странице
$(function () {
    // if (window.location.pathname === '/' || window.location.pathname.indexOf('/index.html') > -1)
    // if (window.location.pathname === '/' || window.location.pathname === '/index.html') {

    //тут непонятная херня. Выше прописывал 2 разные проверки, является ли страница главной, чтобы слик не инишился впустую. Но обе не работают на сервере гитхаба. Поэтому просто убрал проверки.

    //слик-слайдер заглавных фото на главной странице
    $('.hero__slider').slick({
        dots: false,
        infinite: true,
        arrows: false,
        autoplaySpeed: 4000,
        autoplay: true,
        fade: true
    });

    $('.about__pictures').slick({
        dots: false,
        infinite: true,
        arrows: true
    });

    //слик-слайдер партнеров на главной странице
    $('.partners__list').slick({
        dots: false,
        infinite: true,
        arrows: false,
        autoplaySpeed: 1000,
        slidesToShow: 4,
        autoplay: true,
        responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    autoplaySpeed: 5000
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    //слик-слайдер отзывов на главной странице
    $('.reviews__inner').slick({
        dots: true,
        arrows: true
    });
    // }
});

//активное состояние кнопки call-to-action
$(function () {
    $('.course-price__button').click(function () {
        $(this).toggleClass('active');
    });
});







//гармошка блока faq
$(function () {
    $('.course-faq__ans').hide();
    $('.course-faq__question').click(function () { //при клике на вопрос
        $(this).toggleClass('open'); //применяются стили текущего вопроса
        $(this).siblings('.course-faq__ans').slideToggle('slow', function () { //появляется ответ текущего вопроса
            $('.course-faq__ans').not(this).hide('slow'); //скрывается ответ НЕ текущего вопроса
            $('.course-faq__ans').not(this).prev('.course-faq__question').removeClass('open'); //НЕ текущий вопрос теряет стили открытого
        });
    });
});

//Плавный скролл до цен при нажатии на кнопку call-to-action. нужен только странице конкретного курса
$(function () {
    $(".course-hero__button").on("click", function (e) {
        e.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({
            scrollTop: top - 100
        }, 1500);
    });
});

//При клике на сабавтора на странице курса появляется popup об этом авторе
$(function () {
    $('.course-plan__module-subauthor-btn').click(function () {
        $(this).addClass('open');
        $('.subauthor-card').addClass('open');
        $('.backdrop').addClass('open');
        $('body').addClass('lock');
    });
    $(document).mouseup(function (e) { // отслеживаем клик
        var block = $(".subauthor-card"); //кнопка, меню В ней
        if (!block.is(e.target) && block.has(e.target).length === 0) { //если клик не по кнопке/меню/чайлдам
            $('.course-plan__module-subauthor-btn').removeClass('open'); //кнопка неактивна
            $('.subauthor-card').removeClass('open'); //меню неактивно
            $('.backdrop').removeClass('open'); //бекдроп неактивен
            $('body').removeClass('lock');
        }
    });
    $('.subauthor-card__close-btn').click(function () {
        $('.course-plan__module-subauthor-btn').removeClass('open'); //кнопка неактивна
        $('.subauthor-card').removeClass('open'); //меню неактивно
        $('.backdrop').removeClass('open'); //бекдроп неактивен
        $('body').removeClass('lock');
    });
});

var mixer = mixitup('.exhibitions__grid, .bookstore__grid');

// Назначаем обработчик на все кнопки с классом .filter__button
$('.exhibitions .filter__button').click(function () {

    var filterValue = $(this).data('filter');
    // Добавляем класс .active на нажатую кнопку и удаляем этот класс у других кнопок
    $(this).addClass('active').parent().siblings().find('.exhibitions .filter__button').removeClass('active');
    // Удаляем текущее фоновое изображение и добавляем новое, соответствующее нажатой кнопке
    $('.exhibitions__grid').removeClass('bg-ukr bg-de bg-neth bg-norv bg-usa bg-aust bg-hung bg-geor').addClass('bg-' + $(this).data('filter').substr(1));
});



*/