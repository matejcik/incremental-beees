import React from 'react'
import njsx from 'njsx'
import { StyleSheet, View, Image } from 'njsx-react-native'

class BeeFlight extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPost: 0,
            width: 0,
        }
    }

    onLayout(e) {
        let { x, y, width, height } = e.nativeEvent.layout
        this.setState(state => { return { width }})
    }

    render() {
        let beeOffset = 1
        let topRow = false
        if (this.props.flying && this.state.width) {
            topRow = this.state.currentPost <= this.props.posts
            currentRowPost = topRow ? this.state.currentPost : this.state.currentPost - this.props.posts
            let w = this.state.width
            beeOffset = (w / (this.props.posts + 1)) * currentRowPost

            setTimeout(
                () => this.setState(state => { return { currentPost: (state.currentPost + 1) % (this.props.posts * 2) } }),
                500,
            )
        } else {
            beeOffset = 0
        }

        let bee = Image({
            source: require("./bee.jpg"),
            style: { height: 50, width: 50, },
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
            View(
                { style: { ...beeLine, paddingLeft: beeOffset, backgroundColor: "#f00" }},
                this.state.topRow && bee,
            ),
            View(
                { style: { ...beeLine, paddingLeft: beeOffset, backgroundColor: "#0f0" }},
                !this.state.topRow && bee,
            ),
        )()
    }
}

export default njsx(BeeFlight)

const beeLine = {
    flex: 1,
    //flexDirection: "row",
    justifyContent: "flex-start",
}
