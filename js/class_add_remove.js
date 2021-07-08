/**       Bookcollection is the main class in this application       */
class BookCollection {
  constructor() {
    this.books = null;
  }

  /**       Display books is used to show the book collection      */
  displayBooks() {
    const section = document.getElementById('collection');
    const list = document.createElement('ul');
    if (this.books) {
      list.id = 'list';
      this.books.forEach((book, index) => {
        let oddOrEven = 'li-odd';
        if (index % 2 === 0) {
          oddOrEven = 'li-even';
        }
        let { title } = book;
        title = title.replace(/\s/g, '_');
        const liId = `li${title}`;
        const bookCard = `<li id=${liId} class=${oddOrEven}>
           <div class="text">
            <h6>"${book.title}"</h6>
            <h6>by</h6>
            <h6>${book.author}</h6>
           </div>
          
            <button id=${title} onclick="bookCollection.removebook(${title})" class="remove">Remove</button>
          </li>`;
        list.insertAdjacentHTML('beforeend', bookCard);
      });
      section.innerHTML = '';
      section.appendChild(list);
    }
  }

  /**       UpdateLocalStorage saves and retrieves from local storage       */
  updateLocalStorage(remove) {
    if (remove !== true) {
      if (this.books === null) {
        this.books = JSON.parse(window.localStorage.getItem('books'));
      }
    }

    window.localStorage.setItem('books', JSON.stringify(this.books));
    this.displayBooks();
  }

  /**       Addbook adds books to the book collection       */
  addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    let found = null;
    if (!this.books) {
      this.books = [];
    }
    if (this.books && title !== '') {
      this.books.forEach((book) => {
        if (book.title === title) {
          found = true;
        }
      });
      if (!found && title !== '') {
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

  removebook(data) {
    const title = data.id.replace(/_/g, ' ');
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
/**       Initialize the class before calling its methods       */
const bookCollection = new BookCollection();

// This first function ensures that the document has being already created
document.addEventListener('DOMContentLoaded', () => {
  const btnAdd = document.getElementById('add-btn');
  btnAdd.addEventListener(
    'click',
    () => {
      bookCollection.addBook();
    },
    false,
  );
  const removeBtn = document.getElementsByClassName('remove-btn');
  if (removeBtn.length !== 0) {
    removeBtn.forEach((button) => {
      button.addEventListener('click', bookCollection.removebook, false);
    });
  }
});
/**       This method is called when the application runs for first time       */
bookCollection.updateLocalStorage(false);
