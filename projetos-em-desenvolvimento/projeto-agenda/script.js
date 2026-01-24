const addButton = document.querySelector('button[type="submit"]').addEventListener('click', function(event) {
    event.preventDefault()
    const personName = document.getElementById('name').value;
    const personPhone = document.getElementById('phone').value;

    if (personName === '' || personPhone === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    } else {
        addPersonToList(personName, personPhone);
        document.getElementById('name').value = '';
        document.getElementById('phone').value = '';
    }});

    const contactsList = document.getElementById('output');

function addPersonToList(name, phone) {
    let people = [];
    people.push({nome: name, telefone: phone});

    const listItem = document.createElement('li');
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    const phoneText = document.createElement('span');
    const rmButton = document.createElement('button');

    rmButton.innerHTML = '<i class="fa-solid fa-trash"></i>';

    rmButton.addEventListener('click', function() {
        contactsList.removeChild(listItem);
    });

    summary.textContent = name;
    phoneText.textContent = phone;

    contactsList.appendChild(listItem);
    listItem.appendChild(details);
    details.appendChild(summary);
    details.appendChild(phoneText);
    listItem.appendChild(rmButton);
}