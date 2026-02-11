const items = document.querySelectorAll('.carousel-item');
const bgSegs = [
  document.getElementById('bg-left'),
  document.getElementById('bg-center'),
  document.getElementById('bg-right')
];

let indices = [0, 1, 2];

function updateDisplay() {
  items.forEach((item, i) => {
    item.classList.remove('left', 'center', 'right');
    
    if (i === indices[0]) {
      item.classList.add('left');
      bgSegs[0].style.backgroundImage = `url(${item.querySelector('img').src})`;
    } else if (i === indices[1]) {
      item.classList.add('center');
      bgSegs[1].style.backgroundImage = `url(${item.querySelector('img').src})`;
    } else if (i === indices[2]) {
      item.classList.add('right');
      bgSegs[2].style.backgroundImage = `url(${item.querySelector('img').src})`;
    }
  });
}

function rotateNext() {
  const last = indices.pop();
  indices.unshift(last);
  updateDisplay();
}

updateDisplay();