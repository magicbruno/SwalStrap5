const { src, dest, series } = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const gulpsass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const pipeline = require('readable-stream').pipeline;
const markdown = require('gulp-markdown');
const footer = require('gulp-footer');

const sassSrc = 'sass/*.scss';
const sassDest = 'docs/assets/css/';
const jsSrc = 'FM_Viewer.js';
const jsDest = 'docs/assets/js';
const distributionCss = 'dist/css/';
const distributionJs = 'dist/js/';

function sass() {
  return src(sassSrc)
    .pipe(autoprefixer())
    .pipe(gulpsass().on('error', (err) => console.log(err)))
    .pipe(dest(sassDest));
}

function documentation() {
  return src('README.md')
    .pipe(markdown())
    .pipe(rename('documentation.xml'))
    .pipe(dest('docs'))
}

function sasscompress() {
  return src(sassSrc)
    .pipe(autoprefixer())
    .pipe(sourcemaps.init())
    .pipe(gulpsass({ outputStyle: 'compressed' }))
    .pipe(sourcemaps.write('.'))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest(sassDest));
}

function compressjs() {
  return pipeline(
    src(jsSrc),
    uglify(),
    rename({extname: '.min.js'}),
    dest(jsDest),
    src(jsSrc),
    dest(jsDest)
  );
}

function createAutoInstall() {
  return pipeline(
    src(jsSrc),
    footer(`;(function (win) {
              win.FM_Viewer = new FMViewer();
            })(window)`),
    uglify(),
    rename('FM_Viewe_Autoinstall.min.js'),
    dest(jsDest),
    src(jsSrc),
    footer(`
    ;(function (win) {
      win.FM_Viewer = new FMViewer();
    })(window)`),
    rename('FM_Viewe_Autoinstall.js'),
    dest(jsDest)
  );
}

function creadist() {
  return pipeline(
    src('docs/assets/**'),
    dest('dist/')
  )
}

exports.default = series(sass,sasscompress,compressjs,createAutoInstall,creadist,documentation);
exports.sass = sass;
exports.compressjs = compressjs;
exports.sasscompress = sasscompress;
exports.creadist = creadist;
exports.documentation = documentation;