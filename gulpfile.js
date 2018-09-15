'use strict';

// npm install

const gulp = require('gulp'),
	sass = require('gulp-sass'),
	rigger = require('gulp-rigger'),
	prefixer = require('gulp-autoprefixer'),
	rimraf = require('rimraf'),
	browserSync = require('browser-sync').create(),
	path = {
		build: {
			html: 'build/',
			js: 'build/js/',
			css: 'build/css/',
			img: 'build/images/',
			fonts: 'build/fonts/',
			vendor: 'build/vendor/',
			sass: 'build/scss/'
		},
		source: {
			html: ['src/*.html', '!src/_*.html'],
			js: ['src/js/*.js', '!src/js/_*.js'],
			sass: ['src/style/*.scss', '!src/style/_*.scss'],
			css: ['src/style/*.css', '!src/style/_*.css'],
			img: 'src/images/**/*.*',
			fonts: 'src/fonts/**/*.*',
			vendor: 'src/vendor/**/*.*'
		},
		watch: {
			html: 'src/**/*.html',
			js: 'src/js/**/*.js',
			sass: 'src/style/**/*.scss',
			_sass: 'src/style/**/_*.css',
			css: 'src/style/**/*.css',
		},
		clean: './build'
  	},
	settings = {
		server: {
			server: { baseDir: "./build" }
		},
		prefix: {
			browsers: ['last 3 versions']
		},
		sass: {
			outputStyle: 'expanded',
			indentType: 'tab',
			indentWidth : '1'
		}

	};

gulp.task('assets', ['images:build', 'fonts:build', 'vendor:build']);

gulp.task('html:build', function () {
	gulp.src(path.source.html)
		.pipe(rigger())
		.pipe(gulp.dest(path.build.html))
});

gulp.task('js:build', function () {
	gulp.src(path.source.js)
		.pipe(rigger())
		.pipe(gulp.dest(path.build.js))
});

gulp.task('fonts:build', function() {
	gulp.src(path.source.fonts)
		.pipe(gulp.dest(path.build.fonts));
});

gulp.task('vendor:build', function() {
	gulp.src(path.source.vendor)
		.pipe(gulp.dest(path.build.vendor));
});

gulp.task('images:build', function () {
	gulp.src(path.source.img)
		.pipe(gulp.dest(path.build.img));
});

gulp.task('sass:build', function () {
	gulp.src(path.source.sass)
		.pipe(sass(settings.sass).on('error', sass.logError))
		.pipe(prefixer(settings.prefix))
		.pipe(gulp.dest(path.build.css))
		.pipe(browserSync.stream());
});
gulp.task('css:build', function () {
	gulp.src(path.source.css)
		.pipe(prefixer(settings.prefix))
		.pipe(gulp.dest(path.build.css))
		.pipe(browserSync.stream());
});

gulp.task('server', function() {
	browserSync.init(settings.server);
});

gulp.task('build', ['html:build', 'js:build', 'sass:build', 'css:build', 'assets']);

gulp.task('clean', function (cb) {
	rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'server'], function() {
	gulp.watch(path.watch.html, ['html:build']).on('change', browserSync.reload);
	gulp.watch(path.watch.js, ['js:build']).on('change', browserSync.reload);
	gulp.watch(path.watch.sass, ['sass:build']);
	gulp.watch(path.watch._sass, ['sass:build']);
	gulp.watch(path.watch.css, ['css:build']);
});

