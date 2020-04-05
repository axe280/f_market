import Item from './item.js';

export default class Field {
  constructor() {
    this.elem = document.querySelector('.js-field');
    this.listParent = document.querySelector('.prod-list');
    this.listElems = document.querySelectorAll('.prod-list li');
    this.addButton = document.querySelector('.add-button');

    this.titleInList = false;

    this.elem.addEventListener('input', this.inputListener.bind(this));
    this.elem.addEventListener('keydown', this.keydownListener.bind(this));
    this.elem.addEventListener('focus', this.focusListener.bind(this));

    this.addButton.addEventListener('click', this.clickAddButton.bind(this));
  }

  focusListener(event) {
    this.elem.value = '';
    this.updateList();
  }

  inputListener(event) {
    let str = this.elem.value.toLowerCase();

    if (!str) {
      this.updateList();

      return;
    }

    this.listElems.forEach(item => {
      if (item.innerText.search(str) == -1) {
        item.classList.add('hidden');
      } else {
        item.classList.remove('hidden');
        let itemStr = item.innerText;
        item.innerHTML = insertMark(itemStr, item.innerText.search(str), str.length);
      }
    });
  }

  clickAddButton(event) {
    this.pushToList();
  }

  keydownListener(event) {
    if (event.code !== 'Enter') {
      return;
    }

    this.pushToList();
  }

  pushToList() {
    if (!this.elem.value) {
      return;
    }

    const title = this.elem.value.toLowerCase();

    // check in list
    this.titleInList = Array.from(this.listElems).find(item => {
      return item.textContent === title;
    });

    if (this.titleInList) {
      return;
    }

    // create new item
    const item = new Item(title);
    this.listParent.prepend(item.elem);

    this.elem.value = '';
    this.elem.focus();

    this.updateList();
  }


  updateList() {
    this.listParent.classList.remove('edit-list-active');

    this.listElems = this.listParent.querySelectorAll('li');

    this.listElems.forEach(item => {
      item.classList.remove('hidden');
      item.innerHTML = item.textContent;
    });
  }
}