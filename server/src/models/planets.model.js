const fs = require('fs')
const path = require("path")
const { parse } = require('csv-parse');

const parser = parse({
    comment: "#",
    columns: true
});

const habitablePlanets = [];

function isHabitablePlanets(planet) {
    return planet["koi_disposition"] === "CONFIRMED"
        && planet["koi_insol"] > 0.36 && planet["koi_insol"] < 1.11
        && planet["koi_prad"] < 1.6
}

function loadPlanetsData () {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, "..", "..", "data", "kepler_data.csv"))
            .pipe(parser)
            .on("data", (data) => {
                if (isHabitablePlanets(data))
                    habitablePlanets.push(data);
            })
            .on("error", (error) => {
                console.log(error)
                reject(error)
            })
            .on("end", () => {
                console.log(`${habitablePlanets.length} habitables planets`)
                resolve()
            })
    })    
}

function getAllPlanets() {
    return habitablePlanets
}

module.exports = {
    loadPlanetsData,
    getAllPlanets,
}