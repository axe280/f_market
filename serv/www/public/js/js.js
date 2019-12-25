import Field from './field.js';
import Item from './item.js';
import Notice from './notice.js';
import RemoveButton from './removeButton.js';


const app = () => {

  const buttonSend = document.querySelector('.send-button');
  const listParent = document.querySelector('.prod-list');
  const removeLink = document.querySelector('.remove-link');

  // [ {}, {} ...]
  let jsonDataList = [];


  // get json from server
  fetch('http://localhost:3000/db/list.json')
    .then(response => response.json())
    .then(data => {
      jsonDataList = data;
      render();
    })
    .catch(error => {
      document.querySelector('.prod-list').after('Error text');
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


    // scroll for ios safari
    document.addEventListener('scroll', event => {
      field.elem.blur();
    });


    // save list on server
    buttonSend.addEventListener('click', function(event) {
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
      fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(jsonDataList)
      })
      .then(response => {
        if (response.status === 200) {
          const notice = new Notice('success');
          setTimeout(() => {
            notice.remove();
          }, 3000);
        }
      })
      .catch(error => {
        document.querySelector('.prod-list').after('Error text');
      });

    });


    // remove items
    removeLink.addEventListener('click', removeClick);

    function removeClick(event) {
      field.listElems.forEach(item => {
        const removeButton = new RemoveButton();
        item.prepend(removeButton.elem);
      });
    }

  }

}


app();