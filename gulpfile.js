const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const plumber = require('gulp-plumber');


function css( done ) {
    // Compilar SASS
    src('src/scss/**/*.scss') // Identificar Archivo
        //.pipe( sass({ outputStyle: 'compressed' }) ) // Compilar CSS minificado
        .pipe( plumber()) // Con Plumber no se detiene la ejecuión de gulp cuando hay un error
        .pipe( sass({ outputStyle: 'expanded' })) // Compilar CSS extendido
        .pipe( postcss([ autoprefixer() ]) ) // Compatibilidad entre navegadores
        .pipe( dest('build/css') ) // Guardar en css

    done();
}


function dev() {
    watch( 'src/scss/**/*.scss', css) // Observa todos los archivos dentro de 
    // watch('src/scss/app.scss', css) // Observa sólo 1 archivo
}


exports.css = css;
exports.dev = dev;
exports.default = series( css, dev ); // Opciones -> Series y Parallel