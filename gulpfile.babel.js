'use strict';

// Gulp plugins
import gulp       from 'gulp';
import sass       from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import minifyCss  from 'gulp-minify-css';
import postcss    from 'gulp-postcss';
// others
import browserify   from 'browserify';
import babelify     from 'babelify';
import autoprefixer from 'autoprefixer';
import source       from 'vinyl-source-stream';
import buffer       from 'vinyl-buffer';
import glob         from 'glob';

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
      debug: true
    })
    .transform(babelify, {
      presets: ['es2015', 'react'],
      plugins: ['transform-react-display-name']
    })
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
  gulp.watch('./assets/js/**/*.js',    ['script']);
  gulp.watch('./assets/css/**/*.sass', ['sass']);
});

gulp.task('default', ['script']);
