'use strict';

/*******************************************************************************
1. DEPENDENCIES
*******************************************************************************/
// Include gulp
var gulp = require('gulp'),

// Include Plugins
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

/*******************************************************************************
2. FILE DESTINATIONS (RELATIVE TO ASSSETS FOLDER)
*******************************************************************************/
var target = {
	sassDirSrc : 'src/scss/**/*.scss',				// all sass files
	cssDirDist : 'dist/assets/css',					// where to put minified css
	cssDistFile : pkg.name + '.min.css',			// css output file name
	cssComponentFilesSrc : [
		'src/components/normalize-css/normalize.css'		
	],
	cssComponentDirDist : 'dist/assets/components',
	jsLintFilesSrc : [],							// all js that should be linted
	jsUglifyFilesSrc :[],							// all js files that should not be concatinated
	jsConcactFilesSrc : [],							// all js files that should be concatinated
	jsSrcFileList : [],								// JS files to include
	jsDistFile : pkg.name + '.min.js',				// compiled JS files
	jsDirDist : 'dist/assets/js',					// where to put minified js
	jsComponentFilesSrc : [
		'src/components/modernizr/modernizr.js'		
	],
	jsComponentDirDist : 'dist/assets/components', 	// where to put componet js (minified) js
	cleansingAreas : [
		'dist/assets/js/*.js',
		'dist/assets/css/*.css',		
		'dist/assets/components/*'		
	]
};

/*******************************************************************************
3. SASS TASK
*******************************************************************************/
gulp.task('sass', function() {
	gulp.src(['src/scss/kickoff.scss'])
		.pipe(sass({
			style: 'compressed',
			lineNumbers: true
		}))
		.pipe(rename(target.cssDistFile))
		.pipe(gulp.dest(target.cssDirDist));
});


/*******************************************************************************
4. JS TASKS
*******************************************************************************/
// lint custom js

// minify all js files that should not be concatinated

// minify & concatinate all other js

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





/*******************************************************************************
5. GULP TASKS
*******************************************************************************/
// default task
gulp.task('default', function(){
	gulp.start('sass', 'js-lint', 'js-uglify', 'js-concat', 'browser-sync');
	gulp.watch('scss/**/*.scss', function() {
	    gulp.start('sass');
	});
	gulp.watch(target.js_lint_src, function() {
	    gulp.start('js-lint');
	});
	gulp.watch(target.js_minify_src, function() {
	    gulp.start('js-uglify');
	});
	gulp.watch(target.js_concat_src, function() {
	    gulp.start('js-concat');
	});	
});

// clean task
gulp.task('cleanse', function(){
	gulp.src(target.cleansingAreas)
		.pipe(clean());
});



gulp.task('styles', function(){
	gulp.start('cleanse','sass');

});