import React from 'react'
import njsx from 'njsx'
import { StyleSheet, Text, View, Button, Image } from 'njsx-react-native'
import BeeFlight from './BeeFlight'
import HexButton from './HexButton'

const STARTING_SPEED = 10
const STARTING_CAPACITY = 10

function randInt(min, max) {
  return Math.round(Math.random() * (max - min + 1)) + min
}

class BeeProperty {
  constructor(name, label, initialValue, initialUpgradeCost) {
    this.name = name
    this.label = label
    this.value = initialValue
    this.upgradeCost = initialUpgradeCost
  }

  upgrade() {
    this.value += 1
    this.upgradeCost = Math.round(1.1 * this.value)
  }
}

class jsPropertyLine extends React.Component {
  canBuy() {
    return this.props.nectar >= this.props.property.upgradeCost
  }

  render() {
    let p = this.props.property
    return View(
      { style: { flex: 1 } },
      Text(styles.header, p.label),
      View(styles.propertyLine,
        Text(`Current: ${p.value}`),
        Text(`Upgrade cost: ${p.upgradeCost}`),
        Button({
          title: "+",
          onPress: () => this.props.onBuy(p),
          disabled: !this.canBuy(),
        }),
        HexButton({}),
      )
    )()
  }
}
const PropertyLine = njsx(jsPropertyLine)

class App extends React.Component {
  constructor(props) {
    super(props)

    this.timerId = null
    this.state = {
      isCollecting: false,
      nectar: 0,
      totalCollected: 0,

      carrying: 0,
      level: 0,
   
      speed: new BeeProperty("speed", "Collection speed", STARTING_SPEED, 10),
      capacity: new BeeProperty("capacity", "Carrying capacity", STARTING_CAPACITY, 10),

      postCapacity: {
        min: 0,
        max: 5,
      }
    }
  }

  addNectar(howMuch) {
    this.setState(state => ({
      nectar: state.nectar + howMuch, 
      totalCollected: state.totalCollected + howMuch
    }))
  }

  collectNectar() {
    this.setState(state => ({ isCollecting: true }))
    let collected = 0
    let speed = this.state.speed.value
    let postsRemaining = speed
    let onePostTime = 10000 / speed
    let capacity = this.state.capacity.value

    let collectOnePost = () => {
      collected += randInt(this.state.postCapacity.min, this.state.postCapacity.max)
      collected = Math.min(collected, capacity)
      this.setState(state => ({ carrying: collected }))
      postsRemaining--

      if (postsRemaining && collected < capacity) setTimeout(collectOnePost, onePostTime)
      else {
        this.addNectar(collected)
        this.setState(state => { return {
          isCollecting: false,
          carrying: 0,
        }})
      }
    }

    this.setState(state => ({ isCollecting: true }))
    setTimeout(collectOnePost, onePostTime)
  }

  onBuy(what) {
    if (what.upgradeCost <= this.state.nectar) {
      this.state.nectar -= what.upgradeCost
      what.upgrade()
      this.setState(() => {
        let w = {}
        w[what.name] = what
        return w
      })
    }
  }

  upgradeField()
  {
    this.setState(state => ({
      postCapacity: {
        min: 10,
        max: 50
      },
      speed: new BeeProperty("speed", "Collecting speed", STARTING_SPEED, 10)

    }))
  }

  render() {
    return View(styles.container,
      BeeFlight({
        flying: this.state.isCollecting,
        posts: this.state.speed.value,
      }),
      Text(`Bee is carrying ${this.state.carrying} nectar.`),
      Button({
        title: "Collect nectar",
        disabled: this.state.isCollecting,
        onPress: ()=>this.collectNectar(),
      }),
      Text(`Nectar: ${this.state.nectar}`),
      Text(`Collecting: ${this.state.isCollecting}`),

      PropertyLine({
        property: this.state.speed,
        nectar: this.state.nectar,
        onBuy: () => this.onBuy(this.state.speed),
      }),

      PropertyLine({
        property: this.state.capacity,
        nectar: this.state.nectar,
        onBuy: () => this.onBuy(this.state.capacity),
      }),

      this.state.totalCollected >= 200 && [
        Button({
          title: "To greener pastures! (200)",
          onPress: () => null,
          disabled: true,
        }),
        Button({ title: "Auto-Collect (1000)", onPress: () => null }),
      ]
    )()
  }
}

export default App


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  header: {
    fontWeight: "bold",
    fontSize: 16,
  },
  propertyLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
