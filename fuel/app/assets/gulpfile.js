/* laod modules */
var gulp      = require('gulp');
var sass      = require('gulp-sass');
var plumber   = require('gulp-plumber');
var uglify    = require('gulp-uglify');
var concat    = require('gulp-concat');
var minifyCss = require('gulp-minify-css');


/* define path */
var scssInputPath  = './scss/scss_src/*.scss';
var scssOutputPath = './scss/css_src';
var cssInputPath   = './scss/css_src/*.css';
var cssOutputPath  = '../../../public/assets/css';


/* define tasks */
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
