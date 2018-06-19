var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('gulp-webserver');
var url = require('url');
var fs = require('fs');
var path = require('path');
var morkdata = require('./mork/data');
// console.log(morkdata)
//编译scss
gulp.task('sass', function() {
    gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
});
//监听sass文件变化
gulp.task('wat', function() {
    gulp.watch('src/scss/*.scss', ['sass'])
});
//起服务
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 6060,
            open: true,
            host: 'localhost',
            livereload: true,
            middleware: function(req, res, next) {
                if (req.url === '/favicon.ico') {
                    return false;
                };
                var pathname = url.parse(req.url).pathname;
                pathname = pathname === '/' ? '/index.html' : pathname;
                if (pathname === '/api/data') {
                    res.end(JSON.stringify(morkdata))
                } else {
                    res.end(fs.readFileSync(path.join(__dirname,
                        'src', pathname)));
                }

            }
        }))
});
gulp.task('dev', ['wat', 'server']);