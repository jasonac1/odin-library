const myLibrary = [];

const dom = {
    bookContainer: document.getElementsByClassName("book-container")[0],
    newBookFormDialog: document.querySelector("#new-book-form-dialog"),
    newBookForm: document.querySelector("#new-book-form"),
    viewBookDialog: document.querySelector("#view-book-dialog"),
    deleteBookDialog: document.querySelector("#delete-book-dialog"),
}

function Book(title, author, publisher, year, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.year = year;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;    
}

function addBookToLibrary(book) {
    let newBook = new Book(book.title, book.author, book.publisher, book.year, book.read);
    myLibrary.push(newBook);
}

function displayLibrary() {
    for(let book of myLibrary) {
        const bookElement = document.createElement("div");
        bookElement.classList.add("book");

        const bookTitleElement = document.createElement("h2");
        bookTitleElement.innerText = book.title;

        const bookActionsElement = document.createElement("div");
        bookActionsElement.classList.add("actions");

        const svgCode = `
        <svg class="check ${book.read ? "read" : ""}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check-bold</title><path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" /></svg>
        <svg class="view" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24""><title>eye</title><path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" /></svg>
        <svg class="delete" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>
        `;
        bookActionsElement.innerHTML = svgCode;

        const bookAuthorElement = document.createElement("p");
        bookAuthorElement.innerText = book.author;

        bookElement.appendChild(bookTitleElement);
        bookElement.appendChild(bookActionsElement);
        bookElement.appendChild(bookAuthorElement);

        bookElement.dataset.id = book.id;

        dom.bookContainer.appendChild(bookElement);
    }
}

function clearDisplayLibrary() {
    while(dom.bookContainer.firstChild) {
        dom.bookContainer.removeChild(dom.bookContainer.lastChild);
    }
}

function updateDisplayLibrary() {
    clearDisplayLibrary();
    displayLibrary();
}

dom.newBookForm.addEventListener("click", (e) => {
    if(e.target.value === "cancel") {
        dom.newBookFormDialog.close();
    }
});

dom.newBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formElement = e.target;
    const formData = new FormData(formElement);
    const bookData = {};

    for(let entry of formData.entries()) {
        bookData[entry[0]] =
        entry[0] !== "read"
        ? entry[1]
        : entry[1] === "read";
    }

    addBookToLibrary(bookData);
    updateDisplayLibrary();
    
    formElement.reset();
    dom.newBookFormDialog.close();
});

dom.bookContainer.addEventListener("click", function handleBookActions(e) {
    const clickedSVG = e.target.closest("svg");
    const clickedBook = e.target.closest(".book");
    let clickedBookObj = {};

    for(const book of myLibrary) {
        if(clickedBook.dataset.id === book.id) {
            clickedBookObj = book;
            break;
        }
    }

    if(clickedSVG === null) return;

    if(clickedSVG.matches(".view")) {
        dom.viewBookDialog.showModal();
        for(const key of Object.keys(clickedBookObj)) {
            let bookDetailField = document.querySelector(`.book-detail-${key}`);
            if(key === "read") {
                bookDetailField.textContent = `${clickedBookObj[key] ? "R" : "Unr"}ead`;
            } else {
                bookDetailField.textContent = `${clickedBookObj[key]}`;
            }
        }
    } else if(clickedSVG.matches(".delete")) {
        dom.deleteBookDialog.dataset.id = clickedBook.dataset.id;     
        dom.deleteBookDialog.showModal();
    } else if(clickedSVG.matches(".check")) {
        clickedSVG.classList.toggle("read");
        clickedBookObj.toggleRead();
    }
});

dom.viewBookDialog.addEventListener("click", (e) => {
    if(e.target.matches(".close")) {
        dom.viewBookDialog.close();
    }
});

dom.deleteBookDialog.addEventListener("click", (e) => {
    if(e.target.matches(".cancel")) {
        dom.deleteBookDialog.close();
    }

    else if(e.target.matches(".delete")) {
        for(let i = 0; i < myLibrary.length; i++) {
            if(dom.deleteBookDialog.dataset.id === myLibrary[i].id) {
                myLibrary.splice(i, 1);
                break;
            }
        }

        updateDisplayLibrary();
    }
    dom.deleteBookDialog.close();
});

displayLibrary();