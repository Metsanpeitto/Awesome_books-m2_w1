let books = null;
function displayBooks() {
  const section = document.getElementById('collection');
  const list = document.createElement('ul');
  list.id = 'list';
  if (books) {
    books.forEach((b) => {
      let { title } = b;
      title = title.replace(/\s/g, '_');
      const liId = `li${title}`;
      const bookCard = `<li id=${liId}>
            <h5>${b.title}</h5>
            <h6>${b.author}</h6>
            <button id=${title} onclick="removebook(${title})" class="remove">Remove</button>
          </li>`;
      list.insertAdjacentHTML('beforeend', bookCard);
    });
    section.innerHTML = '';
    section.appendChild(list);
  }
}

function updateLocalStorage(remove) {
  if (remove !== true) {
    if (books === null) {
      books = JSON.parse(window.localStorage.getItem('books'));
    }
  }

  window.localStorage.setItem('books', JSON.stringify(books));
  displayBooks();
}

function addBook() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  let found = null;
  if (!books) {
    books = [];
  }
  if (books) {
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
      updateLocalStorage(false);
    }
  }
}

function removebook(data) {
  const title = data.id.replace(/_/g, ' ');
  const temp = [];
  books.forEach((book) => {
    if (book.title !== title) {
      temp.push(book);
    }
  });
  books = temp;
  updateLocalStorage(true);
}

// This first function ensures that the document has being already created
document.addEventListener('DOMContentLoaded', () => {
  const btnAdd = document.getElementById('add-btn');
  btnAdd.addEventListener('click', addBook, false);
  const removeBtn = document.getElementsByClassName('remove-btn');
  if (removeBtn.length !== 0) {
    removeBtn.forEach((button) => {
      button.addEventListener('click', removebook, false);
    });
  }
});

updateLocalStorage(false);
