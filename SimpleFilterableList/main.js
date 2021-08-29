let filterInput = document.getElementById('filter');

filterInput.addEventListener('keyup', checkFilter);

function checkFilter(e){
    let searchingValue = e.target.value.toUpperCase();

    let contactList = document.querySelectorAll('li.contacts-item');
    
    Array.from(contactList).forEach(contact => {
       let aElement = contact.children[0].innerHTML;

       if(aElement.toUpperCase().indexOf(searchingValue) > -1){
            contact.style.display = '';
        } else{
            contact.style.display = 'none';
       }    

    });
}
