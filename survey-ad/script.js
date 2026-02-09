function nextStep(stepNumber) {
  const steps = document.querySelectorAll('.step');
  steps.forEach(step => step.classList.remove('active'));

  const nextStep = document.getElementById('step' + stepNumber);
  if (nextStep) {
    nextStep.classList.add('active');
  }
}

function finishSurvey() {
  window.open(clickTag, '_blank');
}