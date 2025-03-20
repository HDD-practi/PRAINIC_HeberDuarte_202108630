const express = require('express');

const respuestas = require('../../red/respuestas');
const controlador = require('./controlador');

const router = express.Router();

router.get('/',async function(req, res) { 
    try{
        const items = await controlador.todos(req.params.id);
        respuestas.succes(req, res, items , 200);
        }
        catch(err){
            respuestas.error(req, res, err, 500);
        }
 
});

router.get('/:id',async function(req, res) { 
    try{
    const items = await controlador.uno(req.params.id);
    respuestas.succes(req, res, items , 200);
    }
    catch(err){
        respuestas.error(req, res, err, 500);
    }
});

module.exports = router;