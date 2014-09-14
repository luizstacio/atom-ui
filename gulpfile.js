var gulp = require('gulp');
var stylus = require('gulp-stylus');
var jade = require('gulp-jade');
var livereload = require('gulp-livereload');
var nib = require('nib');

var stylFiles = ['./components/**/*.styl'];
var jadeFiles = ['./components/**/*.jade'];

gulp.task('stylus', function () {
  gulp.src(stylFiles)
    .pipe(stylus({
      use: [nib()],
      set: ['compress']
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('jade', function () {
  gulp.src(jadeFiles)
    .pipe(jade())
    .pipe(gulp.dest('./build'));
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(stylFiles.concat(jadeFiles), ['compile']);
  gulp.watch('./build/**').on('change', livereload.changed);
});

gulp.task('compile', ['stylus', 'jade']);
gulp.task('default', ['watch']);