// pulled from Biswas's "content.js" file

var blockHTML = `<!DOCTYPE html>
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

if(window.location.hostname == "www.facebook.com"){
    document.body.innerHTML = blockHTML;
}

/*if(window.location.hostname == "www.youtube.com"){      Commented out temporarily so I can watch youtube while I code
    document.body.innerHTML = blockHTML;
}
*/

if(window.location.hostname == "www.tiktok.com"){
    document.body.innerHTML = blockHTML;
}
if(window.location.hostname == "www.instagram.com"){
    document.body.innerHTML = blockHTML;
}