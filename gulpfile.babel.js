'use strict';

// Gulp plugins
import gulp       from 'gulp';
import sass       from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import minifyCss  from 'gulp-minify-css';
import postcss    from 'gulp-postcss';
import duration   from 'gulp-duration';
// others
import browserify   from 'browserify';
import watchify     from 'watchify';
import babelify     from 'babelify';
import autoprefixer from 'autoprefixer';
import source       from 'vinyl-source-stream';
import buffer       from 'vinyl-buffer';
import glob         from 'glob';

/* functions */
// ./hote/moge/common.babel.js => common.js
var makeDestName = (fileName) => {
  var babel = fileName.split('/').reverse()[0];
  return babel.replace(/\.babel/, '');
};

// build js files with options
var buildScripts = (script, isWatch) => {
  var defaultOption = {
    entries: [script],
    //extensions: ['.jsx'],
    debug: true
  };
  // choose bundler
  var bundler = null;
  if(isWatch) {
    let option = defaultOption;
    option.cache        = {};
    option.packageCache = {};

    bundler = watchify(browserify(option));
  } else {
    bundler = browserify(defaultOption);
  }
  // function for build script
  var rebundle = () => {
    bundler
      .transform(babelify, {
        presets: ['es2015', 'react'],
        plugins: ['transform-react-display-name']
      })
      .bundle()
      .on('error', (err) => {
        console.log(`Error: #{err.message}`)
      })
      .pipe(source(makeDestName(script)))
      .pipe(duration(`Compiled '#{script}'`))
      .pipe(buffer())
      .pipe(sourcemaps.init({
        loadMaps: true
      }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./public/js'));
  };

  // listen file's update
  bundler.on('update', rebundle)

  return rebundle();
};

/* tasks */
gulp.task('script', () => {
  let scripts = glob.sync('./assets/js/*.js');
  for(let script of scripts) {
    buildScripts(script, false);
  }
});

gulp.task('watchify', () => {
  let scripts = glob.sync('./assets/js/*.js');
  for(let script of scripts) {
    buildScripts(script, true);
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
