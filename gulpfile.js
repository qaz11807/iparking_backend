const gulp = require('gulp');
const babel = require('gulp-babel'); // 載入 gulp-babel 套件

gulp.task(
    'babel',
    async () => {
        gulp.src(['./dist/**/*.js']) 
            .pipe(
                babel({
                    presets: ['@babel/env'], 
                    plugins: ["@babel/plugin-transform-runtime"]
                })
            )
            .pipe(gulp.dest('./build/'))
        
        gulp.src(['./dist/**/*.json']) 
            .pipe(gulp.dest('./build/')) 
    }
);
