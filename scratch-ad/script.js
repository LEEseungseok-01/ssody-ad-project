const canvas = document.getElementById('scratch-canvas');
const ctx = canvas.getContext('2d');
const wrapper = document.querySelector('.scratch-wrapper');

canvas.width = wrapper.clientWidth;
canvas.height = wrapper.clientHeight;

// 초기 덮개 설정
ctx.fillStyle = '#3d3d47';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = '#888';
ctx.font = '14px Malgun Gothic';
ctx.textAlign = 'center';
ctx.fillText('여기를 긁어보세요', canvas.width / 2, canvas.height / 2 + 5);

let isDrawing = false;

// 긁힌 비율을 계산하는 함수
function checkScratchPercentage() {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;
  let transparentPixels = 0;

  // 픽셀 배열은 [R, G, B, A] 순서로 저장됨 (A가 알파/투명도값)
  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 3] < 128) { // 투명도가 절반 이하로 떨어지면 긁힌 것으로 간주
      transparentPixels++;
    }
  }

  const percentage = (transparentPixels / (pixels.length / 4)) * 100;

  // 40% 이상 긁혔을 때 실행
  if (percentage > 40) {
    canvas.style.transition = 'opacity 0.5s';
    canvas.style.opacity = '0'; // 캔버스를 서서히 사라지게 함
    
    // 잠시 후 링크 이동 (index.html에 정의된 clickTag 사용)
    setTimeout(() => {
      window.open(clickTag, '_blank');
    }, 1000);
  }
}

function scratch(e) {
  if (!isDrawing) return;

  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX || e.touches[0].clientX) - rect.left;
  const y = (e.clientY || e.touches[0].clientY) - rect.top;

  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 2);
  ctx.fill();

  // 긁을 때마다 비율 체크
  checkScratchPercentage();
}

canvas.addEventListener('mousedown', () => isDrawing = true);
canvas.addEventListener('touchstart', () => isDrawing = true);
window.addEventListener('mouseup', () => isDrawing = false);
window.addEventListener('touchend', () => isDrawing = false);
canvas.addEventListener('mousemove', scratch);
canvas.addEventListener('touchmove', scratch);