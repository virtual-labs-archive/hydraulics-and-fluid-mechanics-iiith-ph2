




window.onload = function() { var animateProgress=anime({
  targets: 'progress',
  value: 100,
  easing: 'linear',
  autoplay: false
});
document.querySelector('.play-progress1').onclick = animateProgress.restart;
}

