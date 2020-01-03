// This app uses the Multer middleware to allow users to upload files and receive a json file containing its metadata.
// For the purposes of this project, this app requests the original file name, its file type and its size.

var express = require('express');
var cors = require('cors');

// require and use "multer"...
var multer = require('multer');
var upload = multer({dest: 'uploads/'})

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// The app redirects to the front end
app.get('/', function(req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

// This is where it all happens - we use multer to take in a single file, then return a json file with the three fields required.
app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  return res.json({'name': req.file.originalname, type: req.file.mimetype, 'size': req.file.size})
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});