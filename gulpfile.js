const gulp = require('gulp');
babel = require('gulp-babel'),
uglify = require('gulp-uglify'),
rename = require('gulp-rename'),
cssnano = require('gulp-cssnano'),
sass = require('gulp-sass');

gulp.task('js', function () {
    return gulp.src('./js/*.js')
        .pipe(babel({
			presets: ['es2015']
		}))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./js'));
});

gulp.task('sass', function () {
    return gulp.src('./styles/*.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./styles'));
});

gulp.task('default', ['js', 'sass'], function() {
    gulp.watch('./style/*.scss', ['sass']);
    gulp.watch('./js/*.js', ['js']);
});
