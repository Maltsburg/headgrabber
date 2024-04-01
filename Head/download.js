export function addDownloadButton(resultDiv, username) {

  if (document.getElementById('downloadButton')) {
    return;
  }

  const downloadBtn = document.createElement('button');
  downloadBtn.textContent = 'Download';
  downloadBtn.id = 'downloadButton';
  downloadBtn.classList.add('download');
  downloadBtn.addEventListener('click', () => {

      const imageUrl = resultDiv.querySelector('img').src; 
      downloadImage(imageUrl, username);
  });

  const downloadDiv = document.getElementById('download');

  downloadDiv.appendChild(downloadBtn);
}

export function downloadImage(imageUrl, filename) {
  const a = document.createElement('a');
  a.href = imageUrl;
  a.download = `${filename}.png`;
  a.click();
}

