addLayer("iob", {
    name: "Island of Book", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "IB", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    branches : ["p"],
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},

    color: "#F7DC6F",

    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    
    resource: "Island of Book", // Name of prestige currency
    
    baseResource: "Portal ", // Name of resource prestige is based on

    baseAmount() {return player["p"].points}, // Get the current amount of baseResource
    
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    
    //CURRENCY
    exponent: 0.5, // Prestige currency exponent

    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade('b', 13)) mult = mult.div(upgradeEffect('b', 13))

        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },

    row: 1, // Row the layer is in on the tree (0 is the first row)
    
    hotkeys: [
        {key: "b", description: "b: Reset for Island of Book", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    
    layerShown()
     { if (hasAchievement("ac",13)) return true},

     

 
})
