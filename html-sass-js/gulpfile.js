const {
  src, dest, parallel, watch, series
} = require('gulp');
const deleteDist = require('del');
const browserSyncServer = require('browser-sync').create();

const webpack = require('webpack-stream');

const sass = require('gulp-sass');
const autoPrefix = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

const imgMin = require('gulp-imagemin');
const webpackConfig = require('./webpack.config');

const srcDir = 'src';
const destDir = 'dist';

function browserSyncServerStart() {
  browserSyncServer.init({
    server: { baseDir: destDir },
    online: true,
  });
}

function scriptOptimization() {
  return src(`${srcDir}/js/index.js`)
    .pipe(webpack(webpackConfig))
    .pipe(dest(`${destDir}/js`));
}

function stylesOptimization() {
  return src(`${srcDir}/scss/style.scss`)
    .pipe(sass())
    .pipe(autoPrefix({ overrideBrowserslist: ['last 10 versions'] }))
    .pipe(cleanCSS())
    .pipe(dest(`${destDir}/css`))
    .pipe(browserSyncServer.stream());
}
function htmlOptimization() {
  return src(`${srcDir}/index.html`)
    .pipe(dest(`${destDir}`))
    .pipe(browserSyncServer.stream());
}

function imgOptimization() {
  return src(`${srcDir}/img/**/*`)
    .pipe(imgMin())
    .pipe(dest(`${destDir}/img`));
}
function copyToDist() {
  return src([
    `${srcDir}/fonts/*`,
  ], { base: srcDir })
    .pipe(dest(destDir));
}
function watchProject() {
  watch([`${srcDir}/js/**/*.js`], scriptOptimization);
  watch([`${srcDir}/scss/**/*.scss`], stylesOptimization);
  watch([`${srcDir}/*.html`], htmlOptimization);
  watch([`${srcDir}/img/**/*`], imgOptimization);
}

function clearDist() {
  return deleteDist(`${destDir}/**/*`, { force: true });
}
exports.startServer = series(
  clearDist, copyToDist, imgOptimization, scriptOptimization, stylesOptimization,
  htmlOptimization, browserSyncServerStart, watchProject,
);
exports.buildProject = series(
  clearDist, copyToDist, imgOptimization, scriptOptimization, stylesOptimization, htmlOptimization,
);
