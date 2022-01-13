"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const gulp = require('gulp');
const babel = require('gulp-babel'); // 載入 gulp-babel 套件
gulp.task('babel', () => __awaiter(void 0, void 0, void 0, function* () {
    gulp.src(['./dist/**/*.js'])
        .pipe(babel({
        presets: ['@babel/env'],
        plugins: ["@babel/plugin-transform-runtime"]
    }))
        .pipe(gulp.dest('./build/'));
    gulp.src(['./dist/**/*.json'])
        .pipe(gulp.dest('./build/'));
}));
