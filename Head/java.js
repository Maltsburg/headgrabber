export async function getJavaHead(username, resultDiv, nameDiv) {
  try {

      const apiUrl = `https://minotar.net/helm/${username}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
          throw new Error(`Failed to fetch data from Java API`);
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);

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
