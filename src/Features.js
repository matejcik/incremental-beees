const Feature = {
    level: 1,
    visibleSince: 0,
    baseCost: 10,
    baseValue: 10,

    upgradeFactor: 1.1,

    extend(obj) {
        Object.setPrototypeOf(obj, this)
        return obj
    },

    upgradeCost(n) {
        return this.baseCost * Math.pow(this.upgradeFactor, this.level + n)
    },

    upgrade() {
        this.level++
    },

    reset() {
        this.level = 1
    },

    valueOf() {
        return this.baseValue + this.level - 1
    }
}

const Speed = Feature.extend({
    name: "Collection speed",
    label: "Spend less time on each flower",
})

const Capacity = Feature.extend({
    name: "Carrying capacity",
    label: "Bring home more nectar",
})

const Endurance = Feature.extend({
    name: "Endurance",
    label: "Visit more flowers",
})

const Pasture = Feature.extend({

})
