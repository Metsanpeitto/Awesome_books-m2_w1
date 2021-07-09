function Tabs() {
  const bindAll = function () {
    const menuElements = document.querySelectorAll("[data-tab]");
    for (let i = 0; i < menuElements.length; i++) {
      menuElements[i].addEventListener("click", change, false);
    }
  };

  const clear = function () {
    const menuElements = document.querySelectorAll("[data-tab]");
    console.log(menuElements);
    for (let i = 0; i < menuElements.length; i++) {
      menuElements[i].classList.remove("active-tab");
      const id = menuElements[i].getAttribute("data-tab");
      console.log(document.getElementById(id));
      document.getElementById(id).classList.remove("active-tab");
    }
  };

  var change = function (e) {
    clear();
    e.target.classList.add("active-tab");
    const id = e.currentTarget.getAttribute("data-tab");
    document.getElementById(id).classList.add("active-tab");
  };

  bindAll();
}

const connectTabs = new Tabs();
