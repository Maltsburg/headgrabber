function addText(text) {
  var displayTextElement = document.getElementById("displayText");
  displayTextElement.textContent = text;
}

window.onload = function() {
  fetch('./Head/splashtxt.json')
    .then(response => response.json())
    .then(splashTextList => {

      const randomIndex = Math.floor(Math.random() * splashTextList.length);
      const randomSplashText = splashTextList[randomIndex];
      
      addText(randomSplashText);
    })
    .catch(error => console.error('Error loading splash text:', error));
};
