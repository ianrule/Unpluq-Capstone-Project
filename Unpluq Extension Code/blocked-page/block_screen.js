// pulled from Biswas's "content.js" file


//If the extension should be blocking, set it to true
chrome.storage.local.get('isBlocking', function(result) {
  //if isBlocking is true, execute block
  if (result.isBlocking) {
    console.log('Executing block: isBlocking is true');
    // Code to execute if myBoolean is true
    if (window.location.hostname === "www.youtube.com" || window.location.hostname === "www.facebook.com" || window.location.hostname === "www.instagram.com") {
      //get the html file to inject
      fetch(chrome.runtime.getURL('inject_block.html'))
          .then(response => response.text())
          .then(data => {
              //replace the current page with the html file
              document.body.innerHTML = data;
          })
          .catch(error => {
              console.error('Error fetching the HTML file:', error);
          });
    }
  } else {
    //isBlocking is false
    console.log('Not executing block: isBlocking is false');
  }
});

//wait for the page to be blocked
setTimeout(function() {
  var unblockButton = document.getElementById('stopBlocking');
  if (unblockButton) {
    //when the button is clicked, set isBlocking to false and reload the page to stop blocking
    unblockButton.addEventListener('click', function() {
      console.log('The button was clicked.');
      // Handle the click event here
      chrome.storage.local.set({ isBlocking: false }, function() {
        console.log('IsBlocking was set to false.');
      });
      window.location.reload();
    });
  } else {
    console.log('The button was not found after 2 seconds.');
  }
}, 3000); // 3000 milliseconds = 2 seconds

//wait for extension to load
document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById("startBlocking").addEventListener("click", function(){
    chrome.storage.local.set({ isBlocking: true }, function() {
      //when start blocking is clicked, set isBlocking to true and reload the page to start blocking
      console.log('IsBlocking was set to true.');
    });
    chrome.tabs.reload();
    console.log('reloading');
  }
)});
//code for timer if we need it in the future
// let interval; // global variable to store for existing timer
// let isTimerRunning = false; // global variable to check if timer is running
// function timer(hours, minutes){
//   //check if there is a timer is already running
//   if(interval){
//     clearInterval(interval);
//   }
//   let totalTime = hours * 60 * 60 + minutes * 60;
//   isTimerRunning = true;
//   //update timer every second
//   interval = setInterval(function(){
//     totalTime--;
//     let hoursLeft = Math.floor(totalTime / 3600);
//     let minutesLeft = Math.floor((totalTime % 3600) / 60);
//     let secondsLeft = totalTime % 60;
//     //display timer
//     document.getElementById("timerDisplay").innerText = "Time left: " + hoursLeft + "h " + minutesLeft + "m " + secondsLeft + "s ";
//     document.getElementById("timerDisplay").style.color = "white";
//     //stop timer when time is up
//     if(totalTime <= 0){
//       clearInterval(interval);
//       isTimerRunning = false;
//       document.getElementById("timerDisplay").innerText = "Time's up!";
//     }
//   }, 1000);
// }
// //stop timer
// function stopTimer() {
//   //if there is a timer running, stop it
//   if(interval) {
//     clearInterval(interval);
//     isTimerRunning = false;
//     //display timer stopped
//     document.getElementById("timerDisplay").innerText = "Timer stopped";
//     document.getElementById("timerDisplay").style.color = "white"; 
//   }
// }
// //block website if timer is running
// function blockWebsite(){
//   if(isTimerRunning){
//     let blockedWebsite = ["www.facebook.com", "www.youtube.com", "www.tiktok.com", "www.instagram.com"];
//     if(blockedWebsite.includes(window.location.hostname)){
//       window.document.body.innerHTML = blockHTML;
//     }
// }
// }
// //start timer when button is clicked
// document.addEventListener('DOMContentLoaded', (event) => {
//   document.getElementById("startTimer").addEventListener("click", function(){
//     let hours = document.getElementById("hours").value;
//     let minutes = document.getElementById("minutes").value;
//     //check if hours and minutes are valid numbers and not empty
//     if(hours){
//       hours = parseInt(hours);
//     } else { hours = 0; }
//     if(minutes){
//         minutes = parseInt(minutes);
//     } else { minutes = 0; }

//     if(isNaN(hours) || isNaN(minutes)){
//       alert("Please enter a valid number");
//       return;
//     }
//     //start timer
//     timer(hours, minutes);
//   });
//   //stop timer when button is clicked
//   document.getElementById("stopTimer").addEventListener("click", function() {
//     stopTimer();
//   });
// });
// blockWebsite();

