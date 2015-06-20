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
var dir = {
  vendor: './js/vendor.js'
};
var jsMainPath     = './js/main.js';
var jsOutputPath   = '../../../public/assets/js';
var scssInputPath  = './scss/scss_src/*.scss';
var scssOutputPath = './scss/css_src';
var cssInputPath   = './scss/css_src/*.css';
var cssOutputPath  = '../../../public/assets/css';


/* define tasks */
// vendor.js
gulp.task('vendor', function(){
  var minifiedFileName = 'vendor.min.js';
  browserify({
    entries: [dir.vendor],
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
  .pipe(gulp.dest(jsOutputPath));
});

// js -> min.js
gulp.task('js', function(){
  var minifiedFileName = 'rootkey.min.js';
  browserify({
    entries: [jsMainPath],
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
  .pipe(gulp.dest(jsOutputPath));
});


// scss -> css
gulp.task('scss', function(){
  gulp.src(scssInputPath)
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(gulp.dest(scssOutputPath));
});

// css -> concat -> minify
gulp.task('css', function(){
  var minifiedFileName = 'rootkey.min.css';
  gulp.src(cssInputPath)
    .pipe(concat(minifiedFileName))
    .pipe(minifyCss())
    .pipe(gulp.dest(cssOutputPath));
})

// watch for scss compile
gulp.task('watch-scss', function(){
  gulp.watch(scssInputPath, ['scss', 'css']);
})

gulp.task('watch', ['watch-scss']);
gulp.task('default', ['scss', 'css']);
