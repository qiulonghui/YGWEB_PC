var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var fileinclude  = require('gulp-file-include');

// 将对styles.scss进行预处理后生成styles.css
gulp.task('sass', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 10 versions', 'Firefox >= 20', 'Opera >= 36', 'ie >= 9', 'Android >= 4.0'], // 浏览器版本
            cascade: true, // 美化属性，默认true
            add: true, // 是否添加前缀，默认true
            remove: true, // 删除过时前缀，默认true
            flexbox: true // 为flexbox属性添加前缀，默认true
        }))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({
            stream: true //每次修改会自动刷新浏览器
        }))
});

var browserSync = require('browser-sync');

gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: 'src' //需要告知它，根目录在哪里
        },
    })
})

gulp.task('watch', function () {
    gulp.watch('src/scss/**/*.scss', ['sass']);
    // 当HTML或JS文件改变时，也重新加载浏览器
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);
})

gulp.task('fileinclude', function() {
    // 适配page中所有文件夹下的所有html，排除page下的include文件夹中html
    gulp.src('src/*.html')
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
    .pipe(gulp.dest('src'));
});

gulp.task('default', [`sass`, `browserSync`,`fileinclude`, `watch`], function () {
    console.log('dev ok');
})


var useref = require('gulp-useref');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var csso = require('gulp-csso');
var uglify = require("gulp-uglify");
var filter = require('gulp-filter');


gulp.task('prod', function () {
	var jsFilter = filter('**/*.js', {restore: true});
    var cssFilter = filter('**/*.css', {restore: true});
    var indexHtmlFilter = filter(['**/*', '!**/*.html'], {restore: true});

	return gulp.src('src/*.html')
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
        .pipe(useref())
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(csso())
        .pipe(cssFilter.restore)
        .pipe(indexHtmlFilter)
        .pipe(rev())
        .pipe(indexHtmlFilter.restore)
        .pipe(revReplace())
        .pipe(gulp.dest('dist'));
});

gulp.task('image', function () {
    //拷贝压缩过的图片
    return gulp.src('src/img/**/*.{png,jpg,jpeg,gif,ico}')
        //.pipe(imagemin({
        //    optimizationLevel: 3 //0-7
        //}))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('build', [`prod`, `image`], function () {
    console.log('build ok');
})