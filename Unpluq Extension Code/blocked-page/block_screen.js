// pulled from Biswas's "content.js" file

let blockHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Blocked Website</title>
<style>
  html {
    height: 100%;
  }
  body {
    margin: 0;
    height: 100%;
    font-family: 'Arial', sans-serif;
    background-color: #000;
    color: #f1d905;
    position: relative;
    text-align: center; /* Centers the text horizontally */
  }
  .centered-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* Center the content */
    display: inline-block; /* Allows to apply transform correctly */
  }
  img {
    width: 150px;
    height: auto;
  }
  h1 {
    margin-top: 20px;
    font-size: 48px;
    font-weight: bold;
    text-transform: uppercase;
    color: #f1d905;
  }
</style>
</head>
<body>
<div class="centered-content">
    <img src="${chrome.runtime.getURL('unpluq.jpg')}" alt="Unpluq Logo">
  <h1>Website is Blocked</h1>
</div>
</body>
</html>`;

// if(window.location.hostname == "www.facebook.com"){
//     document.body.innerHTML = blockHTML;
// }
// if(window.location.hostname == "www.youtube.com"){
//     document.body.innerHTML = blockHTML;
// }
// if(window.location.hostname == "www.tiktok.com"){
//     document.body.innerHTML = blockHTML;
// }
// if(window.location.hostname == "www.instagram.com"){
//     document.body.innerHTML = blockHTML;
// }

let interval; // global variable to store for existing timer
let isTimerRunning = false; // global variable to check if timer is running
function timer(hours, minutes){
  //check if there is a timer is already running
  if(interval){
    clearInterval(interval);
  }
  let totalTime = hours * 60 * 60 + minutes * 60;
  isTimerRunning = true;
  //update timer every second
  interval = setInterval(function(){
    totalTime--;
    let hoursLeft = Math.floor(totalTime / 3600);
    let minutesLeft = Math.floor((totalTime % 3600) / 60);
    let secondsLeft = totalTime % 60;
    //display timer
    document.getElementById("timerDisplay").innerText = "Time left: " + hoursLeft + "h " + minutesLeft + "m " + secondsLeft + "s ";
    document.getElementById("timerDisplay").style.color = "white";
    //stop timer when time is up
    if(totalTime <= 0){
      clearInterval(interval);
      isTimerRunning = false;
      document.getElementById("timerDisplay").innerText = "Time's up!";
    }
  }, 1000);
}
//stop timer
function stopTimer() {
  //if there is a timer running, stop it
  if(interval) {
    clearInterval(interval);
    isTimerRunning = false;
    //display timer stopped
    document.getElementById("timerDisplay").innerText = "Timer stopped";
    document.getElementById("timerDisplay").style.color = "white"; 
  }
}
//block website if timer is running
function blockWebsite(){
  if(isTimerRunning){
    let blockedWebsite = ["www.facebook.com", "www.youtube.com", "www.tiktok.com", "www.instagram.com"];
    if(blockedWebsite.includes(window.location.hostname)){
      window.document.body.innerHTML = blockHTML;
    }
}
}
//start timer when button is clicked
document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById("startTimer").addEventListener("click", function(){
    let hours = document.getElementById("hours").value;
    let minutes = document.getElementById("minutes").value;
    //check if hours and minutes are valid numbers and not empty
    if(hours){
      hours = parseInt(hours);
    } else { hours = 0; }
    if(minutes){
        minutes = parseInt(minutes);
    } else { minutes = 0; }

    if(isNaN(hours) || isNaN(minutes)){
      alert("Please enter a valid number");
      return;
    }
    //start timer
    timer(hours, minutes);
  });
  //stop timer when button is clicked
  document.getElementById("stopTimer").addEventListener("click", function() {
    stopTimer();
  });
});
blockWebsite();
