"use strict";

const myLibrary = [];

// Constructor function for books
function Book(title,author,id,read,pages) {
    this.title = title;
    this.author = author;
    this.id = id;
    this.read = read;
    this.pages = pages;
}

// Function to add new books to library
function addBookToLibrary(title,author,id,read,pages) {
    let book = new Book(title,author,id,read,pages);
    myLibrary.push(book);
}

// function to create unique ID per book
function createID() {
    return crypto.randomUUID();
}

// Add some books
addBookToLibrary('Hamlet','William Shakespeare',createID(),true,'250');
addBookToLibrary('On The Road','Jack Kerouac',createID(),true,'180');


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
    label.htmlFor = '#read-checkbox';
    label.textContent = 'Read: ';

    const pages = document.createElement('p');
    pages.textContent = "Pages: " + data.pages;
    card.appendChild(pages);


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

// const submitBtn = document.getElementById('addBook-Submit');
const addBookModal = document.getElementById('add-book-dialog');

addBookModal.addEventListener('click',function(event){
    if (event.target.tagName === 'BUTTON') {
        const buttonValue = event.target.value;

        if (buttonValue === 'submit') {
        // console.log('Button with value "value1" was clicked!');
            const form = addBookModal.querySelector('form');
            if (formFieldsAreFilled(form)){

            }

        } else if (buttonValue === 'cancel') {
        // console.log('Button with value "value2" was clicked!');

        }
    }
})

function formFieldsAreFilled(form) {
  for (let i = 0; i < form.elements.length; i++) {
    let element = form.elements[i];
    if (element.value && element.value.trim() === "") {
      return false; // Found an empty element
    }
  }
  return true; // All elements are not empty
}
