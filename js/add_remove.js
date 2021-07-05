/**
 *  Create a collection that keeps a list of books (hint: you can use an array of objects for that). - done
Create a function to add a new book to the collection, with title and author. -done
Create a function to remove a book from the collection (hint: you can use
the array filter() method).
Display all books saved in the collection in the top part of the page.
Make sure that when a user clicks the "Add" button:
A new book is added to the collection.
The new book is displayed in the page.
Make sure that when a user clicks the "Remove" button:
The correct book is removed from the collection.
The correct book dissapears from the page.
Make sure that data is preserved in the browser's memory by using localStorage.*/
/*   Create a collection that keeps a list of books
    (hint: you can use an array of objects for that).*/
    var books = JSON.parse(window.localStorage.getItem('books'));
    if (books === null) {
      //initial values
      books= [{ title: "Lorem Ipsun", author: "Testeroo Testyy" },
         { title: "Second book", author: "Testeroo Testyy" },
     ];
     window.localStorage.setItem('books',JSON.stringify(books));
    }
function displayBooks() {
  const section = document.getElementById("collection");
  const list = document.createElement("ul");
  list.id = "list";
  books.forEach((b) => {
    let { title } = b;
    title = title.replace(/\s/g, "");
    const liId = `li${title}`;
    const bookCard = `<li id=${liId}>
            <h5>${b.title}</h5>
            <h6>${b.author}</h6>
            <button id=${title} onclick="removebook(${title})" class="remove">Remove</button>
          </li>`;
    list.insertAdjacentHTML("beforeend", bookCard);
  });

  section.innerHTML = "";
  section.appendChild(list);
}

function searchForBook(title){
  
}

function addBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  let found = null;
  books.forEach((book) => {
    if (book.title === title) {
      found = true;
    }
  });

  if (!found) {
    const book = { title, author };
    books.push(book);
    books.sort((bookA, bookB) => {
      const titleA = bookA.title.toLowerCase();
      const titleB = bookB.title.toLowerCase();
      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      return 0;
    });
    window.localStorage.setItem('books',JSON.stringify(books));
    displayBooks();
  }
}

function removebook(data) {
  console.log(data.id)
  const idBtn = data.id;

  const liId = `li${idBtn}`;
  const li = document.getElementById(liId);
  const ul = document.getElementsByTagName("ul");
  ul[0].removeChild(li);
}

// This first function ensures that the document has being already created
document.addEventListener("DOMContentLoaded", () => {
  const btnAdd = document.getElementById("add-btn");
  btnAdd.addEventListener("click", addBook, false);
  const removeBtn = document.getElementsByClassName("remove-btn");
  if (removeBtn.length !== 0) {
    removeBtn.forEach((button) => {
      button.addEventListener("click", removeBook, false);
    });
  }
});

displayBooks();
