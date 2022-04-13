addLayer("b", {
    name: "Book", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    branches : ["iob"],
    startData() { return {
        unlocked: true,
        points: new Decimal(0)
    }},

    color: "#FCF3CF",

    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    
    resource: "Book", // Name of prestige currency
    
    baseResource: "", // Name of resource prestige is based on

    baseAmount() {return player["iob"].points}, // Get the current amount of baseResource
    
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    
    getResetGain(){ 
        let ret = player.iob.points.times(1.2).times(tmp.b.gainMult)

        return ret.max(0)
        },
    
    //CURRENCY
    exponent: 1.3, // Prestige currency exponent

    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade("b", 11)) mult = mult.times(2)
        mult = mult.times(tmp.b.buyables[11].effect)
        if (hasUpgrade("iob", 14)) mult = mult.times(upgradeEffect("iob", 14))

        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },

    row: 1, // Row the layer is in on the tree (0 is the first row)
    
    layerShown(){ if (hasUpgrade("iob",11)) return true},

    passiveGeneration(){ if (hasUpgrade("iob",11)) return true},

    upgrades: {
        11: {
            title: "Book Reader",
            description: "Double your book gain",
            cost: new Decimal(10),
            unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true
            
        },

        12:{
            title:"Book mineshaft",
            description:"Book increase your portal fragment gain",
            cost: new Decimal(50),
            unlocked(){ return hasUpgrade("b",11)},
            effect() {
                eff = player[this.layer].points.add(1).pow(0.25)
                if (hasUpgrade("b", 15)) eff = eff.times(upgradeEffect("b", 15))
                
                return eff    
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        
        13:{
            title:"Adventuring the Island",
            description:"Book devide the cost of Island of book",
            cost: new Decimal(300),
            unlocked(){ return hasUpgrade("b",12)},
            effect() {
                return player[this.layer].points.add(1).pow(0.13)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },

        14:{
            title:"Island inflation",
            description:"Unlock more upgrade in Island of Book",
            cost: new Decimal(10000),
            unlocked(){ return hasUpgrade("b",13)},
            
        }, 
        
        15:{
            title:"Thinker",
            description:"Book make “Book mineshaft” stronger",
            cost: new Decimal(1000),
            unlocked(){ return hasUpgrade("b",13)},
            effect() {
                return player[this.layer].points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            
        },

    },

    buyables: {
        11: {
            title() {return "Book-Worm"},
            cost(x) { return new Decimal(100).times(x-100).times(x^0.1) },
            display() { return "Every Book-Worm multiplies book gain by 1.2 plus and extra 1<br>Currently: " + format(tmp.b.buyables[11].effect) + "<br>bought:" + format(getBuyableAmount("b", 11)) + "<br> Cost: " + format(this.cost(getBuyableAmount("b", 11))) + " book"},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(){
                eff = new Decimal(1)
                eff = eff.add(getBuyableAmount("b", 11)*1.2)
                return eff}
        },
    },
 
    tabFormat: {
        "Upgrades": {
                content: [
                    "main-display",
                    ["prestige-button", "", function (){ return hasAchievement("ac",12) ? {'display': 'none'} : {}}],
                    ["display-text",
                                    function(){
                                            if (player.shiftAlias) return "Your best Book is " + format(player.b.best)
                                            if (hasAchievement("ac",12)) {return "You are gaining " + format(tmp.b.getResetGain) + " Book per second"}}],
           
                "blank", 
                ["upgrades", [1,2,3,4,5,6,7]],
            ]       
    
        },

        "Buyables":{
            content:[
                "main-display",
                "blank",
                "buyables",

            ]
        }
    }
    
        
       
})

                                               