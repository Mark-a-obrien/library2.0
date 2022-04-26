
let libary = [];

// Book constructor 
function Book(title, author, numPages, read) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
    this.id = Math.floor(Math.random() * 1000)
}

// setter for read
Book.prototype.setRead = function(read) {
    this.read = read;
}

// creates a card and displays it on the webpage
Book.prototype.createCard = function () {
    const card = document.createElement("div");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const numPages = document.createElement("p");
    const id = document.createElement("p");
    const read = document.createElement("Button");
    const remove = document.createElement("Button");

    // Adds classes the the elements created 
    card.classList.add(`card`);
    
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
        this.remove(card);
    });


    // sets data-index to the books index in the libary array
    card.dataset.index = libary.indexOf(this.id);

    card.append(title, author, numPages, id, read, remove);

    return card;
}







// removes the card from the website and the book libary array
Book.prototype.remove = function (card) {
    card.parentNode.removeChild(card);

    libary.splice(libary.indexOf(this), libary.indexOf(this) + 1);
    console.log(libary);

}



// add a book to the libary array
function addBookToLibary(book) {
    libary.push(book);
}


const newBook = new Book("Something", "Max Johnson", 300, false);
const pamsBook = new Book("This thing", "Pam O\'Shea", 435, false);
const philsBook = new Book("Making of the Moon", "Phil Barret", 700, true);

addBookToLibary(newBook);
addBookToLibary(pamsBook);
addBookToLibary(philsBook);

console.log(libary.indexOf(philsBook));



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

addBookBtn.addEventListener("click", () => {
    form.showModal();
});

close.addEventListener("click", () => {
    form.close();
});

// closes the modal if background is clicked
window.addEventListener("click",(event) => {

    if (event.target.classList.value == "modal-form")
        form.close();
});









const example = document.querySelector(".card");
example.parentNode.removeChild(example);



console.log(libary)

displayLibary();