const WIDE_VIEWPORT = 480;
const wideViewport = window.matchMedia(`(min-width: ${WIDE_VIEWPORT}px)`)
const MIN_DOWNLINK = 1; // Slow 3G ~~ 0.4, Fast 3G ~~ 1.4
function resizeVideo(wideViewport) {
  let videoEl = document.getElementById("hero-video");
  let src = videoEl.dataset.mobileSrc;
  let poster = videoEl.dataset.mobilePoster;
  let widthDisplay = 'MOBILE';
  if (wideViewport.matches) {
    src = videoEl.dataset.desktopSrc;
    poster = videoEl.dataset.desktopPoster;
    widthDisplay = 'DESKTOP';
  }
  let downlink = MIN_DOWNLINK;
  try {
    downlink = navigator.connection.downlink;
  } catch (e) {
    console.log(`Unable to determine downlink`)
  }
  if (videoEl.src !== src) {
    if (downlink >= MIN_DOWNLINK) {
      videoEl.src = src;
      widthDisplay += " - FAST";
      console.log(`Detected bandwidth (${downlink}Mbps) greater than threshold (${MIN_DOWNLINK}Mbps) - showing video`);
    } else {
      widthDisplay += " - SLOW";
      console.log(`Not showing video due to low bandwidth`);
    }
    videoEl.poster = poster;
  }
  document.getElementById('width-display').textContent = widthDisplay;
}
wideViewport.addListener(resizeVideo)
resizeVideo(wideViewport)
