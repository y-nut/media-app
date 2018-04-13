
/*jshint esversion: 6 */
/*jslint node: true */

const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors')({ origin: true });
const fetch = require('node-fetch');
const blockedPhrases = new RegExp(/porn|sexy/); // No thank you.
const request = require('request');
const videosJSON = 'https://sela-test.herokuapp.com/assets/hkzxv.json';


const app = express();

var getVideos = function(f_su){
  console.log('getVideos')
  request.get({url: videosJSON, json: true}, (err, res, data) => {
    if (err) {
      console.log('err',err);
      // handle error
    } else if (res.statusCode === 200) {
      // you can use data here - already parsed as json
      let nData = Object.assign({},data);
      console.log('data',nData);

      if (typeof f_su === 'function'){
        f_su(nData);
      }

    } else {
      // response other than 200 OK
      console.log('200');
    }
  });
};

app.get('/videos.json',(req,res) => {

  var f_su = function(data){
    res.send(data);
  };

  getVideos(f_su);
});




/*
app.get('/videos.json',(req,res)=>{

  let url = 'https://sela-test.herokuapp.com/assets/hkzxv.json';

  let send = function(data){
    console.log(data);
    response.send(data);
  };

  request.get({url: videosJSON, json: true}, (err, res, data) => {
    if (err) {
      console.log('err',err);
      // handle error
    } else if (res.statusCode === 200) {
      // you can use data here - already parsed as json
      console.log('data',data);

      send(data)

    } else {
      // response other than 200 OK
      console.log('200');
    }
  });



});
*/
exports.app = functions.https.onRequest(app);
/*
app.get('/timestamp',(request,response) =>{
  response.send( `${Date.now()}` );
});

app.get('/timestamp-cached',(request,response) =>{
  response.set('Cache-Control','public, max-age=300, s-maxage=600')
  response.send( `${Date.now()}` );
});

app.get('/videosLink.json',(request,response) =>{
  //response.set('Cache-Control','public, max-age=300, s-maxage=600')
  //response.send( `${Date.now()}` );
  var link = 'https://sela-test.herokuapp.com/assets/hkzxv.json';
  response.send(link);
});
*/
/*app.get('/videos.json',(req,res) =>{

  console.log('Query:', req.query);
  console.log('Body:', req.body);

  //let url = req.query.url;
  let url = 'https://sela-test.herokuapp.com/assets/hkzxv.json';

  if (!url) {
    url = req.body.url;
  }

  if (!url) {
    res.status(403).send('URL is empty.');
    return;
  }

  console.log('Request:', url);

  // disallow blocked phrases
  if (url.match(blockedPhrases)) {
    res.status(403).send('Phrase in URL is disallowed.');
    return;
  }

  let mi = function(){
    //let init = new RequestInit();

    let init = {
      method: req.method,
      body: req.get('content-type') === 'application/json' ? JSON.stringify(req.body) : req.body,
      headers: {
        'Content-Type': req.get('Content-Type'),
      }
    };

    return fetch(url,init)
    .then(r => r.headers.get('content-type') === 'application/json' ? r.json() : r.text())
    .then(body => res.status(200).send(body));


  };

  mi();

  //let mif = mi();


  //response.send(mif);



});*/





