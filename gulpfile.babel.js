'use strict';

// Gulp plugins
var gulp       = require('gulp');
var sass       = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var minifyCss  = require('gulp-minify-css');
var postcss    = require('gulp-postcss');
// others
var browserify   = require('browserify');
var babelify     = require('babelify');
var autoprefixer = require('autoprefixer');
var source       = require('vinyl-source-stream');
var buffer       = require('vinyl-buffer');
var glob         = require('glob');

// ./hote/moge/common.babel.js => common.js
var makeDestName = (fileName) => {
  var babel = fileName.split('/').reverse()[0];
  return babel.replace(/\.babel/, '');
};

gulp.task('script', () => {
  let scripts = glob.sync('./assets/js/*.js');
  for(let script of scripts) {
    browserify({
      entries: [script],
      //transform: [reactify],
      debug: true
    })
    .transform(babelify)
    .bundle()
    .on('error', (err) => { console.log('Error: ' + err.message); })
    .pipe(source(makeDestName(script)))
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/js'));
  }
});

gulp.task('sass', () => {
  gulp.src('./assets/css/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 2 versions']
      })
    ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', () => {
  gulp.watch('./assets/js/**/*.js', ['script']);
});

gulp.task('default', ['script']);
