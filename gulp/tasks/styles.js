import gulpif from 'gulp-if';
import browserSync from 'browser-sync';
import cleanCSS from 'gulp-clean-css';
import * as sass from 'sass'; // Исправленный импорт согласно документации
import gulpSass from 'gulp-sass';
import plumber from 'gulp-plumber';
import autoprefixer from 'gulp-autoprefixer';
import notify from 'gulp-notify';

// Инициализация Sass компилятора
const sassCompiler = gulpSass(sass);

// Конфигурация Autoprefixer
const autoprefixerConfig = {
  cascade: false,
  grid: true,
  overrideBrowserslist: "last 5 versions"
};

// Конфигурация cleanCSS для production
const cleanCssConfig = {
  level: 2
};

// Обработчик ошибок
const errorHandler = notify.onError({
  title: "SCSS Compilation Error",
  message: "Error: <%= error.message %>"
});

/**
 * Компиляция SCSS в CSS
 * @returns {Stream} Gulp stream
 */
export const styles = () => {
  const { srcScss, buildCssFolder } = app.paths;
  const { isProd } = app;

  return app.gulp.src(srcScss, {
      sourcemaps: !isProd
    })
    .pipe(plumber({ errorHandler }))
    .pipe(sassCompiler().on('error', sassCompiler.logError))
    .pipe(autoprefixer(autoprefixerConfig))
    .pipe(gulpif(isProd, cleanCSS(cleanCssConfig)))
    .pipe(app.gulp.dest(buildCssFolder, {
      sourcemaps: isProd ? false : '.'
    }))
    .pipe(browserSync.stream());
};
