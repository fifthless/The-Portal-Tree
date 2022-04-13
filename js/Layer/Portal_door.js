addLayer("p", {
    name: "Portal", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    branches : ["m"],
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},

    color: "#5D6D7E ",

    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    
    resource: "Portal", // Name of prestige currency
    
    baseResource: "Portal fragment", // Name of resource prestige is based on

    baseAmount() {return player.points}, // Get the current amount of baseResource
    
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have

    getResetGain(){
        let ret = player.points.times(0.05).times(tmp.b.gainMult)

        return ret.max(0)
    },

    //CURRENCY
    exponent: 0.5, // Prestige currency exponent

    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade("p", 14)) mult = mult.times(upgradeEffect("p", 14))
        
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },

    row: 0, // Row the layer is in on the tree (0 is the first row)
    
    hotkeys: [
        {key: "p", description: "p: Reset for Portal Door", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    
    layerShown(){return true},

    passiveGeneration(){ if (hasMilestone("iob",1)) return true},

    upgrades: {
        11: {
            title: "Fragment Collector",
            description: "Double your portal fragment gain",
            cost: new Decimal(1),
            unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true
            
        },

        12:{
            title:"Portal mineshaft",
            description:"Portal increase your portal fragment gain",
            cost: new Decimal(5),
            unlocked(){ return hasUpgrade("p",11)},
            effect() {
                return player[this.layer].points.add(1).pow(0.4)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        
        13:{
            title:"Fragment mineshaft",
            description:"Portal fragment increase portal fragment gain",
            cost: new Decimal(10),
            unlocked(){ return hasUpgrade("p",12)},
            effect() {
                return player.points.add(1).pow(0.13)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },

        14:{
            title:"Portalize",
            description:"Portal increase portal gain",
            cost: new Decimal(20),
            unlocked(){ return hasUpgrade("p",13)},
            effect() {
                return player.p.points.add(1).pow(0.3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },

        15:{
            title:"Portal Door",
            description:"Unlock Your First Portal Destination",
            cost: new Decimal(50),
            unlocked(){ return hasUpgrade("p",14)},
            
        },

        21:{
            title:"XXX",
            description:"XXX",
            cost: new Decimal(20),
            unlocked(){ return hasUpgrade("iob",12)},
            
        },

        22:{
            title:"XXX",
            description:"XXX",
            cost: new Decimal(20),
            unlocked(){ return hasUpgrade("p",21)},
            
        },
    },

    tabFormat: {
        "Upgrades": {
                content: [
                    "main-display",
                    ["prestige-button", "", function (){ return hasUpgrade("iob", 21) ? {'display': 'none'} : {}}],
                    ["display-text",
                    function(){
                            if (player.shiftAlias) return "Your best Book is " + format(player.p.best)
                            if (hasMilestone("iob",1)) {return "You are gaining " + format(tmp.p.getResetGain) + " Portal per second"}}],
                "blank", 
                ["upgrades", [1,2,3,4,5,6,7]],
            ],
                
        
        }
    },

    autoUpgrade() {if (hasMilestone("iob",0)) return true},
    prestigeButtonText(){return "<b>+</b>" + format(tmp.p.getResetGain) + " Portal"}

    
})

