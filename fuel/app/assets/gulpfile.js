/* laod modules */
var gulp      = require('gulp');
// for JavaScript
var browserify = require('browserify');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var uglify     = require('gulp-uglify');
var size       = require('gulp-size');
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
// vendor.js
gulp.task('vendor', function(){
  var minifiedFileName = 'vendor.min.js';
  browserify({
    entries: [path.vedorFile],
    extensions: ['.js'],
    require: [
      'jquery',
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

// js -> min.js
gulp.task('js', function(){
  var minifiedFileName = 'rootkey.min.js';
  browserify({
    entries: [path.jsMainFile],
    extensions: ['.js'],
    external: [
      'jquery',
      'underscore',
      'backbone',
      'backbone.marionette'
    ]
  })
  .bundle()
  .pipe(source(minifiedFileName))
  .pipe(buffer())
  .pipe(uglify({ preserveComments: 'some' }))
  .pipe(size())
  .pipe(gulp.dest(path.jsOutputDir));
});


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

gulp.task('watch', ['watch-scss']);
gulp.task('default', ['scss', 'css']);
