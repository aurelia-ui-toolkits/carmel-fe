var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var runSequence = require('run-sequence');
var del = require('del');
var vinylPaths = require('vinyl-paths');

var filesToDeploy = [
  './kendo-sdk/**/*',
  './styles/*.*',
  './images/*.*',
  './doc/*.*',
  './jspm_packages/*.js', // include system.js
  './jspm_packages/github/twbs/bootstrap@*/fonts/*',
  './jspm_packages/npm/font-awesome@*/**/*',
  './jspm_packages/npm/font-awesome*.js',
  './jspm_packages/github/PrismJS/prism*/themes/*.css',
  './jspm_packages/github/google/code-prettify*/**/*',
  './jspm_packages/npm/babel-runtime*/**/*',
  "./jspm_packages/npm/showdown-prettify@1.3.0.js",
  "./jspm_packages/npm/showdown-prettify@1.3.0/**/*",
  "./jspm_packages/npm/showdown@1.6.4.js",
  "./jspm_packages/npm/showdown@1.6.4/**/*",
  './index.html',
  './favicon.ico',
  './config.js',
  './dist/aurelia.js',
  './dist/app-build.js',
  './images/samples/*.png'
];

gulp.task('deploy-gh-pages', function() {
  return gulp.src(filesToDeploy, { base: '.' })
    .pipe(ghPages());
});

gulp.task('clean-test-dist', function() {
  del('./test-dist');
});

gulp.task('deploy-test-dist', function() {
  return gulp.src(filesToDeploy, { base: '.' })
     .pipe(gulp.dest('./test-dist'));
});

gulp.task('test-deploy', function() {
  return runSequence(
    'clean-test-dist',
    'bundle',
    'deploy-test-dist',
    'clean'
  );
});

gulp.task('deploy', function() {
  return runSequence(
    'bundle',
    'deploy-gh-pages',
    'clean'
  );
});
