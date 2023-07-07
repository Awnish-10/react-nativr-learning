import {
    FlatList,
    Image,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React, {useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const [data, setData] = useState([]);
    const navigation = useNavigation()
// console.log("data",data);
    const getApiData = () => {
        fetch(`https://dummyjson.com/products?skip=0&limit=10`)
            .then(res => res.json())
            .then(json => {
                setData([...data, ...json.products]);
            })
            .catch(error => {
                console.log('Error:', error);
            });
    };
    // console.log('data from state:', data);
    useEffect(() => {
        getApiData();
    }, []);

    const keyExtractor = key => `${key.id}`;

    const renderItem = ({ item, index }) => {
        // console.log('item.thumbnail',item.thumbnail);
        return (
            <Pressable onPress={() => navigation.navigate('ProductDetail', { productId: item.id })} style={styles.flatStyle}>
                <Image style={styles.imgStyle} source={{ uri: item.thumbnail }} />
                <View style={styles.footerStyle}>
                    <Text style={styles.textStyle}>{item.brand}</Text>
                    <Text style={styles.textStyle}>{item.price}$</Text>
                </View>
                <Text>{item.description}</Text>
            </Pressable>
        );
    };
    const itemSeparatorComponent = () => {
        return <View style={{ height: 20 }} />;
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                ItemSeparatorComponent={itemSeparatorComponent}
            />
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    flatStyle: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 2,
        backgroundColor: 'white',
        margin: 2,
        borderRadius: 8,
        padding: 8,
    },
    imgStyle: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    footerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    textStyle: {
        fontSize: 16,
        fontWeight: '600',
    },
});