'use strict';

// Gulp plugins
var gulp       = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
// others
var browserify = require('browserify');
var babelify   = require('babelify');
var reactify   = require('reactify');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var glob       = require('glob');

gulp.task('build', () => {
  let scripts = glob.sync('./assets/js/*.js');
  browserify({
    entries: scripts,
    //transform: [reactify],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .on('error', (err) => { console.log('Error: ' + err.message); })
  .pipe(source('app.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({
    loadMaps: true
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./public/js'));
});

gulp.task('watch', () => {
  gulp.watch('./assets/js/**/*.js', ['build']);
});

gulp.task('default', ['build']);
