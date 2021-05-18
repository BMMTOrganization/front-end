const express = require('express');

const app = express();

app.use(express.static(__dirname + '/dist/BMMT-copy'));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/BMMT-copy/index.html'));
});

app.listen(process.env.PORT || 8080);

console.log(`Running on port ${process.env.PORT || 8080}`)
