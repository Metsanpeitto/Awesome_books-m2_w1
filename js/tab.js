function Tabs() {
  const clear = function clear() {
    const menuElements = document.querySelectorAll('[data-tab]');
    for (let i = 0; i < menuElements.length; i += 1) {
      menuElements[i].classList.remove('active-tab');
      const id = menuElements[i].getAttribute('data-tab');
      document.getElementById(id).classList.remove('active-tab');
    }
  };

  const change = function change(e) {
    clear();
    e.target.classList.add('active-tab');
    const id = e.currentTarget.getAttribute('data-tab');
    document.getElementById(id).classList.add('active-tab');
  };

  const bindAll = function bind() {
    const menuElements = document.querySelectorAll('[data-tab]');
    for (let i = 0; i < menuElements.length; i += 1) {
      menuElements[i].addEventListener('click', change, false);
    }
  };

  bindAll();
}

Tabs();
