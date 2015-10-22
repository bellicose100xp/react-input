'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect'); //runs a local web server
var open = require('gulp-open'); //open a url in web browser
var browserify = require('browserify'); //Bundles Javascript files
var source = require('vinyl-source-stream'); //Use conventional text stream with gulp ???
var concat = require('gulp-concat'); // concatenates files
var lint = require('gulp-eslint'); //performs code check
var babelify = require('babelify');
//var monitorCtrlC = require('monitorctrlc');
var historyApiFallback = require('connect-history-api-fallback');
var nodemon = require('gulp-nodemon');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var runSequence = require('run-sequence');
var rename = require('gulp-rename');
var debug = require('gulp-debug');

var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        dist: './dist',
        js: './src/**/*.js',
        images: './src/images/*',
        mainJs: './src/main.js',
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
            'src/css/style.css'
        ]
    }
};

gulp.task('connect', function () {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true,
        middleware: function (connect, opt) {
            return [historyApiFallback({})];
        }
    });
});

//gulp.task('open', ['connect'], function () {
//    gulp.src('./dist/index.html')
//        .pipe(open({
//            uri: config.devBaseUrl + ':' + config.port + '/'
//        }));
//});

gulp.task('html', function () {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload())
});

gulp.task('js', function () {
    browserify(config.paths.mainJs)
        .transform(babelify.configure({
            ignore: /(bower_components)|(node_modules)/,
            stage: 0 //experimental features of babel
        }))
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(connect.reload())

});

gulp.task('css', function () {
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.dist + '/css'))
        .pipe(connect.reload())
});

gulp.task('images', function () {
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist + '/images'))
        .pipe(connect.reload());

    gulp.src('./src/favicon.ico')
        .pipe(gulp.dest(config.paths.dist));

    gulp.src('node_modules/bootstrap/fonts/*')
        .pipe(gulp.dest(config.paths.dist + '/fonts'));
});

gulp.task('lint', function () {
    return gulp.src(config.paths.js)
        .pipe(lint({
            config: 'eslint.config.json'
        }))
        .pipe(lint.format());
});

gulp.task('node', function () {
    nodemon({
        script: 'server/index.js',
        ext: 'js',
        watch: ['./server'],
        env: {
            PORT: 8000
        },
        ignore: ['node_modules/**', 'src/**', 'dist/**']
    })
        .on('restart', function () {
            console.log('Restarting node server...');
        })
});

gulp.task('watch', function () {
    // monitorCtrlC();
    gulp.watch(config.paths.css, ['css']);
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js', 'lint']);
});

gulp.task('template-dev', function () {
    gulp.src('src/components/common/appConstants.js', {base: './'})
        .pipe(replace('https://secure-chamber-4968.herokuapp.com/api/customers', 'http://localhost:8000/api/customers'))
        .pipe(gulp.dest('./'));

    gulp.src('src/index.html', {base: './'})
        .pipe(replace('bundle.min.js', 'bundle.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['template-dev', 'html', 'js', 'css', 'images', 'lint', 'connect', 'node', 'watch']);

gulp.task('template-production', function () {
    gulp.src('src/components/common/appConstants.js', {base: './'})
        .pipe(replace('http://localhost:8000/api/customers', 'https://secure-chamber-4968.herokuapp.com/api/customers'))
        .pipe(gulp.dest('./'));

    gulp.src('src/index.html', {base: './'})
        .pipe(replace('bundle.js', 'bundle.min.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('compress', function () {
    return gulp.src('dist/scripts/bundle.js')
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('production', function (callback) {
    runSequence('template-production', 'html', 'js', 'css', 'images', 'compress', callback);
});