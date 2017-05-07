var gulp = require('gulp'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
  uglify = require('gulp-uglify'),
  buffer = require('vinyl-buffer'),
  sourcemaps = require('gulp-sourcemaps'),
  less = require('gulp-less'),
  cleanCSS = require('gulp-clean-css'),
  concatCss = require('gulp-concat-css'),
  browserSync = require('browser-sync').create();

var paths = {
  scripts: ['assets/js/*.js'],
  less: ['assets/less/**/*.less'],
  css: ['./node_modules/bootstrap/dist/css/bootstrap.css', 
        './node_modules/animate.css/animate.css', 
        './node_modules/fullpage.js/dist/jquery.fullpage.css', 
        './assets/less/*.less']
};

gulp.task('browserify', function() {
    return browserify('./assets/js/main.js')
        .bundle()
        .pipe(source('all.min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('compile-less-minify-css', function() {  
  gulp.src(paths.css)
    .pipe(less())
    .pipe(concatCss("all.min.css"))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/css/'));
}); 

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['browserify']);
  gulp.watch(paths.less, ['compile-less-minify-css']);
});
 
gulp.task('serve', function () { 
	var files = [
		'*.html',
		'dist/css/*.css',
		'dist/img/*.jpg',
		'dist/img/*.png',
		'dist/js/*.js'
	];
  browserSync.init(files, {
      server: true
  }); 
});
 
gulp.task('default', ['watch', 'browserify', 'compile-less-minify-css', 'serve']);