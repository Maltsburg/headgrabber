async function getHead() {
    const username = document.getElementById('username').value;
    const edition = document.getElementById('edition').value;
    const resultDiv = document.getElementById('result');

    try {
        if (edition === 'java') {
            // Use Minotar for Java edition
            const apiUrl = `https://minotar.net/helm/${username}`;
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`Failed to fetch data from Java API`);
            }

            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);

            // Display the head image on the page
            const headImg = document.createElement('img');
            headImg.src = imageUrl;
            resultDiv.innerHTML = '';
            resultDiv.appendChild(headImg);

        } else if (edition === 'bedrock') {
            // Use GeyserMC API to get XUID for Bedrock edition
            const Username = encodeURIComponent(username);
            const xuidResponse = await fetch(`https://api.geysermc.org/v2/xbox/xuid/${Username}`);

            if (!xuidResponse.ok) {
                throw new Error(`Failed to fetch XUID from Bedrock API: ${xuidResponse.status} ${xuidResponse.statusText}`);
            }

            const xuidData = await xuidResponse.json();
            const xuid = xuidData.xuid;

            // Fetch Texture ID
            const skinResponse = await fetch(`https://api.geysermc.org/v2/skin/${xuid}`);

            if (!skinResponse.ok) {
                throw new Error(`Failed to fetch skin data from Bedrock API: ${skinResponse.status} ${skinResponse.statusText}`);
            }

            const skinData = await skinResponse.json();

            // Check if 'texture_id' is defined in the response
            if (skinData && skinData.texture_id) {
                const textureId = skinData.texture_id;

                // Generate Texture URL
                const textureUrl = `https://textures.minecraft.net/texture/${textureId}`;

                // Use HTML5 Canvas for image processing
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Load the image onto the canvas
                const img = new Image();
                img.crossOrigin = 'Anonymous'; // Enable cross-origin image loading
                img.src = textureUrl;

                img.onload = function () {
                    // Create head canvas
                    const headCanvas = document.createElement('canvas');
                    const headCtx = headCanvas.getContext('2d');
                    headCanvas.width = 180; // Set a higher resolution
                    headCanvas.height = 180;

                    // Disable image smoothing for pixel-perfect resizing
                    headCtx.imageSmoothingEnabled = false;
                    headCtx.drawImage(img, 8, 8, 8, 8, 0, 0, 180, 180);

                    // Create helmet canvas
                    const helmetCanvas = document.createElement('canvas');
                    const helmetCtx = helmetCanvas.getContext('2d');
                    helmetCanvas.width = 180; // Set a higher resolution
                    helmetCanvas.height = 180;

                    // Disable image smoothing for pixel-perfect resizing
                    helmetCtx.imageSmoothingEnabled = false;
                    helmetCtx.drawImage(img, 40, 8, 8, 8, 0, 0, 180, 180);

                    // Overlay helmet on top of head
                    headCtx.globalCompositeOperation = 'source-over';
                    headCtx.drawImage(helmetCanvas, 0, 0);

                    // Display the resulting image on the page
                    resultDiv.innerHTML = '';
                    resultDiv.appendChild(createImageFromCanvas(headCanvas));
                };
            } else {
                console.error('Unexpected response from Bedrock API:', skinData);
                throw new Error('Texture ID not found in the Bedrock skin data');
            }
        } else {
            // Unsupported edition
            resultDiv.innerHTML = 'Unsupported edition. Please select Java or Bedrock.';
        }
    } catch (error) {
        console.error('Error:', error);
        resultDiv.innerHTML = `Error retrieving ${edition} player head: ${error.message}`;
    }
}

function createImageFromCanvas(canvas) {
    const img = new Image();
    img.src = canvas.toDataURL();
    return img;
}
