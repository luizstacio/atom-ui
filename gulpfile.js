var gulp = require('gulp');
var stylus = require('gulp-stylus');
var jade = require('gulp-jade');
var livereload = require('gulp-livereload');
var nib = require('./node_modules/nib');

var stylFiles = './components/**/*.styl';
var jadeFiles = './components/**/*.jade';
var otherFiles = './components/**/!(*.styl|*.jade)';

gulp.task('stylus', function () {
  gulp.src(stylFiles)
    .pipe(stylus({
      use: [nib()],
      compress: false
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('jade', function () {
  gulp.src(jadeFiles)
    .pipe(jade())
    .pipe(gulp.dest('./build'));
});

gulp.task('copyFiles', function () {
  gulp.src(otherFiles)
    .pipe(gulp.dest('./build'));
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(stylFiles, ['compile']);
  gulp.watch(jadeFiles, ['compile']);
  gulp.watch('./build/**').on('change', livereload.changed);
});

gulp.task('compile', ['stylus', 'jade', 'copyFiles']);
gulp.task('default', ['watch']);