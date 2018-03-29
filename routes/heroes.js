const express = require('express');
const heroesModel = require('./../models/heroes');

const router = express.Router();

router.get("/", function (req, res) {
    // res.send("Hello,heroes api ");
    console.log("[API]:GET /heroes--->", );
    if(req.query.name){
        console.log('query string...', req.query);
        heroesModel.searchHero(req.query)
            .then((searchResults)=>{
                console.log('serachResults---', searchResults);
                res.status(200).send(searchResults);
            })
            .catch((err)=>{
                console.log('ERROR-->',err);
                res.status(400).send(err);
            })
    }else{
        res.send(heroesModel.heroes)
    }
});

router.put('/', (req, res) => {
    console.log('[API]:PUT /heroes');
    let hero = req.body ? req.body : null;
    if (hero) {
        heroesModel.updateHero(hero)
            .then((updatedHero) => {
                res.status(200).send(updatedHero);
            })
            .catch((err) => {
                console.log('error',err);
                res.status(400).send(err);
            })
    } else {
        res.status(400).send("Empty request Body");
    }
})

router.post('/', (req, res) => {
    console.log('[API]: POST /heroes', req.body);
    let hero = req.body;
    if (hero) {
        heroesModel.addHero(hero)
            .then((newHero) => {
                console.log('new created hero', newHero)
                res.status(200).send(newHero);
            })
            .catch((err) => {
                console.log('error', err)
                res.status(400).send(err);
            })
    } else {
        res.status(400).send("Empty request Body");
    }
})

router.get('/:id', function (req, res) {
    console.log('[API]:GET /heroes/id--->id=', req.params.id);
    heroesModel.getHeroById(req.params.id)
        .then((hero) => {
            res.status(200).send(hero);
        })
        .catch((err) => {
            console.log('error',err)
            res.status(404).send(err);
        })
})

router.delete('/:id',(req, res)=>{
    console.log('[API]:DELETE /heroes/id--->id=', req.params.id);
    heroesModel.deleteHero(req.params.id)
        .then((deletedHero)=>{
            console.log('Deleted hero-->', deletedHero);
            res.status(200).send(deletedHero);
        })
        .catch((err)=>{
            console.log('error', err);
            res.status(404).send(err);
        })
})

router.get('/search',(req, res)=>{
    console.log('[API]:GET /heroes/search--->name=', req.query);
    res.send();
})

module.exports = router;
