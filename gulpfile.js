const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

// Show message
gulp.task('message', done => {
    console.log('Gulp sent a message');
    done();
})

// Copy All HTML files
gulp.task('copyHTML', function(){
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

// Compile Sass
gulp.task('sass', function(){
    return gulp.src('src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

// Compile JS
gulp.task('minifyJS', function(){
    return gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Watch
gulp.task('watch', gulp.series(function(){
    gulp.watch(['src/scss/*.scss'], gulp.parallel('sass'));
    gulp.watch(['src/js/*.js'], gulp.parallel('minifyJS'));
    gulp.watch(['src/*.html'], gulp.parallel('copyHTML')).on('change', browserSync.reload);
}));

// Serve
gulp.task('serve', function(){
    browserSync.init({
        server: './dist'
    });
});

// Default
gulp.task('default', gulp.series(gulp.parallel('copyHTML','sass','minifyJS'), gulp.parallel('serve', 'watch')));