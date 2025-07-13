import webp from 'gulp-webp';
import gulpif from 'gulp-if';
import imagemin from 'gulp-imagemin';
import avif from 'gulp-avif';
import newer from "gulp-newer";

export const images = () => {
  return app.gulp.src([`${app.paths.srcImgFolder}/**/**.{jpg,jpeg,png,svg}`], { encoding: false })
    // .pipe(newer(app.paths.buildImgFolder))
    // .pipe(avif({quality : 50 }))
    // .pipe(app.gulp.src([`${app.paths.srcImgFolder}/**/**.{jpg,jpeg,png}`]))
    .pipe(newer(app.paths.buildImgFolder))
    .pipe(imagemin())
    .pipe(app.gulp.dest(app.paths.buildImgFolder))
};
// function images() {
//   return src(['app/images/src/*.*', '!app/images/src/*.svg'])
//     .pipe(newer('app/images/dist'))
//     .pipe(avif({quality : 50 }))
//     .pipe(src('app/images/src/*.*'))
//     .pipe(newer('app/images/dist'))
//     .pipe(webp())
//     .pipe(src('app/images/src/*.*'))
//     .pipe(newer('app/images/dist'))
//     .pipe(imagemin())
//     .pipe(dest('app/images/dist'))
// }
