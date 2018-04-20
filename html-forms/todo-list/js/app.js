const listBlock = document.querySelector('.list-block');
const checkboxes = listBlock.querySelectorAll('input[type=checkbox]');
const output = listBlock.querySelector('output');

const allTasks = checkboxes.length;
let doneTasks = Array.from(checkboxes).filter(cb => cb.checked
).length;

initOutput();

Array.from(checkboxes).forEach(cb => {
  cb.addEventListener('click', event => {
    if (event.target.checked) {
      doneTasks++;
    } else {
      doneTasks--;
    }

    initOutput();
  })
})

function initOutput() {
    output.textContent = `${doneTasks} из ${allTasks}`;
    if (allTasks === doneTasks) {
      listBlock.classList.add('complete');
    } else {
      listBlock.classList.remove('complete');
    }
};
