'use strict';

var gulp = require('gulp'),
	pkg = require('./package.json'),
	bower = require('gulp-bower'),
	bowerFiles = require("gulp-bower-files"),
	util = require('gulp-util'),
	clean = require('gulp-clean'),
	stripDebug = require('gulp-strip-debug'),
	sass = require('gulp-ruby-sass'),
	autoprefix = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	lr = require('tiny-lr'),
	server = lr()
;


var scriptFiles = 'src/**/*.js';
var scssFiles = 'src/**/*.scss',
	scssFile = 'src/scss/mysite.scss',
	cssSourceFile = pkg.name + '.min.css';

var jsComponentFiles = [
	'src/components/*.js'
];

var jsComponentDistDir = 'dist/assets/components';

var jsFileList = [
	'src/js/file1.js',
	'src/js/file2.js'
];

var jsDistDir = 'dist/assets/js',
	jsDistFiles = 'dist/assets/js/*.js';

var cssDistDir = 'dist/assets/css',
	cssDistFiles = 'dist/assets/css/*.css';

var componentsDistDir = 'dist/assets/components';


var cleansingAreas = [
	jsDistDir,
	cssDistDir,
	componentsDistDir
];

gulp.task('clean', function(){
	gulp.src(cleansingAreas)
		.pipe(clean());
});



gulp.task('bowerFiles', function(){
	bowerFiles()
		.pipe(gulp.dest(jsComponentDistDir));
});


gulp.task('lint', function(){
	gulp.src(scriptFiles)
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('default'));
});


gulp.task('js', function() {
  gulp.src(scriptFiles)
  	.pipe(concat(pkg.name + '.min.js'))
  	.pipe(stripDebug())
  	.pipe(uglify())
  	.pipe(gulp.dest(jsDistDir));

  gulp.src('src/components/**/*.js')
  	.pipe(concat('vendor.js'))
  	.pipe(uglify())  	
  	.pipe(gulp.dest(jsComponentDistDir));
});


gulp.task('sass', function() {
	gulp.src(scssFile)
		.pipe(sass({
			style: 'compressed',
			lineNumbers: true
		}))
		.pipe(rename(cssSourceFile))
		.pipe(gulp.dest(cssDistDir));
});



gulp.task('bower', function(){
	bower()
		.pipe(gulp.dest(jsComponentDistDir));
});










gulp.task('watch', function(){
	gulp.watch(scssFiles, function(){
		gulp.start('sass');
	});

	gulp.watch(jsFileList, function(){
		gulp.start('js');
	});
});

gulp.task('default', function(){
	gulp.start('clean','js', 'sass');

});

gulp.task('styles', function(){
	gulp.start('clean','sass');

});


gulp.task('scripts', function(){
	gulp.start('clean','js');

});