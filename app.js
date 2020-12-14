const express=require('express');
const https=require('https');
const bodyParser=require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req,res){
   res.sendFile(__dirname+"/index.html");
});

app.post('/', function(req, res){
	var city=req.body.cityName;
    const apiURL= "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=cd792953c8b487361c8bc2dd312db4cf";
    https.get(apiURL, function(response){
         response.on('data', function(data){
         weatherData=JSON.parse(data);
         temp=weatherData.main.temp;
         res.write("<h1>Currently, Temperature in "+city+" is "+temp+" degree celcius.</h1>");
         desc=weatherData.weather[0].description;
         res.write("<h3>The weather is currently : "+desc+"</h3>");
         res.write("<img src=http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png>");
         res.send();
       });
    });

});





app.listen(3000, function(){
   console.log("Server is runnign at 3000");
});