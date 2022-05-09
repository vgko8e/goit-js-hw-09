const formFields = document.querySelector('.form');
formFields.addEventListener('submit', inputSubmit);

function inputSubmit(evt) {
  evt.preventDefault();

  let inputFirstDelay = Number(evt.target.elements.delay.value);
  let inputDelayStep = Number(evt.target.elements.step.value);
  let inputAmnt = Number(evt.target.elements.amount.value);

  let position = 0;
  for (let i = 0; i < inputAmnt; i += 1) {
    position += 1;

    createPromise(position, inputFirstDelay)
            .then(result => console.log(result))
            .catch(error => console.log(error));

    inputFirstDelay += inputDelayStep;
  }
  evt.currentTarget.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve (`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        // Reject
        reject (`❌ Rejected promise ${position} in ${delay}ms`);
      }
    },delay)
  })

}
