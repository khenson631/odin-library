"use strict";

const myLibrary = [];

// Constructor function for books
function Book(title,author,id,read) {
    this.title = title;
    this.author = author;
    this.id = id;
    this.read = read;
}

// Function to add new books to library
function addBookToLibrary(title,author,id,read) {
    let book = new Book(title,author,id,read);
    myLibrary.push(book);
}

// function to create unique ID per book
function createID() {
    return crypto.randomUUID();
}

// Add some books
addBookToLibrary('Hamlet','William Shakespeare',createID(),true);
addBookToLibrary('On The Road','Jack Kerouac',createID(),true);


// test: log books
myLibrary.forEach(element => {
    console.log(element);
});

// Loop thru library array and display each book on page
   const cardContainer = document.getElementById('card-container');

   function createCard(data) {
     const card = document.createElement('div');
     card.classList.add('card'); // Add a CSS class for styling

     const title = document.createElement('h2');
     title.textContent = data.title;
     card.appendChild(title);

     const author = document.createElement('h3');
     author.textContent = data.author;
     card.appendChild(author);
    
    const read = document.createElement('input')
    read.type = 'checkbox';
    read.checked = data.read;
    read.id = 'read-checkbox';
    card.appendChild(read);

    const label = document.createElement('label');
    label.htmlFor = 'read-checkbox';
    label.textContent = 'Read?';

    return card;
   }

//    const cardData = [
//      { title: 'Card 1', content: 'This is the content of card 1.' },
//      { title: 'Card 2', content: 'This is the content of card 2.' },
//      { title: 'Card 3', content: 'This is the content of card 3.' },
//    ];

    myLibrary.forEach(element => {
     const card = createCard(element);
     cardContainer.appendChild(card);
   });

// Add Book functionality
const addBookDialog = document.getElementById("add-book-dialog");

const addBookBtn = document.getElementById('add-book-btn');
addBookBtn.addEventListener('click', ()=> {
    addBookDialog.showModal();
}
)

