import njsx from 'njsx'
import React from 'react'
import { Svg, Polygon } from 'react-native-svg'

const nSvg = njsx(Svg)
const nPolygon = njsx(Polygon)

class HexButton extends React.Component {
    render() {
        return nSvg(
            { style: {
                width: 30,
                height: 38,
            }},
            nPolygon({
                fill: "#f4ce42",
                stroke: "#ffe83f",
                strokeWidth: 5,
            
                points: [
                    15, 3,
                    2, 10,
                    2, 25,
                    15, 33,
                    28, 26,
                    28, 11,
                ]
            })
        )()
    }
}

export default njsx(HexButton)
