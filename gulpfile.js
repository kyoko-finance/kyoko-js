const gulp = require('gulp');
const clean = require('gulp-clean');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', () => {
  return gulp.src('lib', { read: false, allowEmpty: true })
    .pipe(clean());
});

gulp.task('build', () => {
    return gulp.src(['src/**/*.ts'])
        .pipe(tsProject())
        .js
        .pipe(gulp.dest('lib'));
});

gulp.task('default', gulp.series(['clean', 'build']));
