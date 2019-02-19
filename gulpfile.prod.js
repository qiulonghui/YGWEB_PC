'use strict';

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var useref = require('gulp-useref'); // 解析构建块在HTML文件来代替引用未经优化的脚本和样式表
var rev = require('gulp-rev'); // 给静态资源文件名添加hash值
var revReplace = require('gulp-rev-replace'); // html重写被gulp-rev重命名的引用文件
var csso = require('gulp-csso'); // 压缩优化css
var uglify = require("gulp-uglify"); // 压缩js
var filter = require('gulp-filter'); // 在虚拟文件流中过滤文件
console.log('我们不一样')
module.exports = function prod() {
    gulp.task('prod', function () {
        var jsFilter = filter('**/*.js', {
            restore: true
        });
        var cssFilter = filter('**/*.css', {
            restore: true
        });
        var indexHtmlFilter = filter(['**/*', '!**/*.html'], {
            restore: true
        });

        return gulp.src('dist/*.html')
            .pipe(useref())
            .pipe(jsFilter)
            .pipe(uglify())
            .pipe(jsFilter.restore)
            .pipe(cssFilter)
            .pipe(autoprefixer({
                browsers: ['last 10 versions', 'Firefox >= 20', 'Opera >= 36', 'ie >= 9', 'Android >= 4.0'] // 浏览器版本
            }))
            .pipe(csso())
            .pipe(cssFilter.restore)
            .pipe(indexHtmlFilter)
            .pipe(rev())
            .pipe(indexHtmlFilter.restore)
            .pipe(revReplace())
            .pipe(gulp.dest('release'))
    });

    gulp.task('image2', function () {
        //拷贝压缩过的图片
        return gulp.src('dist/img/**/*.{png,jpg,jpeg,gif,ico}')
            //.pipe(imagemin({
            //    optimizationLevel: 3 //0-7
            //}))
            .pipe(gulp.dest('release/img'));
    });

    // build 构建
    gulp.task('build', ['image2', 'prod']);
}