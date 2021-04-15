let upcomingMovies = [
    {
        "id": 0,
        "name": "Mortal Komabat", 
        "description": "Mortal Kombat between Sub-Zero and Scorpion"
    }, 
    {
        "id": 1, 
        "name": "Sudan", 
        "description": "Hahaha there is no description"
    },
    {
        "id": 2, 
        "name": "Meow", 
        "description": "Lera is cute"
    },
    {
        "id": 3, 
        "name": "Vlad", 
        "description": "Vlad is being stupid sometimes"
    }
]

//import all necessary variable for database connection
const mongoose = require("mongoose");
const url = "mongodb+srv://vm1702:3989302As@cluster0.ljnio.mongodb.net/a-4db?retryWrites=true&w=majority";
const connectionOptions = { useNewUrlParser: true, useUnifiedTopology: true };

//establish connection and return success or failure using promise 
mongoose.connect(url, connectionOptions).then(
    () => {
        console.log("Mongoose connected successfully");
    }
).catch(
    (err) => {
        console.log(`Mongoose failed to connect with a ${err}`);
    }
)


const express = require("express");
const app = express();

// I dont know why but it does not work without these lines :cccc
app.use(express.json());
app.use(express.urlencoded());

const HTTP_PORT = process.env.PORT || 8080;
const onHttpStart = () => {
    console.log(`Server runs on ${HTTP_PORT}`);
}
app.listen(HTTP_PORT, onHttpStart);


app.get("/", (req, res)=> {
    res.send("suck my ass!")
});

app.get("/api/movies", (req,res)=> {
    res.send(upcomingMovies)
});

app.get("/api/movies/:id", (req, res)=> {
    const movieId = parseInt(req.params.id);

    for(let i = 0; i < upcomingMovies.length; i++){
        if(upcomingMovies[i].id === movieId){
            return res.send(upcomingMovies[i]);
            break;
        }
    }
    res.status(404).send("sorry!");
});

app.post("/api/movies", (req, res)=> {
    console.log(req.body);

    for(let i = 0; i < upcomingMovies.length; i++){
        if(req.body.id == upcomingMovies[i]){
            res.status(400).send("get the hell out of here!!!!")
        }
    }
    
    upcomingMovies.push(req.body);
    res.send("fuck off");
});

