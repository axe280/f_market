import Field from './field.js';
import Item from './item.js';
import Notice from './notice.js';
import RemoveButton from './removeButton.js';
import EditButton from './editButton.js';


const app = () => {

  const buttonSend = document.querySelector('.send-button');
  const listParent = document.querySelector('.prod-list');
  const removeLink = document.querySelector('.remove-link');

  // [ {}, {} ...]
  let jsonDataList = [];


  // get json from server
  // fetch('http://localhost:3000/db/list.json')
  fetch('http://axedevelop.com.ua/db/list.json')
    .then(response => response.json())
    .then(data => {
      if (Array.isArray(data)) {
        jsonDataList = data;
      }
      render();
    })
    .catch(error => {
      document.querySelector('.prod-list').append('Error download data');
    });


  function render() {
    // create and add list items
    jsonDataList.forEach(element => {
      let item = new Item(element.title, element.classNames);

      if (item.elem.classList.contains('disabled')) {
        listParent.append(item.elem);  
      } else {
        listParent.prepend(item.elem);
      }
    });


    // create field
    const field = new Field();


    // save list on server
    buttonSend.addEventListener('click', function(event) {
      document.body.classList.add('body_sendscreen');
      const notice = new Notice('success');
      
      field.updateList();

      // create json data
      let list = [];

      field.listElems.forEach(item => {
        const objItem = {};
        objItem.classNames = item.className;
        objItem.title = item.textContent;

        list.push(objItem);
      });

      jsonDataList = list;


      // send json data list
      // fetch('http://localhost:3000/', {
      fetch('http://axedevelop.com.ua/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(jsonDataList)
      })
        .then(response => {
          if (response.status === 200) {
            return response.text(); 
          }
        })
        .then(() => {
          setTimeout(() => {
            document.body.classList.remove('body_sendscreen');
          }, 1500);

          setTimeout(() => {
            notice.remove();
          }, 3000);
        })
        .catch(error => {
          console.log(error);
          document.querySelector('.prod-list').after('Error text');
        });

    });


    // remove items
    removeLink.addEventListener('click', editList);

    function editList(event) {
      if (field.listParent.classList.contains('edit-list-active')) {
        return;
      } else {
        field.listParent.classList.add('edit-list-active');
      }

      field.listElems.forEach(item => {
        const removeButton = new RemoveButton(item);
        const editButton = new EditButton(item);

        item.prepend(editButton.elem);
        item.prepend(removeButton.elem);
      });
    }

  }

}


app();