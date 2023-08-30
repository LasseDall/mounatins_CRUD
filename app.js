const express = require("express");
const app = express();

const mountains = require('./mountain');


app.get("/", (req, res) => {
    res.send({ data: mountains })
});

app.get("/:id", (req, res) => {
    const id = req.params.id;
    const mountain = mountains.find(mountain => mountain.id == id);
    
    if(mountain) {
        res.send({ data: mountain });
    } else {
        res.send({ data: `Mountain with id: ${id} does not exist` });
    };  
});


app.listen(8080);