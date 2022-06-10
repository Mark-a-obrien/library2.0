
let libary = [];

// Book constructor 
function Book(title, author, numPages, read) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
    this.id = Math.floor(Math.random() * 1000)
    this.card = "";
}

// setter for read
Book.prototype.setRead = function(read) {
    this.read = read;
}

// getter for card
Book.prototype.getCard = function() {
    return this.card;
} 

// creates a card and displays it on the webpage
Book.prototype.createCard = function () {
    this.card = document.createElement("div");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const numPages = document.createElement("p");
    const id = document.createElement("p");
    const read = document.createElement("Button");
    const remove = document.createElement("Button");

    // Adds classes the the elements created 
    this.card.classList.add("card");
    
    // changes and adds a class to the read button depedning on input
    if (this.read === false) {
        read.classList.add("not-read"); 
        read.textContent = "Not Read";
    }
    else {
        read.classList.add("read");
        read.textContent = "Read";
    }
    
    remove.classList.add("not-read");

    title.textContent = this.title;
    author.textContent = this.author;
    numPages.textContent = this.numPages;
    id.textContent = this.id;
    remove.textContent = "Remove";


    // toggles the read variable 
    read.addEventListener("click", () => {

        if (this.read === false) {
            read.textContent = "Read";
            read.classList.remove("not-read");
            read.classList.add("read");
            this.read = true;
        }
        else {
            read.textContent = "Not Read";
            read.classList.remove("read");
            read.classList.add("not-read");
            this.read = false;
        }
    });

    remove.addEventListener("click", () => {
        this.removeDisplay(this.card);
        this.removeFromLibary();
    });


    // sets data-index to the books index in the libary array
    this.card.dataset.index = libary.indexOf(this.id);

    this.card.append(title, author, numPages, id, read, remove);

    return this.card;
}







// removes the card from the website
Book.prototype.removeDisplay = function (card) {

    try {
        card.parentNode.removeChild(card);
    } catch (error) {
        
    }
    
    

}

//removes the book from libary array
Book.prototype.removeFromLibary = function () {
    let fixPosition = 0; 
    if (libary.indexOf(this) === 0) 
        fixPosition = 1;

    libary.splice(libary.indexOf(this), libary.indexOf(this) + fixPosition);
    console.log(libary.indexOf(this));
    console.log(libary);
}


// adds a book to the libary array
function addBookToLibary(book) {
    libary.push(book);
}


const newBook = new Book("Something", "Max Johnson", 300, false);
const pamsBook = new Book("This thing", "Pam O\'Shea", 435, false);
const philsBook = new Book("Making of the Moon", "Phil Barret", 700, true);

addBookToLibary(newBook);
addBookToLibary(pamsBook);
addBookToLibary(philsBook);





// displays the libary on the webpage
const container = document.querySelector(".container");
function displayLibary() {
    for (let i = 0; i < libary.length; i++) {
        const book = libary[i];
        container.appendChild(book.createCard());
    }
}



// Modal 
// --------
const form = document.querySelector(".modal-form");
const addBookBtn = document.querySelector(".add-book");
const close = document.querySelector(".close");
const cancel = document.querySelector(".cancel");
const submit = document.querySelector(".submit");

addBookBtn.addEventListener("click", () => {
    form.showModal();
});

close.addEventListener("click", () => {
    form.close();
});

cancel.addEventListener("click", () => {
    form.close();
});

// closes the modal if background is clicked
window.addEventListener("click",(event) => {

    if (event.target.classList.value == "modal-form")
        form.close();  
});

// submits the data
submit.addEventListener("click", () => {
    const newBook = getFormData();
    
    if (checkForm(newBook)) {
        addBookToLibary(newBook);
        refreshDisplayLibary();
    }

});

// Checks if the form is filled out
function checkForm(book) {
    if (book.title.length <= 0 || book.author.length <= 0 || (book.numPages.length <= 0 || !Number.isInteger(Number(book.numPages))))
        {
            return false;
        }
    return true;
}


//Gets the data from the form
function getFormData() {
    const title = document.querySelector("#title");
    const author = document.querySelector("#author");
    const numPages = document.querySelector("#numPages");
    const read = document.querySelector("#read");


    const book = new Book(title.value, author.value, numPages.value, read.checked);

    return book
}

function refreshDisplayLibary() {
    for (let i = 0; i < libary.length; i++) {
        const book = libary[i];
        book.removeDisplay(book.getCard());
    }

    displayLibary();

}

// add **********check  if book is already in libary********



const example = document.querySelector(".card");
example.parentNode.removeChild(example);



console.log(libary)


displayLibary();