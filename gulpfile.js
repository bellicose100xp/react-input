'use strict';

var gulp = require('gulp'),
    connect = require('gulp-connect'), //runs a local web server
    open = require('gulp-open'); //open a url in web browser

var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        dist: './dist'
    }
};

gulp.task('connect', function () {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

gulp.task('open', [connect], function () {
    gup.src('./dist/index.html')
        .pipe(open('', {
            url: config.devBaseUrl + ':' + config.port + '/'
        }));
});