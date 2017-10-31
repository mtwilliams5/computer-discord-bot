// eslint-disable no-console

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var eslint = require('gulp-eslint');

gulp.task('lint', () => {
  return gulp.src(['*.js', '**/*.js', '!node_modules/**'])
    .pipe(eslint('./.eslintrc.json'))
    .pipe(eslint.format());
});

gulp.task('start', function() {
  var stream = nodemon({
    script: 'bot.js',
    ext: 'js json',
    tasks: ['lint']
  });

  stream
    .on('restart', function() {
      console.log('restarted!');
    })
    .on('crash', function() {
      console.error('Application has crashed!\n');
      stream.emit('restart', 10) // restart the server in 10 seconds
    });
});

gulp.task('default', ['start']);
