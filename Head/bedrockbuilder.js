export function bedrockSkinConstructor(skinData, resultDiv,nameDiv, callback) {
  try {

      if (skinData && skinData.texture_id) {
          const textureId = skinData.texture_id;
          const username = document.getElementById('username').value;
          
          const textureUrl = `https://textures.minecraft.net/texture/${textureId}`;

          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          const img = new Image();
          img.crossOrigin = 'Anonymous'; 
          img.src = textureUrl;

          img.onload = function () {
   
              const headCanvas = document.createElement('canvas');
              const headCtx = headCanvas.getContext('2d');
              headCanvas.width = 180; 
              headCanvas.height = 180;

              headCtx.imageSmoothingEnabled = false;
              headCtx.drawImage(img, 8, 8, 8, 8, 0, 0, 180, 180);

              // Create helmet canvas
              const helmetCanvas = document.createElement('canvas');
              const helmetCtx = helmetCanvas.getContext('2d');
              helmetCanvas.width = 180;
              helmetCanvas.height = 180;

              helmetCtx.imageSmoothingEnabled = false;
              helmetCtx.drawImage(img, 40, 8, 8, 8, 0, 0, 180, 180);

              headCtx.globalCompositeOperation = 'source-over';
              headCtx.drawImage(helmetCanvas, 0, 0);

              resultDiv.innerHTML = '';
              resultDiv.appendChild(createImageFromCanvas(headCanvas));
            
              nameDiv.innerHTML = `${username}`;
              if (typeof callback === 'function') {
                callback();
            }
          };
      } else {
          console.error('Unexpected response from Bedrock API:', skinData);
          throw new Error('Texture ID not found in the Bedrock skin data');
      }
  } catch (error) {
      console.error('Error:', error);
      resultDiv.innerHTML = `Error constructing Bedrock player head: ${error.message}`;
  }
  document.getElementById("username").value = "";
}


function createImageFromCanvas(canvas) {
  const img = new Image();
  img.src = canvas.toDataURL();
  return img;
}