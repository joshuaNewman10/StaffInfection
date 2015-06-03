var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');

gulp.task('browserify', function() {
  gulp.src('src/js/main.js')
      .pipe(browserify({transform: 'reactify'})) //will turn jsx into JS
      .pipe(concat('main.js')) //concat into one file
      .pipe(gulp.dest('dist/js')); //output here
});

gulp.task('copy', function() {
  gulp.src('src/index.html')
      .pipe(gulp.dest('dist'));
  gulp.src('src/assets/**/*.*')
      .pipe(gulp.dest('dist/assets'))
});

gulp.task('default', ['browserify', 'copy']);

gulp.task('watch', function() {
  gulp.watch('src/**/*.*', ['default']);
});

