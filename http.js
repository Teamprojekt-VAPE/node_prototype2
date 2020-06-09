var fs = require('fs');
var url = require('url');
var path = require('path');
var http = require('http');
var formidable = require('formidable');
var imageDir = '/home/.../node/public/'; // substitute with your path to directory

http.createServer(function (req, res) {


// upload file
if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = imageDir + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        //res.end();
      });
 });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    //return res.end();
  }


// read file
filePath = path.join(__dirname, 'public/dna.fasta');        // example file

fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
    if (!err) {
        console.log('received data: ' + data);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
    } else {
        console.log(err);
    }
});



}).listen(8080); 

