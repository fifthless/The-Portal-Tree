let modInfo = {
	name: "The Portal Tree",
	id: "portal",
	author: "fifthless",
	pointsName: "Portal fragment",
	modFiles: ["Layer/Island_of_book.js","Layer/Portal_door.js", "tree.js","Layer/Book.js","Layer/achievement.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new player
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.4 Portal to the Island",
	name: "",
}

let changelog = `<h1>Changelog:</h1><br>
<br>
	<b>Layer</b> - <span style="color:red">Red</span><br>
	<b>Balancing</b> - <span style="color:yellow">Yellow</span><br>
	<b>Upgrade</b> - <span style="color:green">Green</span><br>
	<b>Buyable</b> - <span style="color:blue">Blue</span><br>
	<br>

	<h3>v0.4</h3><br>
		- <span style="color:yellow">balancing</span> ~<br>
		- added some <span style="color:green">upgrade</span><br>
		- added a <span style="color:blue">buyable</span> for book<br>
		- redoing most of the effect and replacing the <span style="color:green">upgrades</span><br>
		<br>

	<h3>v0.3.1</h3><br>
		- balanced some upgrade<br>
		- added some achievement<br>
		- Added some upgrade<br>
		<br>

	<h3>v0.3</h3><br>
		- balanced the game to <span style="color:yellow">1e20 Portal Fragment</span><br>
		- Added some milestone for autobuy<br>
		- Added some upgrade<br>
		<br>


	<h3>v0.2.4</h3><br>
		- balanced the game to <span style="color:yellow">1e9 Portal Fragment</span><br>
		<br>

	<h3>v0.2.3</h3><br>
		- Added Upgrade <span style="color:green">Book Tree</span><br>
		<br>

	<h3>v0.2.3</h3><br>
		- fixed Upgrade <span style="color:green">Adventuring the Island</span><br>
		<br>

	<h3>v0.2.3</h3><br>
		- make some various change<br>
		<br>

	<h3>v0.2.2</h3><br>
		- Words fixing<br>
		- Upgrade error fixing<br>
		<br>

 	<h3>v0.2.1</h3><br>
		- Added Upgrade<br>
		<br>
		
	<h3>v0.2</h3><br>
		- Added a main Layer - <span style="color:red">Island of book</span> , sub-layer - <span style="color:red">book</span> and <span style="color:red">achievement</span> layer<br>
		- Added some upgrade<br>
		- Bugs fixing<br>
		- balanced the game to <span style="color:yellow">1e4 Portal Fragment</span><br>
		<br>

	<h3>v0.1</h3><br>
		- Added random idea<br>
		- Added stuff`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(1)

	let gain = new Decimal(1)
		if (hasUpgrade("p", 11)) gain = gain.times(2)
		if (hasUpgrade('p', 12)) gain = gain.times(upgradeEffect('p', 12))
		if (hasUpgrade("p", 13)) gain = gain.times(upgradeEffect("p", 13))
		if (hasUpgrade("b", 12)) gain = gain.times(upgradeEffect("b", 12))


	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("1e20"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}