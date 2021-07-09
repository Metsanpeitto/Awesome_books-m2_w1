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
        const { title } = book;
        const { id } = book;

        const liId = `li${title}`;
        const bookCard = `<li id=${liId} class=${oddOrEven}>
           <div class="text">
            <h6>"${book.title}"</h6>
            <h6>by</h6>
            <h6>${book.author}</h6>
           </div>
          
            <button id=${id} onclick="bookCollection.removebook(${id})" class="remove">Remove</button>
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
    const date = new Date();
    const id = date.getMilliseconds();

    let found = null;
    if (!this.books) {
      this.books = [];
    }
    if (this.books && title !== '') {
      this.books.forEach((book) => {
        if (book.title === title) {
          found = true;
          document.getElementById('addBookStatus').innerHTML = 'Book Already Exist';
        }
      });
      if (!found && title !== '') {
        const book = { title, author, id };
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
        document.getElementById('addBookStatus').innerHTML = 'Book Added';
        document.getElementById('title').value = null;
        document.getElementById('author').value = null;
        setTimeout(() => {
          document.getElementById('addBookStatus').innerHTML = '';
        }, 3000);
      }
    }
    this.displayBooks();
  }

  removebook(data) {
    let id;
    if (!data.id) {
      id = data;
    } else {
      id = data.id;
    }
    const temp = [];
    this.books.forEach((book) => {
      if (book.id !== id) {
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

  const navBtn = document.getElementsByClassName('nav-btn');
  Array.prototype.forEach.call(navBtn, (btn) => {
    btn.addEventListener('click', bookCollection.displaysection, false);
  });

  const removeBtn = document.getElementsByClassName('remove-btn');
  if (removeBtn.length !== 0) {
    removeBtn.forEach((button) => {
      button.addEventListener('click', bookCollection.removebook, false);
    });
  }
});

/**       This method is called when the application runs for first time       */
bookCollection.updateLocalStorage(false);

/**       Asigning Date       */

function assignDate() {
  const { DateTime } = window.luxon;
  const date = DateTime.now();
  const Date = `${date.year}-${date.month}-${date.day}`;
  document.getElementById('date').innerHTML = Date;
}

assignDate();
