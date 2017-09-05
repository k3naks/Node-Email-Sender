/**
 * Created by yshybeka on 9/4/2017.
 */
const gulp = require('gulp');
const istanbul = require('gulp-istanbul');
const path = require('path');
const jasmine = require('gulp-jasmine');

gulp.task('integration', () => {
    return gulp.src(['server/api-services/email/test/*Spec.js']).pipe(jasmine({
        timeout: 10000,
        verbose: true,
        includeStackTrace: true
    }));
});

gulp.task('pre-test', function () {
    return gulp.src(['helpers/email/*.js'])
    // Covering files
        .pipe(istanbul())
        // Force `require` to return covered files
        .pipe(istanbul.hookRequire());
});


gulp.task('test', ['pre-test'], () => {
    return gulp.src(['helpers/email/test/*Spec.js'])
        .pipe(jasmine({
            timeout: 10000,
            verbose: true,
            includeStackTrace: true
        }))
        .pipe(istanbul.writeReports({
            reporters: ['lcov'],
            dir: 'coverage'
        }));
});

gulp.task('lcov', function () {
    gulp.src(['coverage/lcov.info'])
        .pipe(replace(`${__dirname}${path.sep}`, ''))
        .pipe(gulp.dest('coverage'));
});
