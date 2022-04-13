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

     milestones: {
        0: {
            requirementDescription: "<b>Stabillizer</b><br>5 Island of Book",
            effectDescription: "You can autobuy the portal upgrade",
            done() { return player.iob.points.gte(5) },

        },

        1: {
            requirementDescription: "<b>Portalizer</b><br>10 Island of Book",
            effectDescription: "You can passively gain Portal",
            done() { return player.iob.points.gte(10) },
            
        },
     },
    
     upgrades: {
        11: {
            title: "Book Tree",
            description: "Start gaining book",
            cost: new Decimal(2),
            unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true
            
        },

        12:{
            title:"Space-in",
            description:"Unlock even more Portal upgrade",
            cost: new Decimal(5),
            unlocked(){ return hasUpgrade("b",13)},
            
        },

        13:{
            title:"Bookling",
            description:"Unlock Buyable for Book",
            cost: new Decimal(10),
            unlocked(){ return hasUpgrade("iob",12)},
            
        },

        14:{
            title:"Moon-light",
            description:"Book can increase book gain",
            cost: new Decimal(20),
            unlocked(){ return hasUpgrade("iob",13)},
            effect() {
                return player.b.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            
        },

        15:{
            title:"Bridge",
            description:"Unlock Bridging in the layer IB",
            cost: new Decimal(100),
            unlocked(){ return hasUpgrade("iob",14)},
            
        },
     },



     tabFormat: {
        "Upgrades": {
                content: [
                    "main-display",
                    ["prestige-button", "", function (){ return hasUpgrade("iob", 21) ? {'display': 'none'} : {}}],
                "blank", 
                ["upgrades", [1,2,3,4,5,6,7]],
            ],
        },

        "Milestone": {
                content: [
                    "main-display",
                    "blank",
                    "milestones",
            ],   
                unlocked(){return true},
              
        },
        
        "Bridging": {
            content: [
                    "main-display",
                    "blank",
                    "",
            ],
            unlocked(){ return hasUpgrade("iob",15)},
            },
     }
 
})
