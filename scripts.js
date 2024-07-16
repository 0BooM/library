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

addBookToLibrary("Mały Książę", "Antoine de Saint-Exupéry", 300, "Read");
addBookToLibrary("Wiedźmin", "Andrzej Sapkowski", 243, "Unread");
addBookToLibrary("Pan Tadeusz", "Adam Mickiewicz", 345, "Unread");

function displayBook() {
  const main = document.querySelector("main");
  main.innerHTML = '<div class="booksList"></div>';
  let booksCardList = document.querySelector(".booksList");
  for (book in myLibrary) {
    let bookCard = document.createElement("div");
    let title = document.createElement("h2");
    let author = document.createElement("h3");
    let pages = document.createElement("h3");
    let status = document.createElement("h3");

    title.innerText = "Title: " + myLibrary[book].title;
    author.innerText = "Author: " + myLibrary[book].author;
    pages.innerHTML = "Pages: " + myLibrary[book].pagesAmount;
    status.innerHTML = "Status: " + myLibrary[book].readStatus;

    bookCard.classList.add("bookCard");
    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(status);

    booksCardList.appendChild(bookCard);
  }
}

displayBook();

let dialog = document.querySelector(".addBookDialog");

let addBookBtn = document.querySelector(".addBook");
addBookBtn.addEventListener("click", (e) => {
  dialog.showModal();
});

let closeDialogBtn = document.querySelector(".closeDialog");
closeDialogBtn.addEventListener("click", (e) => {
  dialog.close();
});

function formValidation() {
  let title = document.querySelector("#title");
  let titleSpan = document.querySelector(".titleSpan");

  title.addEventListener("input", (e) => {
    if (title.value.length >= 10)
      titleSpan.innerText = "Correct number of characters";
    else {
      titleSpan.innerText = "At least 10 characters";
    }
  });

  let author = document.querySelector("#author");
  let authorSpan = document.querySelector(".authorSpan");
  author.addEventListener("input", (e) => {
    if (author.value.length >= 5)
      authorSpan.innerText = "Correct number of characters";
    else {
      authorSpan.innerText = "At least 5 characters";
    }
  });

  let pages = document.querySelector("#pages");
  let pagesSpan = document.querySelector(".pagesSpan");
  pages.addEventListener("input", (e) => {
    if (+pages.value >= 1) pagesSpan.innerText = "Correct!";
    else {
      pagesSpan.innerText = "Book must contain page!";
    }
  });

  let bookStatus = document.querySelector("#status");
  let statusSpan = document.querySelector(".statusSpan");
  bookStatus.addEventListener("input", (e) => {
    if (
      bookStatus.value.toUpperCase() == "READ" ||
      bookStatus.value.toUpperCase() == "UNREAD"
    )
      statusSpan.innerText = "Correct!";
    else {
      statusSpan.innerText = "Incorrect! Available statuses: Read/Unread";
    }
  });
}
formValidation();

let addBookFormBtn = document.querySelector("#addBookForm");
addBookFormBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let title = document.querySelector("#title");
  let author = document.querySelector("#author");
  let pages = document.querySelector("#pages");
  let status = document.querySelector("#status");
  if (
    title.value.length >= 10 &&
    author.value.length >= 5 &&
    +pages.value >= 1 &&
    (status.value.toUpperCase() == "READ" ||
      status.value.toUpperCase() == "UNREAD")
  ) {
    addBookToLibrary(title.value, author.value, pages.value, status.value);
    displayBook();
    dialog.close();
    title.value = "";
    author.value = "";
    pages.value = "";
    status.value = "";
  }
});
