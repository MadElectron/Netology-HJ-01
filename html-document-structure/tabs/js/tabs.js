const content = document.querySelector('.tabs-content');
const nav = document.querySelector('.tabs-nav');
const sampleTab = nav.querySelector('li');

// Creating tabs
Array.from(content.children).forEach(node => {
  const title = node.dataset.tabTitle;
  const icon = node.dataset.tabIcon;

  const newTab = sampleTab.cloneNode('true');
  newTab.querySelector('a').classList.add(icon);
  newTab.querySelector('a').textContent = title;

  nav.appendChild(newTab);
});

sampleTab.remove();

// Initializing tabs
nav.children[0].classList.add('ui-tabs-active');
changeTab(nav.children[0]);

Array.from(nav.children).forEach(tab =>{
  tab.querySelector('a').addEventListener('click', event => {
    const activeTab = nav.querySelector('li.ui-tabs-active');
    const thisTab = event.target.parentElement;

    if (activeTab !== thisTab) {
      activeTab.classList.remove('ui-tabs-active');
      thisTab.classList.add('ui-tabs-active');
  
      changeTab(thisTab);
    }
  });
});


function changeTab(activeTab) {
  const title = activeTab.querySelector('a').textContent;

  Array.from(content.children).forEach(article => {
    if (article.dataset.tabTitle === title) {
      article.classList.remove('hidden');
    } else {
      article.classList.add('hidden');
    }
  });
}