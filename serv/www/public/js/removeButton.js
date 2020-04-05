export default class RemoveButton {
  constructor(listItem) {
    this.listItem = listItem;

    this.elem = document.createElement('button');
    this.elem.className = 'delete-item';
    this.elem.setAttribute('type', 'button');

    this.elem.addEventListener('click', this.remove.bind(this));
  }

  remove(event) {
    event.stopPropagation();
    this.listItem.remove();
  }
}