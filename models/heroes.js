const fs = require('fs');
const path = require('path');
const heroesPath = path.join(__dirname, '..', 'database', 'heroes.json')
// const data = require('./../database/heroes')
// var heroes = [
//     { id: 1, name: 'Mr. Nice' },
//     { id: 2, name: 'Narco' },
//     { id: 3, name: 'Bombasto' },
//     { id: 4, name: 'Celeritas' },
//     { id: 5, name: 'Magneta' },
//     { id: 6, name: 'RubberMan' },
//     { id: 7, name: 'Dynama' },
//     { id: 8, name: 'Dr IQ' },
//     { id: 9, name: 'Magma' },
//     { id: 10, name: 'Tornado' }
// ];
let heroes = JSON.parse(fs.readFileSync(heroesPath, 'utf-8'));

async function getHeroById(id) {
    // return new Promise((resolve, reject) => {
        if (heroes && heroes.length > 0) {
            let foundHero = heroes.find((hero) => { return id == hero.id });
            console.log('Found hero---', foundHero)
            // foundHero ? resolve(foundHero) : reject("Hero with this id does not exist")
            if(foundHero){
                return foundHero;
            }else{
                throw new Error('Hero with this id does not exist');
            }
        } else {
            // reject("There are no heroes in the list of heroes");
            throw new Error('There are no heroes in the list of heroes');
        }
    // })
}

async function writeBacktoFile(data) {
    fs.writeFile(heroesPath, data, 'utf-8', (err, data) => {
        if (err) {
            throw new Error("Could not update the file");
        }
        return true;
    })
}

async function updateHero(hero) {
    // return new Promise(async (resolve, reject) => {
        let toBeUpdatedHeroIndex = heroes.findIndex((eachHero) => { return hero.id == eachHero.id });
        if (toBeUpdatedHeroIndex > -1) {
            heroes[toBeUpdatedHeroIndex].name = hero.name;
            let data = JSON.stringify(heroes).replace(heroes[toBeUpdatedHeroIndex].name, hero.name);
            try {
                await writeBacktoFile(data)
                // resolve(heroes[toBeUpdatedHeroIndex]);
                return heroes[toBeUpdatedHeroIndex];
            } catch (err) {
                // reject(err);
                throw new Error(err);
            }
        } else {
            // reject("Bad request")
            throw new Error("Bad request");
        }
    // })
}

async function addHero(hero) {
    // return new Promise(async (resolve, reject) => {
        let index = heroes.length;
        let newHero = { id: heroes[index - 1].id + 1, name: hero.name };
        heroes.push({ id: heroes[index - 1].id + 1, name: hero.name });
        let data = JSON.stringify(heroes)
        try {
            await writeBacktoFile(data);
            // resolve(newHero);
            return newHero
        } catch (err) {
            // reject(err);
            throw new Error(err);
        }
    // })
}

async function deleteHero(id) {
    // return new Promise(async (resolve, reject) => {
        let index = heroes.findIndex((hero) => id == hero.id);
        if (index > -1) {
            let deletedHero = heroes.splice(index, 1);
            let data = JSON.stringify(heroes);
            try {
                await writeBacktoFile(data);
                // resolve(deletedHero)
                return deletedHero;
            } catch (err) {
                // reject(err)
                throw new Error(err);
            }
        } else {
            // reject("Can not find the hero with this id to delete");
            throw new Error("Can not find the hero with this id to delete");
            
        }
    // })
}

async function searchHero(queryString) {
    // return new Promise((resolve, reject) => {
        if (queryString.name) {
            let results = [];
            heroes.map((hero) => {
                if (hero.name.includes(queryString.name)) {
                    results.push(hero);
                }
            })
            if (results.length > 0) {
                // resolve(results);
                return results;
            } else {
                // reject("Could not find any results for this serach term");
                throw new Error("Could not find any results for this serach term");
            }
        } else {
            // reject("query string does not contain name property");
            throw new Error("query string does not contain name property");
        }
    // })
}

module.exports = {
    heroes,
    getHeroById,
    updateHero,
    addHero,
    deleteHero,
    searchHero
};