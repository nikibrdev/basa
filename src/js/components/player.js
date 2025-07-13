document.addEventListener('DOMContentLoaded', function () {
  const playBtn = document.getElementById('play-btn');
  const progress = document.getElementById('progress');
  const progressBar = document.getElementById('progress-bar');
  const progressThumb = document.getElementById('progress-thumb');
  const currentTimeEl = document.getElementById('current-time');
  const durationEl = document.getElementById('duration');
  const timeRemainingEl = durationEl.querySelector('.player__time-remaining');
  const volumeProgress = document.getElementById('volume-progress');
  const volumeBar = document.getElementById('volume-bar');
  const volumeThumb = document.getElementById('volume-thumb');
  const decreaseVolumeBtn = document.querySelector('.player__volume-btn--decrease');
  const increaseVolumeBtn = document.querySelector('.player__volume-btn--increase');

  // Имитация аудио
  const audio = {
    duration: 209,
    currentTime: 134,
    volume: 0.8,
    playing: false,
    play: function () { this.playing = true; updateTime(); },
    pause: function () { this.playing = false; },
    setCurrentTime: function (time) {
      this.currentTime = Math.max(0, Math.min(time, this.duration));
      updateProgressBar();
    },
    setVolume: function (vol) {
      this.volume = Math.max(0, Math.min(vol, 1));
      updateVolumeBar();
    },
    changeVolume: function (delta) {
      this.setVolume(this.volume + delta);
    }
  };

  updateProgressBar();
  updateVolumeBar();

  playBtn.addEventListener('click', function () {
    if (audio.playing) {
      audio.pause();
      playBtn.innerHTML = '<img loading="lazy" src="img/icons/play.svg"  width="40" height="40">';
    } else {
      audio.play();
      playBtn.textContent = '⏸';
    }
  });

  let isDraggingProgress = false;

  progressBar.addEventListener('click', function (e) {
    const percent = e.offsetX / this.clientWidth;
    audio.setCurrentTime(percent * audio.duration);
  });

  progressBar.addEventListener('mousedown', function (e) {
    isDraggingProgress = true;
    const percent = e.offsetX / this.clientWidth;
    audio.setCurrentTime(percent * audio.duration);
    document.addEventListener('mousemove', dragProgress);
    document.addEventListener('mouseup', stopDragProgress);
  });

  function dragProgress(e) {
    if (!isDraggingProgress) return;
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.setCurrentTime(percent * audio.duration);
  }

  function stopDragProgress() {
    isDraggingProgress = false;
    document.removeEventListener('mousemove', dragProgress);
    document.removeEventListener('mouseup', stopDragProgress);
  }

  let isDraggingVolume = false;

  volumeBar.addEventListener('click', function (e) {
    const percent = e.offsetX / this.clientWidth;
    audio.setVolume(percent);
  });

  volumeBar.addEventListener('mousedown', function (e) {
    isDraggingVolume = true;
    const percent = e.offsetX / this.clientWidth;
    audio.setVolume(percent);
    document.addEventListener('mousemove', dragVolume);
    document.addEventListener('mouseup', stopDragVolume);
  });

  function dragVolume(e) {
    if (!isDraggingVolume) return;
    const rect = volumeBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.setVolume(percent);
  }

  function stopDragVolume() {
    isDraggingVolume = false;
    document.removeEventListener('mousemove', dragVolume);
    document.removeEventListener('mouseup', stopDragVolume);
  }

  decreaseVolumeBtn.addEventListener('click', function () {
    audio.changeVolume(-0.1);
  });

  increaseVolumeBtn.addEventListener('click', function () {
    audio.changeVolume(0.1);
  });

  function updateProgressBar() {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${percent}%`;
    progressThumb.style.left = `${percent}%`;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    timeRemainingEl.textContent = `-${formatTime(audio.duration - audio.currentTime)}`;
  }

  function updateVolumeBar() {
    const percent = audio.volume * 100;
    volumeProgress.style.width = `${percent}%`;
    volumeThumb.style.left = `${percent}%`;

  }

  function updateTime() {
    if (!audio.playing) return;

    if (audio.currentTime < audio.duration) {
      audio.currentTime += 1;
      updateProgressBar();
      setTimeout(updateTime, 1000);
    } else {
      audio.pause();
      playBtn.textContent = '<img loading="lazy" src="img/icons/play.svg"  width="40" height="40">';
    }
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

  document.querySelector('.player__btn--prev').addEventListener('click', function () {
    console.log('Предыдущий трек');
  });

  document.querySelector('.player__btn--next').addEventListener('click', function () {
    console.log('Следующий трек');
  });
  document.querySelector('.player__btn--random').addEventListener('click', function () {
    console.log('Перемешивание треков');
  });

  document.querySelector('.player__btn--repeat').addEventListener('click', function () {
    console.log('Повтор треков');
  });
});
