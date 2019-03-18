var gulp    = require('gulp'),
    less    = require('gulp-less'),
    browser = require('browser-sync'),
    concat  = require('gulp-concat'),
    uglify  = require('gulp-uglifyjs');

gulp.task('less', function(){
    return gulp.src('app/less/**/*.less')
    .pipe(less())
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

gulp.task('scripts', function() {
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js',
        'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js'
])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});

gulp.task('watch', ['browser', 'less'], function() {
    gulp.watch('app/less/**/*.less', [less]);
    gulp.watch('app/*.html', browser.reload);
    gulp.watch('app/js/**/*.js', browser.reload);
});
