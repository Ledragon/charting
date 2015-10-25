var gulp = require('gulp');
var typescript = require('gulp-typescript');
var browserSync = require('browser-sync');
var less = require('gulp-less');

gulp.task('ts', function () {
    return gulp.src(['./src/**/*.ts', 'typings/**/*.d.ts'])
        .pipe(typescript({
            out: 'charting.js'
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('less', function () {
    return gulp.src('./src/**/*.less')
        .pipe(less({

        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch-less', function () {
    gulp.watch(['./src/**/*.less'], ['less']);
});

gulp.task('watch-ts', function () {
    gulp.watch(['./src/**/*.ts'], ['ts']);
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: './',
        index: './test/index.html',
        port: 3030,
        files: ['./dist/*.*', './test/index.html']
    });
});

gulp.task('watch', ['watch-ts', 'watch-less', 'browserSync'], function () {

});