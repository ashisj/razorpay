// import the required packages

var express = require('express');
var path = require('path');
var app = express();
var Razorpay = require('razorpay');
var bodyParser = require('body-parser');

// configure paypal with the credentials you got when you created your paypal app
var instance = new Razorpay({
  key_id: 'put yours',
  key_secret: 'put yours'
})

instance.payments.fetch(paymentId)
  .then((response)=>{console.log(response);})
  .catch((error)=>{console.log(error);})

// set public directory to serve static html files
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// redirect to store when user hits http://localhost:3000
app.get('/' , (req , res) => {
    req.render('index');
})

app.post('/success' , (req , res) => {
    //console.log(instance.payments.fetch(req.body.razorpay_payment_id));
    /*instance.payments.all({
        from: '2018-08-01',
        to: '2019-08-20'
      }).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      })
      */
      instance.payments.fetch(req.body.razorpay_payment_id)
        .then((response)=>{console.log(response);res.send(response);})
        .catch((error)=>{console.log(error);})
})

// app listens on 3000 port
app.listen( 3000 , () => {
    console.log(' app listening on 3000 ');
})
