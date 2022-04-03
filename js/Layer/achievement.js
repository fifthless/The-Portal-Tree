
addLayer("ac", {
    name: "Achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "♾️", // This appears on the layer's node. Default is the id with the first letter capitalized
    color: "#99ccaa",
    glowColor: "#99ccaa",
    shouldNotify() { 
        return true
    },
    resource() {
        return "Done achievement"
    }, 
    row: "side",
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Achievements")
    },
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    achievementPopups: true,
    
    achievements : {
                11: {
                name: "Fragment seeker",
                done() {return hasUpgrade("p", 11)}, // This one is a freebie
                goalTooltip: "Buy upgrade Fragment Collector", // Shows when achievement is not completed
                doneTooltip: "Buy upgrade Fragment collector", // Showed when the achievement is completed
                onComplete() {
                        player[this.layer].points = player[this.layer].points.add(1);
                        },
                },
                
                12: {
                        name: "Fragment seeker",
                        done() {return hasUpgrade("p", 13)}, // This one is a freebie
                        goalTooltip: "Buy upgrade Portal minshaft and Fragment mineshaft", // Shows when achievement is not completed
                        doneTooltip: "Buy upgrade Portal minshaft and Fragment mineshaft", // Showed when the achievement is completed
                        onComplete() {
                                player[this.layer].points = player[this.layer].points.add(1);
                                },
                        },

                13: {
                name: "Door To Nowhere",
                done() {return hasUpgrade("p", 14)}, // This one is a freebie
                goalTooltip: "Buy upgrade 11 in P.", // Shows when achievement is not completed
                doneTooltip: "Buy upgrade ", // Showed when the achievement is completed
                onComplete() {
                        player[this.layer].points = player[this.layer].points.add(1);
                        },
                },
        }
})
