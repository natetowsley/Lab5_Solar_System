//CONTROLLER (contains routes to start node application)
import express from 'express';
import fetch from 'node-fetch';
const solarSystem = (await import('npm-solarsystem')).default;
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', async(req, res) => {
   let url = "https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&per_page=50&orientation=horizontal&q=solar%20system";
   let response = await fetch(url);
   let data = await response.json();
   console.log(data);
   let randNum = Math.floor(Math.random() * 50);
   let randomImage = data.hits[randNum].webformatURL;
   res.render('home.ejs', {randomImage});
});

app.listen(3000, () => {
   console.log('server started');
});

//planet route
app.get('/planet', (req, res) => {
    let planet_name = req.query.planetName;

    let planetInfo = solarSystem[`get${planet_name}`]();

    // console.log(planetInfo);
    res.render('planetInfo.ejs', {planetInfo, planet_name});
});

app.get('/nasapod', async(req, res) => {
   // let url = "https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&per_page=50&orientation=horizontal&q=solar%20system";
   // let response = await fetch(url);
   // let data = await response.json();
   // console.log(data);
   // let pod = data;
    // console.log(planetInfo);
    res.render('pod.ejs'/*, {data}*/);
});

app.get('/rocks', (req, res) => {
    let name = req.query.name;

    let info = solarSystem[`get${name}`]();

    // console.log(info);
    res.render('rocks.ejs', {info, name});
});