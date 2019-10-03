const express = require('express');
var cors = require('cors');
const  app =  express();
var nem = require("nem-sdk").default;

app.use(cors());

var redis = require('redis');
var redis_client = redis.createClient(); 
var endpoint = nem.model.objects.create("endpoint")("http://hugetestalice.nem.ninja", 7890);
var common = nem.model.objects.create("common")("passowrd", "privatekey");


app.get('/transfer', (req, res)=>{
    const dest = req.query.dest;
    // console.log(Date.now()+60000); //second

    redis_client.get(dest, function (error, result) {
        if (error) {
            console.log(error);
        }
        if(result!=null){
            if((parseInt(result)+3600000) < Date.now()){
                let transferTransaction = nem.model.objects.create("transferTransaction")(dest, 1, "From Mazinger to you");
                let transactionEntity = nem.model.transactions.prepare("transferTransaction")(common, transferTransaction, nem.model.network.data.testnet.id);

                nem.model.transactions.send(common, transactionEntity, endpoint).then(function(resi){
                    result = resi['message']
                    if(result=='SUCCESS'){
                        response = {'response':'success'}
                        redis_client.set(dest, Date.now());
                        res.send(response);
                    }
                }, function(err){
                    var error = err['data']['message'].substring(0, 15) 
                    if (error == "invalid address"){
                        response = {'response':'invalid address'}
                        res.send(response);
                    }else{
                        console.log(err)
                        response = {'error':'error with transaction'}
                        res.send(response);
                    }
                })
                
            }
            else{
                console.log("no sea agarrado perro");
                res.send({'response':'wait'});
            }
            
        }
        else{
            let transferTransaction = nem.model.objects.create("transferTransaction")(dest, 1, "From Mazinger to you beibi");
                let transactionEntity = nem.model.transactions.prepare("transferTransaction")(common, transferTransaction, nem.model.network.data.testnet.id);

                nem.model.transactions.send(common, transactionEntity, endpoint).then(function(resi){
                    result = resi['message']
                    if(result=='SUCCESS'){
                        response = {'response':'success'}
                        console.log("user added");
                        redis_client.set(dest, Date.now());
                        res.send(response);
                    }
                }, function(err){
                    var error = err['data']['message'].substring(0, 15) 
                    if (error == "invalid address"){
                        response = {'response':'invalid address'}
                        res.send(response);
                    }else{
                        console.log(err)
                        response = {'error':'error with transaction'}
                        res.send(response);
                    }
                })
        }
    });
})

app.listen(3000, () => {
    console.log(`Server is up and listening on ${3000}...`);
  })


