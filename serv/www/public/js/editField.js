import EditButton from './editButton.js';

export default class EditComponent {
  constructor(listItem) {
    this.listItem = listItem;
    this.listItemButtons = this.listItem.querySelectorAll('button');

    this.component = document.createElement('div');
    this.component.className = 'edit-field-wrapper';

    this.field = document.createElement('input');
    this.field.setAttribute('type', 'text');
    this.field.value = this.listItem.textContent;

    this.okButton = document.createElement('button');
    this.okButton.setAttribute('type', 'button');
    this.okButton.className = 'color_base';
    this.okButton.textContent = 'Ok';

    this.component.prepend(this.field);
    this.component.prepend(this.okButton);

    this.okButton.addEventListener('click', this.editOkButton.bind(this));
    this.field.addEventListener('keydown', this.keydownEnter.bind(this));
  }

  keydownEnter(event) {
    if (event.code !== 'Enter') {
      return;
    }

    removeBodyClass();
    this.updateItem();
  }

  editOkButton(event) {
    event.stopPropagation();

    removeBodyClass();
    this.updateItem();
  }

  updateItem() {
    this.component.remove();

    this.listItem.textContent = this.field.value;
    this.listItemButtons.forEach(button => {
      this.listItem.prepend(button);
    });

    EditButton.isComponent = false;
  }
}