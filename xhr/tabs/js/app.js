const content = document.getElementById('content');
const tabs = document.querySelectorAll('nav a');
let activeTab = document.querySelector('nav a.active');
let href = activeTab.getAttribute('href');

document.addEventListener('DOMContentLoaded', init);

Array.from(tabs).forEach(tab => {
  tab.addEventListener('click', function(event) {
    event.preventDefault();

    activeTab = document.querySelector('nav a.active');
    href = this.getAttribute('href');
    
    if (!this.classList.contains('active')) {
      activeTab.classList.remove('active');
      this.classList.add('active');
  
      init();
    }
  });
});

function init() {
  const xhr = new XMLHttpRequest();
  const preloader = document.getElementById('preloader');
  
  xhr.addEventListener('loadstart', () => {
    preloader.classList.remove('hidden');
  });

  xhr.addEventListener('loadend', () => {
    preloader.classList.add('hidden');
    content.innerHTML = xhr.responseText;
  });

  xhr.open("GET", href, true);
  xhr.send();
}
