const myLibrary = [];

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

addBookToLibrary("Pride and Prejudice", "Jane Austen", "Self", 1813);
addBookToLibrary("Moby Dick", "Herman Melville", "Self", 1851);
addBookToLibrary("War and Peace", "Leo Tolstoy", "Self", 1867);

for(let book of myLibrary) {
    console.log(book.title + " - " + book.author);
}