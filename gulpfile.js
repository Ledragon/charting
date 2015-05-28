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

gulp.task('browserSync', function () {

});