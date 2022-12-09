const launches = require('./launches.mongo')

// const launches = new Map()

let = latestFlightNumber = 100

const launch = {
	flightNumber: 100,
	mission: 'Kepler Exploration X',
	rocket: 'Explorer IS1',
	launchDate: new Date('December 27, 2030'),
	target: 'Kepler-442 b',
	customers: ['ZTM', 'NASA'],
	upcoming: true,
	success: true,
}

// launches.set(launch.flightNumber, launch)
saveLaunch(launch)

function existsLaunchWithId(launchId) {
	return launches.has(launchId)
}

async function getAllLaunches() {
	return await launches.find({}, { _id: 0, __v: 0 })
}

async function saveLaunch(launch) {
	await launches.updateOne(
		{
			flightNumber: launch.flightNumber,
		},
		launch,
		{
			upsert: true,
		}
	)
}

function addNewLaunch(launch) {
	++latestFlightNumber
	launches.set(
		latestFlightNumber,
		Object.assign(launch, {
			upcoming: true,
			success: true,
			customers: ['Kevsely', 'Zero to Mastery', 'NASA'],
			flightNumber: latestFlightNumber,
		})
	)
}

function abortLaunchById(launchId) {
	const aborted = launches.get(launchId)
	aborted.upcoming = false
	aborted.success = false
	return aborted
}

module.exports = {
	existsLaunchWithId,
	getAllLaunches,
	addNewLaunch,
	abortLaunchById,
}
