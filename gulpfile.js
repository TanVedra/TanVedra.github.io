var gulp         = require('gulp'),
    less         = require('gulp-less'),
    browser      = require('browser-sync'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglifyjs'),
    cssnano      = require('gulp-cssnano'),
    rename       = require('gulp-rename'),
    del          = require('del'),
    min_img      = require('gulp-imagemin'),
    quant        = require('imagemin-pngquant'),
    cache        = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    spritesmith  = require('gulp.spritesmith');

gulp.task('less', function(){
    return gulp.src('app/less/**/*.less')
    .pipe(less())
    .pipe(autoprefixer([
        'last 15 versions',
        '> 1%',
        'ie 8',
        'ie 7'],
        {
            cascade: true
        }
    ))
    .pipe(gulp.dest('app/css'))
    .pipe(browser.reload({
        stream: true
    }))
});

gulp.task('browser', function(){
    browser({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('minification', ['less'], function() {
    gulp.src([
        'app/css/styles.css',
        'app/css/libs.css',
        'app/css/fonts.css'
    ])
    .pipe(cssnano())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('app/css'));
});

gulp.task('scripts', function() {
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js',
        'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js'
])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});

gulp.task('img', function() {
    return gulp.src('app/images/**/*')
    .pipe(cache(min_img({
        interlaced: true,
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [quant()]
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('sprite', function() {
    var spriteData = gulp.src('app/images/sprite/*.png')
    .pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css'
    }));
    return spriteData.pipe(gulp.dest('app/images/sprite'));
});

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('clear', function() {
    return cache.clearAll();
});

gulp.task('watch', ['browser', 'minification', 'scripts'], function() {
    gulp.watch('app/less/**/*.less', [less]);
    gulp.watch('app/*.html', browser.reload);
    gulp.watch('app/js/**/*.js', browser.reload);
});

gulp.task('build', ['clean', 'img', 'less', 'scripts'], function() {
    var buildCss = gulp.src([
        'app/css/styles.min.css',
        'app/css/libs.min.css',
        'app/css/fonts.min.css'
    ])
    .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*')
    .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'))
    
    var buildVideo = gulp.src('app/video/**/*')
    .pipe(gulp.dest('dist/video'));
});

gulp.task('default', ['watch']);