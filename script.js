const myLibrary = [];

const dom = {
    bookContainer: document.getElementsByClassName("book-container")[0]
}

function Book(title, author, publisher, date) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.date = date;
}

function addBookToLibrary(title, author, publisher, date) {
    let newBook = new Book(title, author, publisher, date);
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
        <svg class="check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check-bold</title><path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" /></svg>
        <svg class="view" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>eye</title><path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" /></svg>
        <svg class="delete" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>
        `;
        bookActionsElement.innerHTML = svgCode;

        const bookAuthorElement = document.createElement("p");
        bookAuthorElement.innerText = book.author;

        bookElement.appendChild(bookTitleElement);
        bookElement.appendChild(bookActionsElement);
        bookElement.appendChild(bookAuthorElement);

        dom.bookContainer.appendChild(bookElement);
    }
}

function clearDisplayLibrary() {
    while(dom.bookContainer.firstChild) {
        dom.bookContainer.removeChild(dom.bookContainer.lastChild);
    }
}

addBookToLibrary("Pride and Prejudice", "Jane Austen", "Self", 1813);
addBookToLibrary("Moby Dick", "Herman Melville", "Self", 1851);
addBookToLibrary("War and Peace", "Leo Tolstoy", "Self", 1867);

displayBooks();
// clearBooks();