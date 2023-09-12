const express = require("express");
const app = express();

const Mountain = require("./mountain");

app.use(express.json());

const mountains = [
    new Mountain(1, 'Mount Everest', 8848),
    new Mountain(2, 'K2', 8611),
    new Mountain(3, 'Kangchenjunga', 8586) ,
    new Mountain(4, 'Lhotse', 8516),
    new Mountain(5, 'Makalu', 8485),
    new Mountain(6, 'Cho Oyu', 8188),
    new Mountain(7, 'Dhaulagiri', 8167),
    new Mountain(8, 'Manaslu', 8163),
    new Mountain(9, 'Nanga Parbat', 8126),
    new Mountain(10, 'Annapurna', 8091)
  ];

let id = 11;

app.get("/", (req, res) => {
    res.send({ data: mountains })
});

app.get("/:id", (req, res) => {
    const mountianId = Number(req.params.id);
    const mountain = mountains.find((mountain) => mountain.id === mountianId);
    
    if(!mountianId) {
        res.status(400).send({ error: "Id is not a number"})
    } 

    if(mountain) {
        res.send({ data: mountain });
    } else if (!id) {
        res.send({ error: `Id is not a number` })
    } else {
        res.status(404).send({ error: `Mountain with id: ${mountianId} does not exist` });
    }  
});

app.post("/", (req, res) => {
    const name = req.body.name;
    const height = req.body.height;

    const newMountain = new Mountain(id, name, height);

    mountains.push(newMountain);

    id += 1;

    res.send({ data: newMountain })
});

app.patch("/:id", (req, res) => {
    const mountainId = Number(req.params.id);
    
    if(!mountainId) {
        res.status(400).send({ error: "Id is not a number"})
    } 

    const mountain = mountains.find((mountain) => mountain.id === mountainId);
    const name = req.body.name;
    const height = req.body.height;

    if(mountain) {
        if(name) {
            mountain.name = name;
        }
        if(height) {
            mountain.height = height;
        }
        res.send({ data: mountain })
    } else {
        res.status(404).send({ error: `Mountain with id: ${mountainId} does not exist` });
    }
});

app.put("/:id", (req, res) => {
    const mountainId = Number(req.params.id);
    
    if(!mountainId) {
        res.status(400).send({ error: "Id is not a number"})
    } 

    const mountain = mountains.find((mountain) => mountain.id === mountainId);

    if(mountain) {
        if(req.body.name && req.body.height) {
        mountain.name = req.body.name;
        mountain.height = req.body.height;
        
        res.send({ data: mountain });
        } else {
            res.status(404).send({ error: "Name or height is missing."})
        }
    } else {
        res.status(404).send({ error: `Mountain with id: ${mountainId} does not exist` });
    }
});

app.delete("/:id", (req, res) => {
    const mountainId = Number(req.params.id);
    
    if(!mountainId) {
        res.status(400).send({ error: "Id is not a number"})
    } 

    const indexToDelete = mountains.findIndex((mountain) => mountain.id === mountainId);

    if(indexToDelete != -1) { 
        mountains.splice(indexToDelete, 1);

        res.send({ data: `Mountain with id: ${mountainId} was deleted` });
    } else {
        res.status(404).send({ error: `Mountain with id: ${mountainId} does not exist` });
    }

});

const port = 8080;
app.listen(port, (error) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log("Server is running on port", port);
});