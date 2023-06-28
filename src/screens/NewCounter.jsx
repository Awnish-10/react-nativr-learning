import React, { useEffect } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { changeCount } from '../redux/action/counts';
import { getPageList } from '../redux/action/pageList';

const NewCounter = () => {
    const { count } = useSelector(state => state.count);
    const { pageList } = useSelector(state => state.pageList);
    console.log("pageList", pageList);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPageList());
    }, [])

    const decrementCount = () => {
        let newCount = count - 1;
        dispatch(changeCount(newCount));
    };

    const incrementCount = () => {
        let newCount = count + 1;
        dispatch(changeCount(newCount));
    };

    return (
        <View style={styles.container}>
            <Button title="increment" onPress={incrementCount} />
            <Text>{count}</Text>
            <Button title="decrement" onPress={decrementCount} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default NewCounter;
