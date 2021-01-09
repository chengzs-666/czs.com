const gulp = require('gulp'); // 引入模块
const rename = require('gulp-rename');

// 部署任务
// gulp.task(taskname,callback);

gulp.task('default', function() { // 运行gulp命令 默认执行default任务
    // 任务函数内必须是有一个异步操作
    return new Promise((resolve, reject) => {
        console.log('hello world');
        resolve();
    });
});

gulp.task('sayhi', function() {
    return new Promise((resolve, reject) => {
        console.log('hi');
        resolve();
    });
});


// gulp.src()    源
// gulp.pipe()   管道(通道)
// gulp.dest()   目的地

gulp.task('copyindex', function() {
    return gulp.src('./src/html/index.html')
        .pipe(gulp.dest('./dist/html'));
});

gulp.task('copyjs', function() {
    return gulp.src(['./src/js/*.js', '!src/js/*.min.js'])
        .pipe(gulp.dest('./dist/js'));
});

// 第三方工具
// gulp-rename
// $ cnpm i gulp-rename -D

gulp.task('renameindex', function() {
    return gulp.src('./src/html/index.html')
        .pipe(rename('index.min.html'))
        .pipe(gulp.dest('./dist/html'));
});