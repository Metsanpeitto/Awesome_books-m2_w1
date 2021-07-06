class BookCollection {
  constructor() {
    this.books = null;
  }

  displayBooks() {
    const section = document.getElementById("collection");
    const list = document.createElement("ul");
    list.id = "list";
    if (this.books) {
      this.books.forEach((book) => {
        let { title } = book;
        title = title.replace(/\s/g, "_");
        const liId = `li${title}`;
        const bookCard = `<li id=${liId}>
            <h5>${book.title}</h5>
            <h6>${book.author}</h6>
            <button id=${title} onclick="bookCollection.removeBook(${title})" class="remove">Remove</button>
          </li>`;
        list.insertAdjacentHTML("beforeend", bookCard);
      });
      section.innerHTML = "";
      section.appendChild(list);
    }
  }

  updateLocalStorage(remove) {
    if (remove !== true) {
      if (this.books === null) {
        this.books = JSON.parse(window.localStorage.getItem("books"));
      }
    }

    window.localStorage.setItem("books", JSON.stringify(this.books));
    this.displayBooks();
  }

  addBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    let found = null;
    if(title!=""){
    if (!this.books) {
      this.books = [];
    }
      this.books.forEach((book) => {
        if (book.title === title) {
          found = true;
        }
      });
      if (!found) {
        const book = { title, author };
        this.books.push(book);
        this.books.sort((bookA, bookB) => {
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
        this.updateLocalStorage(false);
      }
  }
}

  removeBook(data) {
    const title = data.id.replace(/_/g, " ");
    const temp = [];
    this.books.forEach((book) => {
      if (book.title !== title) {
        temp.push(book);
      }
    });
    this.books = temp;
    this.updateLocalStorage(true);
  }
}

const bookCollection = new BookCollection();

// This first function ensures that the document has being already created
document.addEventListener("DOMContentLoaded", () => {
  const btnAdd = document.getElementById("add-btn");
  btnAdd.addEventListener(
    "click",
    function () {
      bookCollection.addBook();
    },
    false
  );
  const removeBtn = document.getElementsByClassName("remove-btn");
  if (removeBtn.length !== 0) {
    removeBtn.forEach((button) => {
      button.addEventListener("click", bookCollection.removeBook, false);
    });
  }
});
bookCollection.updateLocalStorage(false);
