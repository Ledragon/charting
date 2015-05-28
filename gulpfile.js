var gulp = require('gulp');
var typescript = require('gulp-typescript');
var browserSync = require('browser-sync');

gulp.task('ts', function (){
	return gulp.src(['./src/**/*.ts','typings/**/*.d.ts'])
		.pipe(typescript({
			out:'charting.js'
		}))
		.pipe(gulp.dest('./dist'));
});

gulp.task('watch-ts', function () {
	gulp.watch(['./src/**/*.ts'], ['ts']);
});

gulp.task('browserSync', function () {
	browserSync.init({
        server: './',
        index: './demo/index.html',
        port: 3030,
        files: ['./dist/*', './demo/index.html']
    });
});