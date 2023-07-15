const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var url =
    "https://api.openweathermap.org/data/2.5/weather?q=England&units=metric&APPID=b883d7d4f078d8b18515c7d45bd4d514";

    app.get("/", (req, res) => {

  https.get(url, (response) => {
    console.log(response.statusCode);
    // console.log(response);
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const imgsrc = "https://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png"
      // console.log(imgsrc)
      res.render("index", {
        city:weatherData.name,
        temperature: weatherData.main.temp,
        description: weatherData.weather[0].description,
        max:weatherData.main.temp_max,
        min:weatherData.main.temp_min,
        imagesrc:imgsrc
      });
    });
  });
});


app.post('/',(req,res)=>{
  const place = req.body.searchPlace
  url =
  `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&APPID=b883d7d4f078d8b18515c7d45bd4d514`;
  res.redirect("/")
})


app.listen( env.process.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
