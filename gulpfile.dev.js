'use strict';

var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	// autoprefixer = require('gulp-autoprefixer'),
    SSI = require('browsersync-ssi'),
    plumber = require('gulp-plumber'), //错误处理提示插件
    sass = require('gulp-sass'),
    fileinclude = require('gulp-file-include'),
	sourcemap = require('gulp-sourcemaps'),
	spritesmith=require('gulp.spritesmith'),
	autoprefixer = require('gulp-autoprefixer'),
	csso = require('gulp-csso'); // 压缩优化css



module.exports = function dev() {
    gulp.task('serve', function () {
        browserSync.init({
            server: {
                baseDir: ["./dist"],
                middleware: SSI({
                    baseDir: './dist',
                    ext: '.shtml',
                    version: '2.10.0'
                })
            }
        });

        gulp.watch("src/scss/**/*.scss", ['sass']);
        gulp.watch("src/js/**/*.js", ['js']);
        gulp.watch("src/**/*.html", ['html']);
        gulp.watch("dist/**/*.html").on("change", browserSync.reload);
    });


    gulp.task('sass', function () {
        return gulp.src("src/scss/**/*.scss")
            .pipe(plumber())
            .pipe(sourcemap.init()) //map初始化
            .pipe(sass.sync().on('error', sass.logError))
            .pipe(sass({
                outputStyle: "compact"
			}))
			// .pipe(autoprefixer({
            //     browsers: ['last 10 versions', 'Firefox >= 20', 'Opera >= 36', 'ie >= 9', 'Android >= 4.0'] // 浏览器版本
            // }))
            .pipe(sourcemap.write('./maps')) //生成sourcemap文件，路径为./maps
            .pipe(gulp.dest("dist/css"))
            .pipe(browserSync.stream()); //文件有更新自动执行
	});
	
	gulp.task('css_main', function(){
		return gulp.src('./dist/css/*.css')
			.pipe(autoprefixer({
                browsers: ['last 10 versions', 'Firefox >= 20', 'Opera >= 36', 'ie >= 9', 'Android >= 4.0'] // 浏览器版本
            }))
			.pipe(csso()) 
			.pipe(gulp.dest('abc'));
	});


    gulp.task('js', function () {
        return gulp.src('src/js/**/*.js')
            .pipe(plumber())
            .pipe(gulp.dest("dist/js"))
            .pipe(browserSync.stream());
    });

    gulp.task('html', function () {
        return gulp.src("src/*.html")
            .pipe(fileinclude({
                prefix: '@@',
                basepath: '@file'
            }))
            .pipe(plumber())
            .pipe(gulp.dest("dist/"))
            .pipe(browserSync.stream());
	});
	
	// 图片转雪碧图任务
	gulp.task('sprite',function(){  
		gulp.src('src/resource/ls/*.png')  
		   .pipe(spritesmith({  
			   imgName:'btn.png',  
			   cssName:'css/btn.css',  
			   padding:5,  
			   algorithm:'binary-tree'  
		   }))  
		   .pipe(gulp.dest('src/sprite/')) //输出目录
   }) 

    // 复制 第三方依赖库和插件
    gulp.task('copylib', function () {
        return gulp.src("src/lib/**")
            .pipe(plumber())
            .pipe(gulp.dest("dist/lib"))
    });

    gulp.task('image', function () {
        //拷贝压缩过的图片
        return gulp.src('src/img/**/*.{png,jpg,jpeg,gif,ico}')
            //.pipe(imagemin({
            //    optimizationLevel: 3 //0-7
            //}))
            .pipe(gulp.dest('dist/img'))
            .pipe(browserSync.stream());
    });

    //开发dev构建
    gulp.task('dev', ['image','copylib','html','sass','js','serve']);

}