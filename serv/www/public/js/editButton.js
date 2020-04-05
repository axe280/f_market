import EditComponent from './editField.js';

export default class EditButton {
  constructor(item) {
    this.listItem = item;

    this.elem = document.createElement('button');
    this.elem.className = 'edit-item';
    this.elem.setAttribute('type', 'button');

    this.elem.addEventListener('click', this.edit.bind(this));
  }

  edit(event) {
    event.stopPropagation();

    addBodyClass();

    if (EditButton.isComponent) {
      return;
    }

    let editComponent = new EditComponent(this.listItem);

    this.listItem.prepend(editComponent.component);
    editComponent.field.focus();

    EditButton.isComponent = true;
  }
}

EditButton.isComponent = false;