const draggables = document.querySelectorAll('.draggable');
const dropZone = document.getElementById('drop-zone');
const feedback = document.getElementById('feedback');

draggables.forEach(piece => {
  piece.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('id', e.target.id);

    const dragImage = piece.cloneNode(true);
    
    dragImage.style.position = "absolute";
    dragImage.style.top = "-9999px";
    dragImage.style.opacity = "1";
    document.body.appendChild(dragImage);

    e.dataTransfer.setDragImage(dragImage, 40, 33.5);

    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 0);
  });
});

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  const droppedId = e.dataTransfer.getData('id');
  const draggedElement = document.getElementById(droppedId);
  const isCorrect = (droppedId === 'correct-answer');

  if (isCorrect) {
    dropZone.classList.remove('empty');
    dropZone.innerText = '';
    draggedElement.classList.forEach(cls => {
        if(cls !== 'draggable' && cls !== 'piece') {
            dropZone.classList.add(cls);
        }
    });
    
    draggedElement.style.visibility = 'hidden';

    showFeedback("맞췄습니다!", true);
    setTimeout(() => { window.open(clickTag, '_blank'); }, 1000);
  } else {
    showFeedback("틀렸습니다.", false);
    setTimeout(() => { feedback.style.display = "none"; }, 1000);
  }
});

function showFeedback(message, isSuccess) {
  feedback.innerText = message;
  feedback.style.backgroundColor = isSuccess ? 'rgba(40, 167, 69, 0.95)' : 'rgba(220, 53, 69, 0.95)';
  feedback.style.display = "block";
}