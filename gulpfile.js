var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');

// create task
gulp.task('compileAndMinifyCss', ['clean'] function(){
  gulp.src('./public/css/**/*.css')
  .pipe(minifyCSS())
  .pipe(concat('style.min.css'))
  .pipe(gulp.dest('public/css/compileCss'))
})

// gulp.task('TASKNAME', function(){
//	 insert imageminify task here
// })