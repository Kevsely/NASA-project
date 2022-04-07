const launches = new Map();
let latestFlightNumber = 100

const launch = {
    flightNumber: 100,
    mission: "Kepler Exploration X",
    rocket: "Explorer IS1",
    launchDate: new Date("December 27, 2030"),
    target: "Kepler-442 b",
    customer: ["ZTM", "NASA"], 
    upcoming: true, 
    success: true,
}

launches.set(launch.flightNumber, launch);

function isExistingLaunch(launchId) {
    return launches.has(launchId)
}

function getAllLaunches() {
    return Array.from(launches.values())
}

function addNewLaunch(launch) {
    latestFlightNumber++
    launches.set(latestFlightNumber, Object.assign(launch, {
        flightNumber: latestFlightNumber,
        customer: ["ZTM", "NASA"], 
        upcoming: true, 
        success: true,
    }))
}

function abortLaunchById(launchId) {
    const abortedLaunch = launches.get(launchId)
    abortedLaunch.upcoming = false
    abortedLaunch.success = false
    return abortedLaunch
}

module.exports = {
    isExistingLaunch,
    getAllLaunches, 
    addNewLaunch,
    abortLaunchById
}