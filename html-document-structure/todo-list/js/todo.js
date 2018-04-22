const done = document.querySelector('section.done');
const undone = document.querySelector('section.undone');

const checkboxes = document.querySelectorAll('.todo-list input[type="checkbox"]');

Array.from(checkboxes).forEach(cb => {
  cb.addEventListener('change', event => {
    const label = event.target.parentElement;
    const section = label.parentElement;
    const destSection = section === done ? undone : done;

    section.removeChild(label);
    destSection.appendChild(label);
  })
});