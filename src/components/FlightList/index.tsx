import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import FlightCard from '../cards/FlightCard'

const FlightList = ({ data }: { data: Array<Flight> }) => {
    const renderItem = useCallback(({ item }: { item: Flight }) => <FlightCard item={item} />, []);
    const seperatorItem = useCallback(() => <View style={styles.seperator}></View>, []);

    return (
        <FlatList
            data={data}
            contentContainerStyle={styles.contentContainerStyle}
            ItemSeparatorComponent={seperatorItem}
            keyExtractor={(item) => `${item.id}`}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
        />
    )
}

export default FlightList

const styles = StyleSheet.create({
    contentContainerStyle: { paddingHorizontal: 24, paddingVertical: 8 },
    seperator: { height: 24 },
});