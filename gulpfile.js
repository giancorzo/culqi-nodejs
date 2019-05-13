'use strict';

/**************/
/*  REQUIRES  */
/**************/
var fs = require('fs');
var _ = require('lodash');
var gulp = require('gulp');
var pkg = require('./package.json');

// File I/O
var fs = require('fs');
var ts = require('gulp-typescript');
var del = require('del');
var header = require('gulp-header');
var replace = require('gulp-replace');


/****************/
/*  FILE PATHS  */
/****************/
var paths = {
  src: [
    'src/**/*.ts'
  ],
  build: 'lib/',
};

var buildProject = ts.createProject('tsconfig.json', {rootDir: 'src'});
var banner = `/*! culqi-nodejs v${pkg.version} */\n`;

/***********/
/*  TASKS  */
/***********/

gulp.task('cleanup', function() {
  return del([
    paths.build,
  ]);
});

gulp.task('compile', function() {
  return gulp
    .src(paths.src)
    .pipe(buildProject())
    .pipe(header(banner))
    .pipe(gulp.dest(paths.build))
});


gulp.task('copyTypings', function() {
  return gulp
    .src('src/index.d.ts')
    .pipe(header(banner))
    .pipe(gulp.dest(paths.build))
});

gulp.task('watch', function() {
  gulp.watch(paths.src, ['compile']);
});

gulp.task('build', gulp.series('cleanup', 'compile', 'copyTypings'));

gulp.task('default', gulp.series('build'));
