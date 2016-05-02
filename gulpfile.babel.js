// TODO: import instead of require
var del = require('del');
var minifyHtml = require('gulp-html-minifier');
var bundle = require('gulp-bundle-assets');
var webserver = require('gulp-webserver');
var gulp = require('gulp');
var gulpTslint = require('gulp-tslint');
var gulpTypescript = require('gulp-typescript');
var rename = require('gulp-rename');
var typescript = require('typescript');
var shelljs = require('shelljs');
var tscConfig = require('./tsconfig.json');
var gulpIf = require('gulp-if');
var yargs = require('yargs');
var uglify = require('gulp-uglify');

// ----------------------------------------------------------
// P A R A M E T E R S
// ----------------------------------------------------------
var argv = yargs.argv.prod;
var prod = (argv === 'true') ? true : false;

// ----------------------------------------------------------
// C O N F I G
// ----------------------------------------------------------

/* PATHS */

const srcPath = './src';
const buildPath = './build';
const styleBuildPath = `${buildPath}/styling`;
const srcPaths = {
    tsFiles: `${srcPath}/**/*.ts`,
    cssFiles: `${srcPath}/**/*.css`,
    htmlFiles: `${srcPath}/**/*.html`
};

// ----------------------------------------------------------
// P R E - S T E P S
// ----------------------------------------------------------

gulp.task('clean', function () {
    'use strict';
    return removeDirectory(buildPath);
});

gulp.task('tslint', function () {
    'use strict';
    return gulp.src(srcPaths.tsFiles)
        .pipe(gulpTslint())
        .pipe(gulpTslint.report('verbose'));
});

gulp.task('tsc', function () {
    'use strict';

    return gulp.src(srcPaths.tsFiles)
        .pipe(gulpTypescript(tscConfig.compilerOptions))
        .pipe(gulp.dest(buildPath));
});

gulp.task('ts', gulp.series('tslint', 'tsc'));

gulp.task('html', function () {
    'use strict';
    const opts = {
        minifyJS: true,
        removeComments: true,
        collapseWhitespace: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
    };

    return gulp.src([srcPaths.htmlFiles, srcPaths.htmlFiles])
        .pipe(gulpIf(prod, minifyHtml(opts)))
        .pipe(rename({dirname: ''})) // Remove src folder structure
        .pipe(gulp.dest(buildPath));
});

gulp.task('css', function () {
    'use strict';
    removeDirectory(styleBuildPath);
    return gulp.src(srcPaths.cssFiles)
        .pipe(rename({dirname: ''})) // Remove src folder structure
        .pipe(gulp.dest(styleBuildPath));
});

gulp.task('build', gulp.series('clean', 'html', 'ts', 'css'));


gulp.task('watch', function () {
    'use strict';
    gulp.watch(srcPaths.htmlFiles, gulp.series('html'));
    gulp.watch(srcPaths.cssFiles, gulp.series('css'));
    gulp.watch(srcPaths.tsFiles, gulp.series('tsc'));
});

// ----------------------------------------------------------
// R U N
// ----------------------------------------------------------

gulp.task('webserver', function () {
    'use strict';
    const port = '8000';

    console.log("###################");
    console.log(`Webserver-URI: https://${getLocalIp()}:${port}`);
    console.log("###################");

    return gulp.src(buildPath)
        .pipe(
            webserver({
                host: '0.0.0.0',
                port: port,
                https: true,
                livereload: true,
                open: `https://${getLocalIp()}:${port}`
            }));
});

gulp.task('run', gulp.series('html', 'ts', 'css', 'webserver', 'watch'));

// ----------------------------------------------------------
// U T I L S
// ----------------------------------------------------------

function removeDirectory(dir) {
    'use strict';
    return del([dir]);
}

function getLocalIp() {
    'use strict';
    return shelljs.exec(`netsh interface ip show addresses "WiFi" | findstr /R /C:"IP.*"`, {silent: true})
        .stdout
        .trim()
        .substring(11)
        .trim();
}

gulp.task('ip', function () {
    console.log(getLocalIp());
})