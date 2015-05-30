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
var jsMainPath     = './js/main.js';
var jsOutputPath   = '../../../public/assets/js';
var scssInputPath  = './scss/scss_src/*.scss';
var scssOutputPath = './scss/css_src';
var cssInputPath   = './scss/css_src/*.css';
var cssOutputPath  = '../../../public/assets/css';


/* define tasks */
gulp.task('js', function(){
  var minifiedFileName = 'rootkey.min.js';
  browserify({
    entries: [jsMainPath],
    extensions: ['.js'],
  })
  .bundle()
  .pipe(source(minifiedFileName))
  .pipe(buffer())
  .pipe(uglify({ preserveComments: 'some' }))
  .pipe(size())
  .pipe(gulp.dest(jsOutputPath));
});


// scss -> css
gulp.task('sass', function(){
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
  gulp.watch(scssInputPath, ['sass', 'css']);
})

gulp.task('watch', ['watch-scss']);
gulp.task('default', ['js', 'sass', 'css']);
