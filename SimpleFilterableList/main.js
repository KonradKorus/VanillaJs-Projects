const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const userList = document.querySelector('#users');
const msg = document.querySelector('.msg');

myForm.addEventListener('submit', onSubmit);

function onSubmit(e){
    e.preventDefault();

    console.log()
    if(emailInput.value === '' || nameInput.value === ''){
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';

        setTimeout(() => msg.remove(), 3000);
    }
    else{
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(nameInput.value + ' ' + emailInput.value));
        
        userList.appendChild(li);

        nameInput.value = '';
        emailInput.value = '';

    
    }
}
