import { bedrockSkinGrabber } from './Head/bedrock.js';
import { getJavaHead } from './Head/java.js';
import { bedrockSkinConstructor } from './Head/bedrockbuilder.js';
import { addDownloadButton } from './Head/download.js'; // Import download functions

document.addEventListener('DOMContentLoaded', function() {
    const getPlayerHeadBtn = document.getElementById('getPlayerHeadBtn');
    getPlayerHeadBtn.addEventListener('click', getHead); // Add event listener to getPlayerHeadBtn
});

async function getHead() {
    const username = document.getElementById('username').value;
    const edition = document.getElementById('edition').value;
    const resultDiv = document.getElementById('result');
    const nameDiv = document.getElementById('name');

    nameDiv.innerHTML = '';
    resultDiv.innerHTML = '';

    try {
        if (!username) {
            resultDiv.innerHTML = 'Please enter a username.';
            return;
        }

        if (edition === 'java') {

            await getJavaHead(username, resultDiv, nameDiv);
            addDownloadButton(resultDiv, username);
        } else if (edition === 'bedrock') {

            const skinData = await bedrockSkinGrabber(username);
            bedrockSkinConstructor(skinData, resultDiv, nameDiv, function() {
                addDownloadButton(resultDiv, username);
            });
        } else {
            resultDiv.innerHTML = 'Unsupported edition. Please select Java or Bedrock.';
        }

    } catch (error) {
        console.error('Error:', error);
        resultDiv.innerHTML = `Error retrieving player head: ${error.message}`;
    }

    document.getElementById("username").value = "";
}
