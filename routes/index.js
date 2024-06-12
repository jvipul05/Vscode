var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readdir('./uploads', {withFileTypes : true},function(err, files) {
    if (err) {
      console.log(err);
    }
     else {
      res.render('index', { files: files });
      
    }
  });
  
});


router.get('/filecreate', function(req,res) {
  var fname = req.query.filename;
  fs.writeFile(`./uploads/${req.query.filename}`, "", function (err) {
    if (err) res.send("Error in creating file");
    else
    res.redirect("back");
  });
});


router.get('/foldercreate', function(req,res) {
  
  fs.mkdir(`./uploads/${req.query.foldername}`, function (err) {
   
    if (err) res.send("Error in creating folder");
    else
    res.redirect("back");
  });
});

router.get('/file/:filename',(req,res)=>
{
  fs.readdir('./uploads', {withFileTypes : true},function(err, files) {
    if (err) {
      console.log(err);
    }
     else {
      fs.readFile(`./uploads/${req.params.filename}`, 'utf8', function(err, data) {

      res.render('showfile', { files: files , filename : req.params.filename, filedata : data});
      
    });
  }
  });
});

router.post('/savefile/:filename',(req,res)=>
{
  fs.writeFile(`./uploads/${req.params.filename}`, req.body.filedata, function (err) {
    if (err) res.send("Error in saving file");
    else
    res.redirect("back");
  });
});
module.exports = router;
