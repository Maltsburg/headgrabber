export async function getJavaHead(username, resultDiv, nameDiv) {
    try {
        // Fetch player UUID from playerdb.co
        const playerdbUrl = `https://playerdb.co/api/player/minecraft/${username}`;
        const playerdbResponse = await fetch(playerdbUrl);
        
        if (!playerdbResponse.ok) {
            throw new Error('Failed to fetch player UUID from PlayerDB.');
        }
        
        const playerdbData = await playerdbResponse.json();
        const playerId = playerdbData.data.player.id;
        
        // Fetch player head using UUID from api.mineatar.io with query parameters
        const mineatarUrl = `https://api.mineatar.io/face/${playerId}?scale=23&overlay=true&format=png`;
        const mineatarResponse = await fetch(mineatarUrl);
        
        if (!mineatarResponse.ok) {
            throw new Error('Failed to fetch player head from Mineatar.');
        }
        
        const blob = await mineatarResponse.blob();
        const imageUrl = URL.createObjectURL(blob);
        
        // Display player head
        const headImg = document.createElement('img');
        headImg.src = imageUrl;
        resultDiv.innerHTML = '';
        nameDiv.innerHTML = `${username}`;
        resultDiv.appendChild(headImg);
    } catch (error) {
        console.error('Error:', error);
        resultDiv.innerHTML = `Error retrieving Java player head: ${error.message}`;
    }
    document.getElementById("username").value = "";
}
