var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');

// create task
gulp.task('compileAndMinifyCss', function(){
  gulp.src('./public/css/**/*.css')
  .pipe(concat('style.min.css'))
  .pipe(minifyCSS())
  .pipe(gulp.dest('public/css/compileCss'))
})

// gulp.task('TASKNAME', function(){
//	 insert imageminify task here
// })