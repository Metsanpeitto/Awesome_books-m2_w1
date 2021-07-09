'use strict';

function Tabs() {
  var bindAll = function() {
    var menuElements = document.querySelectorAll('[data-tab]');
    for(var i = 0; i < menuElements.length ; i++) {
      menuElements[i].addEventListener('click', change, false);
    }
  }

  var clear = function() {
    var menuElements = document.querySelectorAll('[data-tab]');
    console.log(menuElements);
    for(var i = 0; i < menuElements.length ; i++) {
      menuElements[i].classList.remove('active-tab');
      var id = menuElements[i].getAttribute('data-tab');
      console.log( document.getElementById(id));
      document.getElementById(id).classList.remove('active-tab');
    }
  }

  var change = function(e) {
    clear();
    e.target.classList.add('active-tab');
    var id = e.currentTarget.getAttribute('data-tab');
    document.getElementById(id).classList.add('active-tab');
  }

  bindAll();
}

var connectTabs = new Tabs();
