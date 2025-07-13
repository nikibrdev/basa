import avif from 'gulp-avif';

export const avifImages = () => {
  return app.gulp.src([`${app.paths.srcImgFolder}/**/**.{jpg,jpeg,png}`], { encoding: false })
    .pipe(avif({ quality: 50 }))
    .pipe(app.gulp.dest(app.paths.buildImgFolder))
};
