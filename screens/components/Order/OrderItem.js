import React, { Component } from 'react'
import {
    Text,
    StyleSheet,
    View,
    Dimensions,
    Animated,
    TouchableHighlight
} from 'react-native';



const { height, width } = Dimensions.get('window')

export default class OrderItem extends Component {
   

    constructor(props) {
        super(props);
        this.anime = {
            height: new Animated.Value(0),
            expanded: false,
            contentHeight: 0,
        }
        this._initContentHeight = this._initContentHeight.bind(this);
        this.toggle = this.toggle.bind(this);

        this.anime.expanded = props.expanded;
    }

    _initContentHeight(evt) {
        if (this.anime.contentHeight > 0) return;
        this.anime.contentHeight = evt.nativeEvent.layout.height;
        this.anime.height.setValue(this.anime.expanded ? this._getMaxValue() : this._getMinValue());
    }

    _getMaxValue() { return this.anime.contentHeight };
    _getMinValue() { return 0 };

    toggle() {
        Animated.timing(this.anime.height, {
            toValue: this.anime.expanded ? this._getMinValue() : this._getMaxValue(),
            duration: 300,
        }).start();
        this.anime.expanded = !this.anime.expanded;
    }

    render() {
        return (
            <View style={styles.titleContainer}>
                <View style={styles.title}>
                    <TouchableHighlight onPress={this.toggle}>
                        <Text>{this.props.title}</Text>
                    </TouchableHighlight>
                </View>

                <Animated.View style={[styles.content, { height: 100 }]} onLayout={this._initContentHeight}>
                    {this.props.children}
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    titleContainer: {
        backgroundColor: 'gray',
        width: width,

    },
    title:{
        height:50
    }
})
