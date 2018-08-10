import React from 'react'
import njsx from 'njsx'
import { Animated } from 'react-native'
import { StyleSheet, View, Image } from 'njsx-react-native'

const nAnimatedImage = njsx(Animated.Image)

class BeeFlight extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPost: 0,
            width: 0,
        }
        this.flightState = new Animated.Value(0)
    }

    startFlight() {
        Animated.sequence([
            Animated.timing(
                this.flightState,
                {
                    toValue: 1,
                    duration: 1000,
                }
            ),
            Animated.timing(
                this.flightState,
                {
                    toValue: 0,
                    duration: 1000,
                }
            ),
        ]).start()
    }

    onLayout(e) {
        let { width } = e.nativeEvent.layout
        this.setState(state => ({ width }))
    }

    componentDidUpdate(prevProps) {
        if (this.props.flying && !prevProps.flying) {
            this.startFlight()
        }
    }

    render() {
        const beeHeight = this.flightState.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 50],
        })
        let bee = nAnimatedImage({
            source: require("./assets/bee.jpg"),
            style: {
                position: "absolute",
                height: 50,
                width: 50,
                top: beeHeight,
            },
            resizeMode: "contain",
        })

        return View(
            {
                style: { ...this.props.style,
                    height: 100,
                    flexDirection: "column",
                    alignItems: "stretch",
                },
                onLayout: (e) => this.onLayout(e),
            },
            bee,
        )()
    }
}

export default njsx(BeeFlight)
