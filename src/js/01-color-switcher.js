function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const start = document.querySelector('[data-start]');
const stop = document.querySelector('[data-stop]');
let color;

start.addEventListener('click', () => {

    if (!color) {
        color = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    }

    start.disabled = true;

    
});

stop.addEventListener("click", () => {
    clearInterval(color);
    
    start.disabled = false;

    color = null;

});
