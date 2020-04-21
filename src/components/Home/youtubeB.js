
// 2. This code loads the Youtube IFrame Player API code asynchronously.

if (!window['YT']) {var YT = {loading: 0,loaded: 0};}if (!window['YTConfig']) {var YTConfig = {'host': 'http://www.youtube.com'};}if (!YT.loading) {YT.loading = 1;(function(){var l = [];YT.ready = function(f) {if (YT.loaded) {f();} else {l.push(f);}};window.onYTReady = function() {YT.loaded = 1;for (var i = 0; i < l.length; i++) {try {l[i]();} catch (e) {}}};YT.setConfig = function(c) {for (var k in c) {if (c.hasOwnProperty(k)) {YTConfig[k] = c[k];}}};var a = document.createElement('script');a.type = 'text/javascript';a.id = 'www-widgetapi-script';a.src = 'https://s.ytimg.com/yts/jsbin/www-widgetapi-vflz5iR_Y/www-widgetapi.js';a.async = true;var c = document.currentScript;if (c) {var n = c.nonce || c.getAttribute('nonce');if (n) {a.setAttribute('nonce', n);}}var b = document.getElementsByTagName('script')[0];b.parentNode.insertBefore(a, b);})();}

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var youtubePlayer;
var _youtube_id = document.getElementById('_youtube-iframe');

function onYouTubeIframeAPIReady() {

  youtubePlayer = new YT.Player('_youtube-iframe', {
    videoId: _youtube_id.dataset.youtubeurl,
    playerVars: { // https://developers.google.com/youtube/player_parameters?playerVersion=HTML5
      cc_load_policy: 0, // closed caption
      controls: 0,
      disablekb: 0, //disable keyboard
      iv_load_policy: 3, // annotations
      playsinline: 1, // play inline on iOS
      rel: 0, // related videos
      showinfo: 0, // title
      modestbranding: 3 // youtube logo
    },
    events: {
      'onReady': onYoutubePlayerReady,
      'onStateChange': onYoutubePlayerStateChange
    }
  });
}

function onYoutubePlayerReady(event) {
  event.target.mute();
  event.target.playVideo();
}

function onYoutubePlayerStateChange(event) {
  // if (event.data == YT.PlayerState.PLAYING) { // fade out #_buffering-background
  //   Velocity(document.getElementById('_buffering-background'), { opacity: 0 }, 500);
  // }

  if (event.data == YT.PlayerState.ENDED) { // loop video
    event.target.playVideo();
  }
}
