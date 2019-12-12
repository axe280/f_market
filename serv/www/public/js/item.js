class Item {
  constructor(title, classNames = 'prod-item') {
    this.elem = document.createElement('li');

    this.elem.textContent = title;
    this.elem.className = classNames;

    this.elem.addEventListener('click', this.selected.bind(this));
  }

  selected(event) {
    if (this.elem.classList.contains('disabled')) {
      this.elem.classList.remove('disabled');
      this.moveUp();
    } else {
      this.elem.classList.add('disabled');
      this.moveDown();
    }
  }

  moveUp() {
    this.elem.parentElement.prepend(this.elem);
  }

  moveDown() {
    setTimeout(() => {
      this.elem.parentElement.append(this.elem);
    }, 200);
  }
}