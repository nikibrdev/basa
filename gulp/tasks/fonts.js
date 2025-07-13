import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const fonts = () => {
  return (
    app.gulp
      .src([`${app.paths.fontsFolder}/src/*.*`], { encoding: false })
      .pipe(fonter({ formats: ['woff', 'ttf'] }))
      .pipe(app.gulp.dest(app.paths.fontsFolder))
      .pipe(app.gulp.src([`${app.paths.fontsFolder}/*.ttf`], { encoding: false }))
      .pipe(ttf2woff2())
      .pipe(app.gulp.dest(app.paths.buildFontsFolder))
  );
};
