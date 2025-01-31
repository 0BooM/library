const myLibrary = [];

// function Book(title, author, pagesAmount, readStatus) {
//   this.title = title;
//   this.author = author;
//   this.pagesAmount = pagesAmount;
//   this.readStatus = readStatus;
// }

class Book {
  constructor(title, author, pagesAmount, readStatus) {
    this.title = title;
    this.author = author;
    this.pagesAmount = pagesAmount;
    this.readStatus = readStatus;
  }
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

  myLibrary.forEach((book, index) => {
    let bookCard = document.createElement("div");
    let title = document.createElement("h2");
    let author = document.createElement("h3");
    let pages = document.createElement("h3");
    let status = document.createElement("h3");
    let btnDiv = document.createElement("div");
    let removeBtn = document.createElement("button");
    let changeStatusBtn = document.createElement("button");

    title.innerText = "Title: " + book.title;
    author.innerText = "Author: " + book.author;
    pages.innerHTML = "Pages: " + book.pagesAmount;
    status.innerHTML = "Status: " + book.readStatus;

    removeBtn.classList.add("removeBook");
    removeBtn.innerText = "Remove";
    changeStatusBtn.classList.add("changeBookStatus");
    changeStatusBtn.innerText = "Change status";
    btnDiv.classList.add("buttonContainer");
    btnDiv.appendChild(removeBtn);
    btnDiv.appendChild(changeStatusBtn);

    bookCard.classList.add("bookCard");
    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(status);
    bookCard.appendChild(btnDiv);

    removeBtn.addEventListener("click", () => {
      myLibrary.splice(index, 1);
      displayBook();
    });

    changeStatusBtn.addEventListener("click", () => {
      if (book.readStatus.toUpperCase() === "READ") {
        book.readStatus = "Unread";
        status.innerText = "Status: " + book.readStatus;
      } else {
        book.readStatus = "Read";
        status.innerText = "Status: " + book.readStatus;
      }
    });
    booksCardList.appendChild(bookCard);
  });
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
    if (title.value.length >= 10) {
      titleSpan.innerText = "Correct number of characters";
      titleSpan.classList.add("correct");
    } else {
      titleSpan.innerText = "At least 10 characters!";
      titleSpan.classList.remove("correct");
    }
  });

  let author = document.querySelector("#author");
  let authorSpan = document.querySelector(".authorSpan");
  author.addEventListener("input", (e) => {
    if (author.value.length >= 5) {
      authorSpan.innerText = "Correct number of characters";
      authorSpan.classList.add("correct");
    } else {
      authorSpan.innerText = "At least 5 characters!";
      authorSpan.classList.remove("correct");
    }
  });

  let pages = document.querySelector("#pages");
  let pagesSpan = document.querySelector(".pagesSpan");
  pages.addEventListener("input", (e) => {
    if (+pages.value >= 1) {
      pagesSpan.innerText = "Correct!";
      pagesSpan.classList.add("correct");
    } else {
      pagesSpan.innerText = "Book must contain a page!";
      pagesSpan.classList.remove("correct");
    }
  });

  let bookStatus = document.querySelector("#status");
  let statusSpan = document.querySelector(".statusSpan");
  bookStatus.addEventListener("input", (e) => {
    if (
      bookStatus.value.toUpperCase() == "READ" ||
      bookStatus.value.toUpperCase() == "UNREAD"
    ) {
      statusSpan.innerText = "Correct!";
      statusSpan.classList.add("correct");
    } else {
      statusSpan.innerText = "Incorrect! Available statuses: Read/Unread";
      statusSpan.classList.remove("correct");
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
    resetFormFields();
  }
});

function resetFormFields() {
  let title = document.querySelector("#title");
  let author = document.querySelector("#author");
  let pages = document.querySelector("#pages");
  let status = document.querySelector("#status");

  title.value = "";
  author.value = "";
  pages.value = "";
  status.value = "";

  let titleSpan = document.querySelector(".titleSpan");
  let authorSpan = document.querySelector(".authorSpan");
  let pagesSpan = document.querySelector(".pagesSpan");
  let statusSpan = document.querySelector(".statusSpan");

  titleSpan.innerText = "At least 10 characters!";
  authorSpan.innerText = "At least 5 characters!";
  pagesSpan.innerText = "Book must contain a page!";
  statusSpan.innerText = "Incorrect! Available statuses: Read/Unread";

  titleSpan.classList.remove("correct");
  authorSpan.classList.remove("correct");
  pagesSpan.classList.remove("correct");
  statusSpan.classList.remove("correct");
}
