const fs = require('fs');
const path = require('path');
const express = require('express');
const printer = require('printer');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const labelPrinterName = 'DYMO_LabelWriter_450_Turbo';

const PORT = 8000;

const app = express();

app.use(bodyParser.json({
  limit: '16mb'
}));

app.use(bodyParser.urlencoded({
  extended: false,
  limit: '16mb'
}));

app.use(express.static('public'));
app.listen(PORT, () => console.log(`http://10x-shop.local:${PORT}`));

function print(imagePath) {
  return new Promise((fulfill, reject) => {
    printer.printFile({
      filename: imagePath,
      printer: labelPrinterName,
      success: jobID => fulfill(jobID),
      error: err => reject(err),
    });
  });
}

function dataUrlToFile(dataUrl, directoryPath) {
  const regex = /^data:.+\/(.+);base64,(.*)$/;

  const matches = dataUrl.match(regex);
  const ext = matches[1];
  const data = matches[2];
  const buffer = new Buffer(data, 'base64');

  const filePath = path.join(directoryPath, 'data.' + ext);
  fs.writeFileSync(filePath, buffer);

  return filePath;
}

app.post('/print', (req, res) => {
  const dataUrl = req.body.img;
  const filePath = dataUrlToFile(dataUrl, 'uploads');
  print(filePath);

  res.send('ok');
});

app.post('/suggest', (req, res) => {
  const { suggestion } = JSON.parse(req.body.data);
  console.log(req.body);

  fs.appendFile('suggestions.txt', `${(new Date()).toString()}:\n${suggestion}\n\n`, (err) => {
    if (err) throw err;
    console.log('Saved a new suggestion!');
  });

  res.send('ok');
});

app.get('/changelog', (req, res) => {
  exec('git log', (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      return;
    }

    res.send(stdout);
  });
});
