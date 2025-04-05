function playVideo(){

}
  const video = document.getElementById("showcase-video");
  const overlay = document.getElementById("video-overlay");

  if (video && overlay) {
    overlay.addEventListener("click", function () {
      overlay.remove();
      video.controls = true;
      video.play();
    });
  }

  document.addEventListener("DOMContentLoaded", function(){
    playVideo()
  })


export{
    playVideo
}