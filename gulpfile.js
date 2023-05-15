//переменные
const { src, dest, watch, parallel } = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const fileinclude = require('gulp-file-include');
const flatten = require('gulp-flatten');

//функции
function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app/'
        },
        notify: false
    })
}
function styles() {
    return src('app/scss/*.scss')
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(rename({
        suffix: '.min',
    }))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 10 version'],
        grid: true
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function scripts() {
    return src([
        // 'node_modules/wow.js/dist/wow.js',
        // 'app/js/swiper.js',
        
        'node_modules/jquery/dist/jquery.js',
        // 'node_modules/slick-carousel/slick/slick.js',
        // 'node_modules/mixitup/dist/mixitup.js',
        // 'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
        'app/js/main.js'

    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function htmlInclude() {
    return src('app/html/pages/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('app'))
        .pipe(browserSync.stream());
}

function watching() {
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
    watch('app/html/**/*.html', htmlInclude);

}

//вызовы функций
exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.htmlInclude = htmlInclude;

exports.default = parallel(styles, scripts, browsersync, watching, htmlInclude);
