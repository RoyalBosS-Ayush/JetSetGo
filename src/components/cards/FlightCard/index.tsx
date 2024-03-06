import moment from 'moment';
import React, { useCallback, useState } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


function FlightCard({ item }: { item: Flight }): React.JSX.Element {
    const [showDetails, setShowDetails] = useState(false)
    const toggleDetails = useCallback(() => setShowDetails(prev => !prev), []);

    return (
        <Pressable onPress={toggleDetails} style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text numberOfLines={1} style={styles.subHeading}>{item.airline}</Text>
                    <Text style={styles.title}>{item.aircraft} [{item.flightNumber}] - Rs{item.price}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.8} style={styles.expandBtn} onPress={toggleDetails}>
                    <Icon name={showDetails ? "keyboard-arrow-down" : "keyboard-arrow-right"} size={24} color={"#000"} />
                </TouchableOpacity>
            </View>

            <View style={styles.wrapperContainer}>
                <View>
                    <Text numberOfLines={1} style={styles.subHeading}>Origin</Text>
                    <Text numberOfLines={1} style={styles.heading}>{item.origin}</Text>
                </View>
                <View>
                    <Text numberOfLines={1} style={styles.subHeading}>Destination</Text>
                    <Text numberOfLines={1} style={styles.heading}>{item.destination}</Text>
                </View>
            </View>
            <View style={styles.wrapperContainer}>
                <View>
                    <Text numberOfLines={1} style={styles.subHeading}>Arrival Time</Text>
                    <Text numberOfLines={1} style={styles.heading}>{moment(item.arrivalTime).format("DD/MM/YY HH:mm")}</Text>
                </View>
                <View>
                    <Text numberOfLines={1} style={styles.subHeading}>Departure Time</Text>
                    <Text numberOfLines={1} style={styles.heading}>{moment(item.departureTime).format("DD/MM/YY HH:mm")}</Text>
                </View>
                <View>
                    <Text numberOfLines={1} style={styles.subHeading}>Duration</Text>
                    <Text numberOfLines={1} style={styles.heading}>{item.duration}</Text>
                </View>
            </View>

            {showDetails ? <>
                <View style={styles.wrapperContainer}>
                    <View>
                        <Text numberOfLines={1} style={styles.subHeading}>Flight Number</Text>
                        <Text numberOfLines={1} style={styles.heading}>{item.flightNumber}</Text>
                    </View>

                    <View>
                        <Text numberOfLines={1} style={styles.subHeading}>Gate</Text>
                        <Text numberOfLines={1} style={styles.heading}>{item.gate}</Text>
                    </View>

                    <View>
                        <Text numberOfLines={1} style={styles.subHeading}>Seats Available</Text>
                        <Text numberOfLines={1} style={styles.heading}>{item.seatsAvailable}</Text>
                    </View>
                </View>
            </> : null}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: { backgroundColor: "#fff", elevation: 3, padding: 16, borderRadius: 16 },
    header: { flexDirection: "row", alignItems: "flex-start", marginBottom: 16 },
    title: { fontSize: 24, color: "#000", fontWeight: "bold" },
    subHeading: { fontSize: 17, color: "#9D9EAB" },
    heading: { fontSize: 20, color: "#000" },
    wrapperContainer: { flexWrap: "wrap", flexDirection: "row", alignItems: "center", gap: 16, marginBottom: 8 },
    expandBtn: { backgroundColor: "#fff", elevation: 1, borderRadius: 9999, height: 32, width: 32, alignItems: "center", justifyContent: "center" },
});

export default FlightCard;
