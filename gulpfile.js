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
	stylish = require('jshint-stylish'),                // make errors look good in shell
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	lr = require('tiny-lr'),
	server = lr()
;

/*******************************************************************************
2. FILE DESTINATIONS (RELATIVE TO ASSSETS FOLDER)
*******************************************************************************/
var src_js_assets = 'src/assets/js',
	src_scss_assets = 'src/assets/scss'

var target = {
	sassDirSrc : 'src/assets/scss/**/*.scss',				// all sass files
	cssDirDist : 'dist/assets/css',					// where to put minified css
	cssDistFile : pkg.name + '.min.css',			// css output file name
	cssComponentFilesSrc : [
		'src/assets/components/normalize-css/normalize.css'		
	],
	cssComponentDirDist : 'dist/assets/components',
	jsLintFilesSrc : [
		'src/assets/js/global.js',
		'src/assets/js/togglepaneloffers.js',
		'src/assets/js/zipandoffers.js',
		'src/assets/js/euc.js',
		'src/assets/js/ajax.js'
	],							// all js that should be linted
	jsUglifyFilesSrc : [
		'src/assets/components/jquery/jquery.js',
		'src/assets/components/modernizr/modernizr.js'
	],						// all js files that should not be concatinated
	jsConcactFilesSrc : [],							// all js files that should be concatinated
	jsSrcFileList : [],								// JS files to include
	jsDistFile : pkg.name + '.min.js',				// compiled JS files
	jsDirDist : 'dist/assets/js',					// where to put minified js
	jsComponentFilesSrc : [
		'src/assets/components/modernizr/modernizr.js'		
	],
	jsConcatFileName : pkg.name + 'min.js',
	jsComponentDirDist : 'dist/assets/components', 	// where to put componet js (minified) js
	cleansingAreas : [
		'dist/assets/js/*.js',
		'dist/assets/css/*.css',		
		'dist/assets/components/*'		
	]
};

/*******************************************************************************
3. SASS TASK  -- working rmf 2/21
*******************************************************************************/
gulp.task('sass', function() {
	gulp.src(['src/scss/kickoff.scss'])
		.pipe(sass({
			style: 'expanded',
			lineNumbers: false
		}))
		.pipe(rename(target.cssDistFile))
		.pipe(gulp.dest(target.cssDirDist));
});


/*******************************************************************************
4. JS TASKS
*******************************************************************************/
// lint custom js  -- working rmf 2/21
gulp.task('js-lint', function() {
    gulp.src(target.jsLintFilesSrc)                     // get the files
        .pipe(jshint())                                 // lint the files
        .pipe(jshint.reporter(stylish))                 // present the results in a beautiful way
});

// minify all js files that should not be concatinated
gulp.task('js-uglify', function() {
    gulp.src(target.jsUglifyFilesSrc)                      // get the files
        .pipe(uglify())                                 // uglify the files   	
        .pipe(gulp.dest(target.jsDirDist))                // where to put the files
});


// minify & concatinate all other js
gulp.task('js-concat', function() {
  return gulp.src(target.jsLintFilesSrc)				// get the files
  	.pipe(concat(pkg.name + '.js'))  					// concatinate to one file
  	.pipe(stripDebug())									// strip debug statements
  	.pipe(gulp.dest('dist/assets/js'))					// write the file non minified version
  	.pipe(rename(pkg.name + '.min.js'))					// rename to minified version
	.pipe(uglify())										// uglify the file
  	.pipe(gulp.dest('dist/assets/js'));					// write the uglified version
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