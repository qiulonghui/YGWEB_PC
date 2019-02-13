var gulp = require('gulp');
var sass = require('gulp-sass');

// 将对styles.scss进行预处理后生成styles.css
gulp.task('sass', function () {
	return gulp.src('src/scss/**/*.scss')
		.pipe(sass())
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
	gulp.watch('src/css/**/*.css', ['preCss']);
	// 当HTML或JS文件改变时，也重新加载浏览器
	gulp.watch('src/*.html', browserSync.reload);
	gulp.watch('src/js/**/*.js', browserSync.reload);
})

var autoprefixer = require('gulp-autoprefixer');
gulp.task('preCss', function () {
	return gulp.src('src/css/**/*.css')
		.pipe(autoprefixer({
			browsers: ['last 2 versions'], // 浏览器版本
			cascade: true, // 美化属性，默认true
			add: true, // 是否添加前缀，默认true
			remove: true, // 删除过时前缀，默认true
			flexbox: true // 为flexbox属性添加前缀，默认true
		}))
	 .pipe(gulp.dest('./dist/css'))
})


gulp.task('default', [`sass`, `browserSync`, `watch`], function (){
	console.log('dev ok');
  })