var express = require('express');
const methodOverride = require('method-override');
const { insertData, seleteData, seleteDataOfPerson, removeDataOfPerson, updateData } = require('../controller/personController');
const { render } = require('ejs');

const bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Use method-override middleware
router.use(methodOverride('_method')); // Specify the override parameter (default is '_method')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/insert', (req, res) => {
  res.render('insertdata')
})

router.post('/insert', async(req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const gender = req.body.gender;
  const place = req.body.place;
  // or
  // const { name, age, gender, place } = req.body;

  console.log(`${name}, ${age}, ${gender}, ${place}`);

  try {
    await insertData(name, age, gender, place);
    console.log('inserted is happened check you db!!!');
  } catch(error) {
    console.error(error);
  }

  res.redirect('/displayAll');
});

router.get('/displayAll', async (req, res) => {

  try {
    const result = await seleteData();
    console.log('Data retrieved successfully');
    res.render('displayAll', { data: result.rows })
  } catch(error) {
    console.error(error);
  }

});

router.get('/singleView/:id', async (req, res) => {

  try {
    const id = req.params.id;
    const result = await seleteDataOfPerson(id);
    // console.log(result.rows[0].name);
    console.log(result.rows);

    res.render('singledata', {data: result.rows[0]});
  } catch (error) {
    console.error(error);
  }
});

router.get('/deleteData/:id', async (req, res) => {

  try {
    const id = req.params.id;
    await removeDataOfPerson(id);
    
    res.redirect('/displayAll')
  } catch (error) {
    console.error(error);
  }
});

router.get('/updateData/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await seleteDataOfPerson(id);
    // console.log(result.rows[0].name);
    console.log(result.rows);

    res.render('updatedata', {data: result.rows[0]});
  } catch (error) {
    console.error(error);
  }
});

router.post('/update/:id', async (req, res) => {
  console.log("retive data:");
  const id = req.params.id;
  const { name, age, gender, place } = req.body;
  console.log(id, name, age, gender, place);

  try {
    await updateData(id, name, age, gender, place);
  } catch (error) {
    console.error(error);
  }

  res.redirect('/displayAll')
});


  // try {
  //   const id = req.params.id;
  //   await updatePersonalData($id);
  //   console.log('Updated successfully');
  // } catch (error) {
  //   console.error(error);
  // }



module.exports = router;
