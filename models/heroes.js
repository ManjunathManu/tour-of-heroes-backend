var heroes = [
    { id: 1, name: 'Mr. Nice' },
    { id: 2, name: 'Narco' },
    { id: 3, name: 'Bombasto' },
    { id: 4, name: 'Celeritas' },
    { id: 5, name: 'Magneta' },
    { id: 6, name: 'RubberMan' },
    { id: 7, name: 'Dynama' },
    { id: 8, name: 'Dr IQ' },
    { id: 9, name: 'Magma' },
    { id: 10, name: 'Tornado' }
];

function getHeroById(id) {
    return new Promise((resolve, reject) => {
        if (heroes && heroes.length > 0) {
            let foundHero = heroes.find((hero) => { return id == hero.id });
            console.log('Found hero---', foundHero)
            foundHero ? resolve(foundHero) : reject("Hero with this id does not exist")
        } else {
            reject("There are no heroes in the list of heroes");
        }
    })
}

function updateHero(hero) {
    return new Promise((resolve, reject) => {
        let toBeUpdatedHeroIndex = heroes.findIndex((eachHero) => { return hero.id == eachHero.id });
        if (toBeUpdatedHeroIndex > -1) {
            heroes[toBeUpdatedHeroIndex].name = hero.name;
            resolve(heroes[toBeUpdatedHeroIndex])
        } else {
            reject("Bad request")
        }
    })
}

function addHero(hero) {
    return new Promise((resolve, reject) => {
        let index = heroes.length;
        let newHero = {id:heroes[index-1].id+1, name:hero.name};
        heroes.push({ id: heroes[index-1].id+1, name: hero.name });
        resolve(newHero);
    })
}

function deleteHero(id){
    return new Promise((resolve, reject)=>{
        let index = heroes.findIndex((hero)=> id == hero.id);
        if(index > -1){
            let deletedHero = heroes.splice(index, 1);
            resolve(deletedHero)
        }else{
            reject("Can not find the hero with this id to delete");
        }
    })
}
module.exports = {
    heroes,
    getHeroById,
    updateHero,
    addHero,
    deleteHero
};