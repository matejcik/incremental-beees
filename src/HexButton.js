import njsx from 'njsx'
import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'njsx-react-native'
import { Svg, Polygon } from 'react-native-svg'

const nSvg = njsx(Svg)
const nPolygon = njsx(Polygon)

function hexagon_points(radius, outerHex) {
    let height = radius * 2
    let width = radius * Math.sqrt(3)

    let mid = width / 2
    let upper = radius / 2
    let lower = height - upper

    let points = [
        mid, 0,
        width, upper,
        width, lower,
        mid, height,
        0, lower,
        0, upper,
    ]

    if (outerHex) {
        let offsetX = (outerHex.width - width) / 2
        let offsetY = (outerHex.height - height) / 2
        let arr = [offsetX, offsetY]
        points = points.map((e, i) => e + arr[i % 2])
    }

    return { width, height, points }
}

const BUTTON_HEIGHT = 28 // should be a little less than 2 * BIGGER_HEX radius
const BIGGER_HEX = hexagon_points(26)
const SMALLER_HEX = hexagon_points(17, BIGGER_HEX)

const COLORS_ACTIVE = {
    outer: "#ff9e2c",
    inner: "#ffe839",
    text: "#864800",
}
const COLORS_INACTIVE = {
    outer: "#dda767",
    inner: "#e0d470",
    text: "#dda767",
}

class HexButton extends React.Component {
    render() {
        let colors = this.props.disabled ? COLORS_INACTIVE : COLORS_ACTIVE
        let colorStyles = this.props.disabled ? inactiveStyles : activeStyles
        let hex = nSvg(
            { style: {
                width: BIGGER_HEX.width,
                height: BIGGER_HEX.height,
            }},
            nPolygon({
                fill: colors.outer,
                points: BIGGER_HEX.points,
            }),
            nPolygon({
                fill: colors.inner,
                points: SMALLER_HEX.points,
            }),
        )

        let view = View(styles.outerContainer)

        if (this.props.title) {
            let button = View(
                colorStyles.button,
                Text(colorStyles.buttonText, this.props.title),
            )
            view = view(button)
        }

        view = view(hex)
        return TouchableOpacity(
            view,
            { 
                disabled: this.props.disabled,
                onPress: this.props.onPress,
            },
        )()
    }
}

const generalStyles = {
    button: {
        borderWidth: 3,
        height: BUTTON_HEIGHT,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        paddingRight: 25,
        marginRight: -20,
        zIndex: -1,
    },
    buttonText: {
        fontWeight: "bold",
    },
}

const styles = StyleSheet.create({
    outerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
})

const activeStyles = StyleSheet.create({
    button: {
        ...generalStyles.button,
        borderColor: COLORS_ACTIVE.outer,
        backgroundColor: COLORS_ACTIVE.inner,
    },
    buttonText: {
        ...generalStyles.buttonText,
        color: COLORS_ACTIVE.text,
    },
})

const inactiveStyles = StyleSheet.create({
    button: {
        ...generalStyles.button,
        borderColor: COLORS_INACTIVE.outer,
        backgroundColor: COLORS_INACTIVE.inner,
    },
    buttonText: {
        ...generalStyles.buttonText,
        color: COLORS_INACTIVE.text,
    },
})

export default njsx(HexButton)
