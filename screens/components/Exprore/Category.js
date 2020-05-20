import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground
} from "react-native";



class Category extends Component {
    setNativeProps = (nativeProps) => {
        this._root.setNativeProps(nativeProps);
    }
    render() {
        return (
            <View ref={component => this._root = component} style={styles.container}>

                <ImageBackground source={this.props.imageUri}
                    style={{ flex: 1,  borderRadius: 10,overflow: 'hidden' }}
                >
                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'flex-end' }}>
                        <View style={{ height: '30%', width: '100%', backgroundColor: 'rgba(52, 52, 52, 0.8)', alignItems: 'center' }}>
                            <Text style={{ color: 'white', paddingTop: 10 }}>{this.props.name}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 7,
        height: 130, width: 130, marginHorizontal: 10,
        // elevation: 24,
        flex: 2,
         borderRadius: 10,
    }

})

export default Category
