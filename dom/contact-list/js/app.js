const contacts = JSON.parse(loadContacts());
const list = document.querySelector('.contacts-list');
let listHTML = '';

contacts.forEach(contact => {
  listHTML += `
    <li data-email="${contact.email}" data-phone="${contact.phone}">
      <strong>${contact.name}</strong>
    </li>
  `;
});

list.innerHTML = listHTML;