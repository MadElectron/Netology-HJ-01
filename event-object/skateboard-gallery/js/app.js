const view = document.getElementById('view');
const gallery = document.getElementById('nav');
const hrefs = gallery.getElementsByTagName('a');

Array.from(hrefs).forEach(href => {
  href.addEventListener('click', event => {
    event.preventDefault();

    Array.from(hrefs).forEach(href => href.classList.remove('gallery-current'));
    href.classList.add('gallery-current');

    view.src = href.href;
  });
});