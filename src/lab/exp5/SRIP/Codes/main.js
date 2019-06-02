




window.onload = function() { var animateProgress=anime({
  targets: 'progress',
  value: 100,
  easing: 'linear',
  autoplay: false
});
document.querySelector('.play-progress').onclick = animateProgress.restart;
}

