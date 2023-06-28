import { ActivityIndicator, Image, Pressable, Share, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const ProductDetail = ({ route }) => {
    const { productId } = route.params;
    const [productData, setProductData] = useState({});
    const [loading, setLoading] = useState(true)

    const getSingleProduct = async () => {
        try {
            const result = await axios
                .get(`https://dummyjson.com/products/${productId}`)
            const data = result.data
            setProductData(data);
            setLoading(false)
        } catch (error) {
            console.log('Error:', error);
        }
    };
    // console.log('data from state:', productData);
    useEffect(() => {
        getSingleProduct();
    }, []);

    const generateLink = async () => {
        try {
            const link = await dynamicLinks().buildShortLink({
                link: `https://reactnativelearning.page.link/4D6z?productId=${productId}`,
                domainUriPrefix: 'https://reactnativelearning.page.link',
                android: {
                    packageName: 'com.reactnativelearning',
                },
                ios: {
                    appStoreId: '1:235564744183:ios:ddb627bc21b4b2172782f2',
                    bundleId: 'org.reactjs.native.example.ReactNativeLearnings',
                },
            }, dynamicLinks.ShortLinkType.DEFAULT)
            console.log('link:', link)
            return link
        } catch (error) {
            console.log('Generating Link Error:', error)
        }
    }

    const shareProduct = async () => {
        const getLink = await generateLink()
        try {
            Share.share({
                message: getLink,
            });
        } catch (error) {
            console.log('Sharing Error:', error)
        }
    }


    return (
        <>
            {
                loading ? <ActivityIndicator /> : <View style={styles.container}>
                    <View style={styles.flatStyle}>
                        <Image style={styles.imgStyle} source={{ uri: productData?.thumbnail }} />
                        <View style={styles.bodyStyle}>
                            <View style={styles.innerBox}>
                                <Text style={styles.textTitle}>{productData?.brand}</Text>
                                <Text style={styles.textStyle}>{productData?.price}$</Text>
                            </View>
                            <Text>{productData?.description}</Text>
                        </View>
                        <View style={styles.footer}>
                            <Pressable onPress={shareProduct} style={styles.btn}>
                                <Text style={styles.btnTitle}>
                                    Share Product
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            }

        </>
    );
};

export default ProductDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    imgStyle: {
        width: '100%',
        height: 250,
        resizeMode: 'cover'
    },
    bodyStyle: {
        justifyContent: 'space-between',
        marginVertical: 10,
        marginHorizontal: 20
    },
    innerBox: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textTitle: {
        fontSize: 20,
        fontWeight: '600',
    },
    textStyle: {
        fontSize: 16,
        fontWeight: '600',
    },
    footer: {
        marginVertical: 20,
        marginHorizontal: 20
    },
    btn: {
        backgroundColor: '#797ee630',
        padding: 20,
        borderRadius: 10
    },
    btnTitle: {
        color: '#797ee6',
        fontSize: 20,
        textAlign: 'center'
    }
});