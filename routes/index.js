var index = 0;
var nomor = 1;
var ctr_benar = 0;
var ctr_salah = 0;

var express = require('express');
var router = express.Router();

var jsonData = require('../public/resources/test.json');

var total_soal = jsonData.Soals.length;

//reset
router.post('/reset', function(req, res, next){
  ctr_benar = ctr_salah = index = 0;
  nomor = 1;
  res.redirect(303, "/");
})

//validate
router.post('/validate', function(req, res, next){
  var result_str = req.body["answer"]
  var result = parseInt(result_str);
  if(jsonData.Soals[index].jawaban === result)
    ctr_benar++;
  else
    ctr_salah++;
  nomor = nomor + 1
  index = index + 1
  if(index >= total_soal)
    index = 0
  res.redirect(303, "/");
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render( 'index',
              { title: 'Prototype Soal',
                benar: ctr_benar,
                salah: ctr_salah,
                nomor: nomor,
                soal: jsonData.Soals[index].tanya,
                answers: jsonData.Soals[index].opsi
              });
});

module.exports = router;
