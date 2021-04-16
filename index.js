//import all necessary variable for database connection
const mongoose = require("mongoose");
//import express 
const express = require("express");
const bodyParser = require('body-parser');

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

const Schema = mongoose.Schema
const ItemScheema = new Schema({
    item: String, 
    rarity: String, 
    description: String, 
    gold_per_turn: Number
})

const Item = mongoose.model("current_items", ItemScheema)

const app = express();
//For some reason we need to import body parser manually so that req.body would work
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const HTTP_PORT = process.env.PORT || 8080;
const onHttpStart = () => {
    console.log(`Server runs on ${HTTP_PORT}`);
}

app.listen(HTTP_PORT, onHttpStart);

app.get("/", (req,res)=> {
    res.send("<a>/api/items</a>");
});

app.get("/api/items", (req,res)=> {
    Item.find({}).exec().then(
        (msg) => {
        res.send(msg);
        }
    ).catch(
        (err) => {
            console.log(err);
        }
    );
});

app.get("/api/items/:item_name", (req, res)=> {
    const item_name = req.params.item_name;
    console.log(item_name);

    Item.find({item: item_name}).then(
        (result) => {
            if(result.length === 0){
                res.status(404).send("Sorry item was not found :(")
            }else{
                res.send(result);
            }
        }
    ).catch(
        (err) => {
            console.log(err);
        }
    )
});

app.post("/api/items", (req, res)=> {
    if(req.body.item === "" || req.body.description === ""){
        res.status(400).send("please check if name and description are not empty >:|")
    }else{
        const newItem = Item(
            {item: req.body.item, 
            rarity: req.body.rarity, 
            description: req.body.description, 
            gold_per_turn: req.body.gold_per_turn})

        newItem.save().then(
            () => {
                console.log("Insert Was Successfull")
                res.status(200).send("Insert Was Successful")
            }).catch(
            (err) => {
                console.log(err)
            })
    }
});

app.delete("/api/items/:item_name", (req, res)=> {
    const item_name = req.params.item_name;
    console.log(item_name);

    Item.deleteOne({item: item_name}).then(
        (result) => {
            if(result.length === 0){
                res.status(404).send("Sorry item was not found :(")
            }else{
                res.send("Delete was complete")
            }
        }
    ).catch(
        (err) => {
            console.log(err);
        }
    )
});

app.put("/api/items/:_id", (req, res)=> {
    const id = req.params._id;
    console.log(id);

    res.status(501).send("sorry this feature is not implemented yet :C")
});
