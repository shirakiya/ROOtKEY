/* laod modules */
var gulp      = require('gulp');
// for JavaScript
var browserify = require('browserify');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var uglify     = require('gulp-uglify');
var size       = require('gulp-size');
var rename     = require('gulp-rename');
var watchify   = require('watchify');
var gutil      = require('gulp-util');

// for CSS
var sass      = require('gulp-sass');
var plumber   = require('gulp-plumber');
var concat    = require('gulp-concat');
var minifyCss = require('gulp-minify-css');


/* define path */
var path = {
  vendorFile:    './js/vendor.js',
  jsMainFile:    './js/main.js',
  jsOutputDir:   '../../../public/assets/js',
  scssInputDir:  './scss/scss_src/*.scss',
  scssOutputDir: './scss/scss_src/*.scss',
  scssOutputDir: './scss/css_src',
  cssInputDir:   './scss/css_src/*.css',
  cssOutputDir:  '../../../public/assets/css'
};


/* define tasks */
// vendor.js -> vendor.min.js
gulp.task('vendor', function(){
  var minifiedFileName = 'vendor.min.js';
  browserify({
    entries: [path.vendorFile],
    extensions: ['.js'],
    require: [
      'jquery',
      'foundation-sites',
      'underscore',
      'backbone',
      'backbone.marionette'
    ]
  })
  .bundle()
  .pipe(source(minifiedFileName))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(size())
  .pipe(gulp.dest(path.jsOutputDir));
});

// main.js -> main.min.js
gulp.task('js', function(){
  return jsBuild(false);
});
// watch for js build
gulp.task('watch-js', function(){
  return jsBuild(true);
});

function jsBuild(is_watch){
  b = browserify({
    entries: [path.jsMainFile],
    extensions: ['.js']
  })
  .external([
    'jquery',
    'foundation-sites',
    'underscore',
    'backbone',
    'backbone.marionette'
  ]);

  var bundler;
  if (is_watch) {
    bundler = watchify(b);
  } else {
    bundler = b;
  }

  function bundle(){
    var fileName = 'rootkey.js';
    return bundler
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source(fileName))
      .pipe(buffer())
      .pipe(gulp.dest(path.jsOutputDir)) // rootkey.js
      .pipe(uglify({ preserveComments: 'some' }))
      .pipe(rename({extname: '.min.js'}))
      .pipe(size())
      .pipe(gulp.dest(path.jsOutputDir)); // rootkey.min.js
  }

  bundler.on('update', function(){
    bundle();
  });
  bundler.on('log', gutil.log);
  return bundle();
}

// scss -> css
gulp.task('scss', function(){
  gulp.src(path.scssInputDir)
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(gulp.dest(path.scssOutputDir));
});

// css -> concat -> minify
gulp.task('css', function(){
  var minifiedFileName = 'rootkey.min.css';
  gulp.src(path.cssInputDir)
    .pipe(concat(minifiedFileName))
    .pipe(minifyCss())
    .pipe(gulp.dest(path.cssOutputDir));
})

// watch for scss compile
gulp.task('watch-scss', function(){
  gulp.watch(path.scssInputDir, ['scss', 'css']);
})

gulp.task('watch', ['watch-js', 'watch-scss']);
gulp.task('default', ['js', 'scss', 'css']);
