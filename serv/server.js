const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.static('www/public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/www/index.html');
});

app.get('/db/list.json', (req, res) => {
  let data = fs.readFileSync('db/list.json');
  let dataList = JSON.parse(data);

  res.json(dataList);
});

app.post('/', (req, res) => {
  fs.writeFileSync('db/list.json', JSON.stringify(req.body));
  res.send();
});

app.use((req, res) => {
  res.send(404, "Page Not Found Sorry");
});


app.listen(3000);