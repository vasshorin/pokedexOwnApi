const express = require('express')
const app = express()
app.set('view engine', 'ejs');
const https = require('https');
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
app.use(bodyparser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb+srv://testUser:testUser@cluster0.etygx.mongodb.net/pkmSchema?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const pokeSch = new mongoose.Schema({
    id: Number,
    name: String
});

const pokemonModel = mongoose.model("pokemonmodels", pokeSch);
const typeModel = mongoose.model("types", pokeSch);



// app.listen(5004, function (err) {
//     if (err)
//         console.log(err);
// })

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

app.get('/',function(req,res){
    res.send("<p>We have two pokemons id 25 and 666: /api/pokemon/:id</p>");
})


app.get('/api/pokemon/:id', function (req, res) {
    pokemonModel.find({
        id: req.params.id
    }, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + data);
        }
        res.send(data);
    });
})

app.get('/api/type', function (req, res) {
    typeModel.find({}, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + data);
        }
        res.send(data);
    });
})

app.get('/api/getAll', function (req, res) {
    pokemonModel.find({}, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + data);
            console.log("Time");
        }
        res.send(data);
    });
})
