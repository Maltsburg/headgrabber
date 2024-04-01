document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
        button.addEventListener('click', playButtonSound);
    });

    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('download')) {
            playButtonSound();
        }
    });
});

function playButtonSound() {
    const buttonSound = document.getElementById('buttonSound');
    buttonSound.play();
}
