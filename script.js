"use strict";

const myLibrary = [];

document.addEventListener('DOMContentLoaded', function () {
    // load cards at page load if any existing data
    displayCards(); 
});

// Constructor function for books
function Book(title,author,id,read,pages) {
    this.title = title;
    this.author = author;
    this.id = id;
    this.read = read;
    this.pages = pages.toString();
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
// addBookToLibrary('Hamlet','William Shakespeare',createID(),true,'250');
// addBookToLibrary('On The Road','Jack Kerouac',createID(),false,'180');


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
    
    const readLabel = document.createElement('label');
    readLabel.htmlFor = 'read-checkbox';
    readLabel.textContent = 'Read: ';
    card.appendChild(readLabel); 

    const read = document.createElement('input')
    read.type = 'checkbox';
    read.checked = data.read;
    // read.id = 'read-checkbox';
    read.classList.add('read-checkbox');
    card.appendChild(read);

    const pages = document.createElement('p');
    pages.textContent = 'Pages: ' + data.pages;
    card.appendChild(pages);
    
    // associate card with id for deletion
    card.setAttribute('data-id',data.id); 

    // delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    card.appendChild(deleteBtn);

    return card;
   }

function displayCards() {
    cardContainer.innerHTML="";
    myLibrary.forEach(element => {
     const card = createCard(element);
     cardContainer.appendChild(card);
   });
}

// Add Book functionality
const addBookModal = document.getElementById('add-book-dialog');
const addBookBtn = document.getElementById('add-book-btn');
const addBookForm = document.getElementById('add-book-form');

addBookBtn.addEventListener('click', ()=> {
    addBookModal.showModal();
}
)

addBookModal.addEventListener('click',function(event){
    if (event.target.tagName === 'BUTTON') {
        const buttonValue = event.target.value;

        if (buttonValue === 'submit') {
        // console.log('Button with value "value1" was clicked!');
            const form = addBookModal.querySelector('form');
            if (formFieldsAreFilled(form)){
                
                event.preventDefault(); 
                
                // title,author,id,read,pages
                // const form = addBookModal.querySelector('form');
                const title = document.getElementById('title').value;
                const author = document.getElementById('author').value;
                const id = createID();
                const read = document.getElementById('read').checked;
                const pages = document.getElementById('pages').value;
                addBookToLibrary(title,author,id,read,pages);
                const data = {title,author,id,read,pages};
                displayCards();
                addBookModal.close();
                addBookForm.reset();
            }

        } else if (buttonValue === 'cancel') {
        // console.log('Button with value "value2" was clicked!');
            addBookModal.close();
            addBookForm.reset();
        }
    }
})

// Delete book from libray
cardContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const card = event.target.closest('.card');
        const id = card.getAttribute('data-id');
        deleteBook(id);
        displayCards(); // Re-render cards after deletion
    }

    if (event.target.classList.contains('read-checkbox')) {
        const card = event.target.closest('.card');
        const id = card.getAttribute('data-id');
        const book = myLibrary.find(b => b.id === id);
        if (book) {
            book.updateReadStatus();
            console.log(`Book "${book.title}" read status is now: ${book.read}`);
        }
    }
});


// Helper functions
function formFieldsAreFilled(form) {
  for (let i = 0; i < form.elements.length; i++) {
    let element = form.elements[i];
    if (element.value.trim() === "") {
      return false; // Found an empty element
    }
  }
  return true; // All elements are not empty
}

function deleteBook(id){
    // find element in myLibrary based on id and delete
    myLibrary.splice(myLibrary.findIndex(item => item.id === id), 1)
}

Book.prototype.updateReadStatus = function() {
    this.read = !this.read;
}