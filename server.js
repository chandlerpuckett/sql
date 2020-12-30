'use strict';

const express = require('express');
const cors = require('cors');
const pg = require('pg');

require('dotenv').config();

// global vars | package init //
const PORT = process.env.PORT || 3003;

// -- database
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', (error) => console.error(error));

// -- app inits
const app = express();


app.set('view engine', 'ejs');
app.use(express.urlencoded({extended : true}));
app.use(express.static('./public'));
app.use(cors());

// -- routes
app.get('/', renderHome);


function renderHome(req,res){
  res.render('index');
}


client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`working on ${PORT}, very nice`));
  });

