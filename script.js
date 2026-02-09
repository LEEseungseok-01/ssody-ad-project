window.onload = function() { //html 실행 후 js 실행
  // 상수변수 설정
  const button = document.getElementById('draggable-button');
  const track = document.getElementById('slider-track');
  const interactionLayer = document.getElementById('interaction-layer');
  const fill = document.getElementById('slider-fill');

  // 드래그 상태를 추적하는 변수
  let isDragging = false;     // 드래그 상태
  let isDragAttempt = false;  // 클릭과 구분하기 위해
  
  // 드래그 시작 시점의 정보
  let startX = 0;             // 시작 X좌표
  let initialButtonLeft = 0;  // 시작 left 값 기록

  // 드래그 가능 범위 : 트랙 - 버튼 크기만큼
  const minX = 0;
  const maxX = track.clientWidth - button.clientWidth;

  // 손가락 누르면 손가락 좌표, 마우스면 마우스 좌표 
  function getEventX(e) {
    return e.touches ? e.touches[0].clientX : e.clientX;
  }

  function getEventY(e) {
    return e.touches ? e.touches[0].clientY : e.clientY;
  }

  // 현재 이벤트 위치가 버튼 위에 있는지 확인
  function isOverButton(e) {
    const clientX = getEventX(e);
    const clientY = getEventY(e);
    const buttonRect = button.getBoundingClientRect(); // 버튼의 위치 정보

    return ( //버튼의 범위안에 손가락이 있는지 확인하는 것
      clientX >= buttonRect.left &&
      clientX <= buttonRect.right &&
      clientY >= buttonRect.top &&
      clientY <= buttonRect.bottom
    );
  }

  function onDragStart(e) {
    if (isOverButton(e)) {
      e.preventDefault(); // 모바일 화면 스크롤 방지
      isDragAttempt = true; // 드래그 시도 상태로 변경
      
      // 드래그 시작 정보 저장
      startX = getEventX(e);
      initialButtonLeft = button.offsetLeft; // 현재 버튼의 left 값 저장

      // 드래그 이동 및 종료 이벤트를 document 전체에 연결
      // (버튼 밖으로 마우스가 나가도 계속 드래그하기 위함)
      document.addEventListener('mousemove', onDragMove);
      document.addEventListener('touchmove', onDragMove, { passive: false });
      document.addEventListener('mouseup', onDragEnd);
      document.addEventListener('touchend', onDragEnd);
    }
  }

  // 2. 드래그 중 
  function onDragMove(e) {
    if (!isDragAttempt) return;
    
    // 한 번이라도 호출되면'드래그'임
    if (!isDragging) {
      isDragging = true;
    }

    e.preventDefault(); // 스크롤 방지

    // 현재 위치
    let currentX = getEventX(e);
    // 시작 위치 변화량
    let deltaX = currentX - startX;
    // 버튼의 새 left 위치 계산
    let newLeft = initialButtonLeft + deltaX;
    // 버튼이 트랙 경계를 벗어나지 않도록 제한
    newLeft = Math.max(minX, Math.min(newLeft, maxX));
    // 버튼 위치 실제 적용 
    button.style.left = newLeft + 'px'; //버튼의 위치가 바뀐곳에서 모양바꿈
    let fillWidth = newLeft + (button.clientWidth / 2);
    fill.style.width = fillWidth + 'px';  

}

  function onDragEnd(e) {
    // 드래그 시도 상태였을 경우
    if (isDragAttempt) {
      // true면 드래그 중
      if (isDragging) {
        // 상태 리셋
      } 
       // 드래그가 아니라 클릭이면
      else {
        window.open(clickTag, '_blank');
      }
    } 
    // 드래그 시도 중 아니였으면
    else {
      window.open(clickTag, '_blank');
    }

    // 상태 변수,함수 초기화
    isDragAttempt = false;
    isDragging = false;

    document.removeEventListener('mousemove', onDragMove);
    document.removeEventListener('touchmove', onDragMove);
    document.removeEventListener('mouseup', onDragEnd);
    document.removeEventListener('touchend', onDragEnd);
  }

  //interactionLayer에 시작 이벤트 연결
  interactionLayer.addEventListener('mousedown', onDragStart);
  interactionLayer.addEventListener('touchstart', onDragStart, { passive: false });
};