//Modules
const express = require('express');
const app = express();
const cors = require('cors');
const data = require('../lib/db/data.json');
const path = require('path');
const { writeFile } = require('fs');
app.use(cors())
app.use(express.json())
require('dotenv').config();
const PORT = process.env.PORT || 4000;

//Routes
app.get('/', (req, res) => {
    res.send(data)
});


app.get('/data/', (req, res) => {
    res.send(data);
  })


app.get('/data/:id', (req, res) => {
    const id = req.params.id;
    try{
        if(!id){
            throw new Error("ID not found");
        }
        for(let i = 0; i < data.length; i++){
            if(data[i].id === id){
                res.send(data[i]);
            }
        }
    }
    catch(err){
        console.log(err);
    }
});

//Create new data entry in JSON file
app.post('/data', (req, res) => {
    const newData = req.body;
    newData.id = req.body.id;
  
    const reorderedData = {
      id: newData.id,
      ...newData
    };
  
    console.log(reorderedData);
    data.push(reorderedData);
    res.send(data);
});
//change specific data entry
app.put('/data/:id', (req, res) => {
    const id = req.params.id;
    const newData = req.body;
    try{
        if(!id){
            throw new Error("ID not found");
        }
        for(let i = 0; i < data.length; i++){
            if(data[i].id === id){
                data[i] = newData;
                res.send(data[i]);
            }
        }
    }
    catch(err){
        console.log(err);
    }
});
//Delete specific data entry
app.delete('/data/:id', (req, res) => {
    const id = req.params.id;
    try{
        if(!id){
            throw new Error("ID not found");
        }
        for(let i = 0; i < data.length; i++){
            if(data[i].id === id){
                data.splice(i, 1);
                res.send(data);
            }
        }
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
});


//Server Port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})