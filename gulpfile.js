//引用gulp模塊
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const fileinclude = require('gulp-file-include');
const less = require('gulp-less');
const csso = require('gulp-csso');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

//使用gulp.task建立任務
//第1個參數：任務的名稱
//第2個參數：任務的回調函數
// gulp.task('firstTask', () => {
//     console.log('執行第一個任務');
//     //使用gulp.src取得要處裡的文件
//     gulp.src('./src/css/base.css')
//         .pipe(gulp.dest('./dist/css'));
// });

//使用async與await
// gulp.task('firstTask', async() => {
//     console.log('執行第一個任務');
//     await gulp.src('./src/css/base.css')
//         .pipe(gulp.dest('./dist/css'));
// });

//在不使用文件流的情況下，向task的函數里傳入一個名叫done的回調函數，以結束task
gulp.task('firsttask', done => {
    console.log('執行第一個任務');
    gulp.src('./src/css/base.css')
        .pipe(gulp.dest('./dist/css'));
    done();
});


gulp.task('htmlmin', done => {
    gulp.src('./src/*.html')
        .pipe(fileinclude())
        //壓所html代碼
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
    done();
});

gulp.task('cssmin', done => {
    //取得css目錄下所有less文件與css文件
    gulp.src(['./src/css/*.less', './src/css/*.css'])
        //將less語法轉換為css語法
        .pipe(less())
        //將css代碼進行壓縮
        .pipe(csso())
        //將處理結果進行輸出
        .pipe(gulp.dest('dist/css'));
    done();
});

gulp.task('jsmin', done => {
    gulp.src('./src/js/*.js')
        .pipe(babel({
            //判斷當前代碼運行環境，將代碼傳換為環境支持的代碼
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
    done();
});

gulp.task('copy', done => {
    gulp.src('./src/images/*')
        .pipe(gulp.dest('./dist/images'));
    gulp.src('./src/lib/*')
        .pipe(gulp.dest('./dist/lib'));
    done();
});

//gulp.series：按照順序執行
gulp.task('default', gulp.series('htmlmin', 'cssmin', 'jsmin', 'copy'), done => {
    done();
});

//gulp.paralle：可以並行計算
gulp.task('default2', gulp.parallel('htmlmin', 'cssmin', 'jsmin', 'copy'), done => {
    done();
});