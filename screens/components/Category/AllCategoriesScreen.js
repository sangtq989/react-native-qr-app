import React from 'react';
import {
    FlatList,
    Text,
    View,
    Image,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';
import styles from './styles';

import global from '../../../Global'

export default class AllCategoriesScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    goToDetail(idCate, nameCate) {
        this.props.navigation.navigate('Detail', { id: idCate, name: nameCate });
    }   

    renderCategory = ({ item }) => (
        <TouchableOpacity onPress={() => this.goToDetail(item.id, item.category_name)}>
            <View style={styles.outerContainer} >
                <View style={styles.categoriesItemContainer}>
                    <Image style={styles.categoriesPhoto} source={{ uri: global.imgDirectory + "categories/" + item.cate_thumbnail }} />
                    <Text style={styles.categoriesName}>{item.category_name}</Text>
                    <Text style={styles.categoriesInfo}>{item.dishes_count} dishes</Text>
                </View>
            </View>
        </TouchableOpacity>

    );

    render() {
        const allcate = this.props.navigation.state.params.allCate
        console.log(allcate)
        return (
            <View>
                <FlatList
                    data={allcate}
                    renderItem={this.renderCategory}
                    keyExtractor={item => `${item.id}`}
                />
            </View>
        )
    }
}
