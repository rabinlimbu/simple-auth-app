const express = require('express');
const axios = require('axios');
const qs = require('qs');
const NodeCache = require( "node-cache" );

const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const myCache = new NodeCache();

const port = process.env.PORT || 5000;

app.get('/api/user', (req, res) => {
  var token = myCache.get("token");
  if(!token)
    return null;
  axios({
  	method: 'get',
  	url: 'http://localhost:8000/user/',
  	headers: {'Authorization': 'Bearer '+token}
  })
  .then(response => {
    saveToCache("userId", response.data.id, myCache.get("expireDuration"));
    console.log("After cache save[userId]:", myCache.get("userId"));
    return res.send(response.data);
  })
  .catch(error => {
    console.log(error);
  });
});

app.put('/api/user', (req, res) => {
  var token = myCache.get("token");
  console.log("printing req.body:"+ req.body);
  if(!token)
    return null;
  axios({
    method: 'put',
    url: 'http://localhost:8000/user/',
    data: req.body,
    headers: {'Authorization': 'Bearer '+token, 'Content-Type': 'application/json'}
  })
  .then(response => {
    return res.send(response.data);
  })
  .catch(error => {
    console.log(error);
  });
});

app.get('/api/address', (req, res) => {
  var token = myCache.get("token");
  if(!token)
    return null;
  axios({
    method: 'get',
    url: 'http://localhost:8000/address/',
    headers: {'Authorization': 'Bearer '+token}
  })
  .then(response => {
    return res.send(response.data);
  })
  .catch(error => {
    console.log(error);
  });
});

app.put('/api/address/:addressId', (req, res) => {
  var token = myCache.get("token");
  console.log("printing req.body:"+ req.body);
  if(!token)
    return null;
  axios({
    method: 'put',
    url: 'http://localhost:8000/address/' + req.params.addressId + '/',
    data: req.body,
    headers: {'Authorization': 'Bearer '+token, 'Content-Type': 'application/json'}
  })
  .then(response => {
    return res.send(response.data);
  })
  .catch(error => {
    console.log(error);
  });
});

app.post('/api/address', (req, res) => {
  var token = myCache.get("token");
  if(!token)
    return null;
  req.body.user = myCache.get("userId");
  axios({
    method: 'post',
    url: 'http://localhost:8000/address/',
    data: req.body,
    headers: {'Authorization': 'Bearer '+token, 'Content-Type': 'application/json'}
  })
  .then(response => {
    return res.send(response.data);
  })
  .catch(error => {
    console.log(error);
  });
});

//curl -X POST -d "grant_type=password&username=<user_name>&password=<password>" 
//-u"<client_id>:<client_secret>" http://localhost:8000/o/token/
app.post('/api/signin', (req, res) => {
  console.log("username: "+req.body.username+",password:"+req.body.password);
  const data = {
      'client_id': 'BLGpnFnyMEso1Di0ZtTJkTnAFrASXrPIh5aNKtNv',
      'client_secret':'Q0bFfkMjlfKuGEaQkwk4oeisvrN2ldKcM9EjJ7z4huy2pYcA8XLZcSMboxQKvuXuTPP9dHkOcb1k8uiZj22lvXZ4GF3ZfyZctJqy8dir3pGS9fWILNHv2KoNpI8z3uyG',
      'grant_type':'password',
      'username': req.body.username,
      'password': req.body.password
    };
  axios({
    method: 'post',
    url: 'http://localhost:8000/o/token/',
    data: qs.stringify(data),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })
  .then(response => {
    console.log("Before cache save:", response.data.access_token + "-" +response.data.expires_in);
    var saved = saveToCache("token", response.data.access_token, response.data.expires_in);
    saveToCache("expireDuration", response.data.expires_in, response.data.expires_in);
    console.log("Is cache saved", saved);
    console.log("After cache save:", myCache.get("token"));
    console.log("After cache save [expireDuration]:", myCache.get("expireDuration"));
    return res.send(saved);
  })
  .catch(error => {
    console.log(error);
  });  
});

app.get('/api/issignedin', (req, res) => {
  if(myCache.get("token"))
    return res.send(true);
  return res.send(false);
});

app.get('/api/signout', (req, res) => {
  myCache.del("token");
  return res.send(true);
});

//ttl is in seconds
var saveToCache = function(key, value, ttl){
  var saved = false;
  myCache.set( key, value , ttl, function( err, success ){
  if( !err && success ){
    saved = true;
  }
  });
  return saved;
}

app.listen(port, () => console.log(`Listening on port ${port}`));