"use strict";

var gulp = require('gulp');

var babel = require('gulp-babel'); // 載入 gulp-babel 套件


gulp.task('babel', function () {
  return gulp.src('./dist/**').pipe(babel({
    presets: ['@babel/preset-env']
  })).pipe(gulp.dest('./public/js/'));
});