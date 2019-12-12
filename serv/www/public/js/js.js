const app = () => {
  const buttonSend = document.querySelector('.send-button');
  const listParent = document.querySelector('.prod-list');

  let field;

  let jsonDataList = [];

  // get json from server
  fetch('http://localhost:3000/db/list.json')
    .then(response => response.json())
    .then(data => {
      jsonDataList = data;
      render();
    });

  function render() {
    jsonDataList.forEach(element => {
      let item = new Item(element.title, element.classNames);
      if (item.elem.classList.contains('disabled')) {
        listParent.append(item.elem);  
      } else {
        listParent.prepend(item.elem);
      }
    });


    field = new Field({
      elem: document.querySelector('.js-field'),
      listParent: listParent,
      listElems: listParent.querySelectorAll('.prod-list li')
    });


    document.addEventListener('scroll', event => {
      field.elem.blur();
    });


    buttonSend.addEventListener('click', function(event) {
      let list = [];

      field.listElems.forEach(item => {
        const objItem = {};
        objItem.classNames = item.className;
        objItem.title = item.textContent;

        list.push(objItem);
      });

      jsonDataList = list;

      // send data list
      fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(jsonDataList)
      })
      .then(response => {
        if (response.status === 200) {
          console.log('Ok');
        }
      });
    });
  }

}


app();