const myLibrary = [];

function Book(title, author, pagesAmount, readStatus) {
  this.title = title;
  this.author = author;
  this.pagesAmount = pagesAmount;
  this.readStatus = readStatus;
}

function addBookToLibrary(title, author, pagesAmount, readStatus) {
  let book = new Book(title, author, pagesAmount, readStatus);
  myLibrary.push(book);
}

addBookToLibrary("Mały książe", "Jan Taduesz", 300, "read");
addBookToLibrary("Wiedzmin", "Piotr Piastowski", 243, "unread");
console.log(myLibrary[1]);
