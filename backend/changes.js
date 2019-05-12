const Dragon=require('./app/dragon');

const toothless=new Dragon({
    birthdate: new Date(),
    nickname: 'toothless',
    traits: [
        { traitType: 'backgroundColor', traitValue: 'black' }
    ]
});

setTimeout(()=>{
    const Armorwing=new Dragon();
    console.log("Armorwing",Armorwing);
}, 3000);

console.log("toothless",toothless);
/*************************************************************************************** */
const Generation = require('./app/generation');

const generation = new Generation();
console.log('generation',generation);
const dragon = generation.newDragon();

console.log('toothless',dragon);

setTimeout(()=>{
    const Armorwing = generation.newDragon();
    console.log("Armorwing",Armorwing);
}, 15000);

