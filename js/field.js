class Field {
  constructor (elem) {
    this.elem = elem;
    this.list = new List(document.querySelector('.prod-list'));
    this.titleInList = false;

    this.elem.addEventListener('input', this.inputListener.bind(this));
    this.elem.addEventListener('keydown', this.keydownListener.bind(this));
  }

  inputListener(event) {
    let str = this.elem.value.toLowerCase();

    if (!str) {
      this.update();

      return;
    }

    this.list.elem.querySelectorAll('li').forEach(item => {
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
    this.titleInList = Array.from(this.list.elem.querySelectorAll('li')).find(item => {
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

  createItem(title) {
    const item = new Item(title);
    
    this.list.elem.prepend(item.elem);
  }

  update() {
    this.list.elem.querySelectorAll('li').forEach(item => {
      item.classList.remove('hidden');
      item.innerHTML = item.innerText;
    });
  }
}