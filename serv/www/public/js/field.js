class Field {
  constructor ({elem, listParent, listElems}) {
    this.elem = elem;
    this.listParent = listParent;
    this.listElems = listElems;
    this.titleInList = false;

    this.elem.addEventListener('input', this.inputListener.bind(this));
    this.elem.addEventListener('keydown', this.keydownListener.bind(this));
    this.elem.addEventListener('focus', this.focusListener.bind(this));
  }

  focusListener(event) {
    this.elem.value = '';
    this.update();
  }

  inputListener(event) {
    let str = this.elem.value.toLowerCase();

    if (!str) {
      this.update();

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

  keydownListener(event) {
    if (event.code !== 'Enter') {
      return;
    }

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
    this.createItem(title);
    this.elem.value = '';

    this.update();
  }

  createItem(title, classNames) {
    const item = new Item(title, classNames);
    
    this.listParent.prepend(item.elem);
  }

  update() {
    this.listElems = this.listParent.querySelectorAll('li');
    this.listElems.forEach(item => {
      item.classList.remove('hidden');
      item.innerHTML = item.innerText;
    });
  }
}