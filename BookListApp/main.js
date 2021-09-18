// Book Class: Represents a Book
class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;

    }
}


// UI Class: Handle UI Tasks
class UI {
    static displayBooks(){
         const books = Store.getBooks();
         books.forEach(book => UI.addBookToList(book));

    }


    static addBookToList(book) {
        const list = document.querySelector('#bookList');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delBtn">X</a></td>
        `;

        list.appendChild(row);

    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert ${className}`;

        div.appendChild(document.createTextNode(message));


        const container = document.querySelector('#container');
        const form = document.querySelector('#bookForm');

        container.insertBefore(div, form);

        //Vanising in 3 seconds

        setTimeout(() => document.querySelector('.alert').remove(), 3000);

    }


    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    static deleteBook(el){
        if(el.classList.contains('delBtn')){
            el.parentElement.parentElement.remove();
            UI.showAlert('Book Removed', 'succes');
            
        }
    }

}


// Store Class: Handless Storage
class Store {
    static getBooks(){
        let books;

        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book){
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });


        localStorage.setItem('books',JSON.stringify(books));
    }
}


// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);


//Event: Add a Book
document.querySelector('#bookForm').addEventListener('submit', (e) =>{
    //Prevent actual submit
    e.preventDefault();
    
    //get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //Validate
    if(title === '' || author === '' || isbn === ''){
        UI.showAlert('Please enter all fields', 'failure');
    }else{
        //Instatiate book
        const book = new Book(title, author, isbn);

        console.log(e);

        //Add book to list
        UI.addBookToList(book);
        Store.addBook(book);

        //Show succes alert
        UI.showAlert('Book Added', 'succes');

        //Clear Fields
        UI.clearFields();

    }
});


//Event Remove a Book
document.querySelector('#bookList').addEventListener('click', (e) =>{
    UI.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});

