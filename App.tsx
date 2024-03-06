import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  ImageBackground,
  Modal,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { API_ENDPOINT } from './src/constants/api';
import FlightList from './src/components/FlightList';


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Array<Flight>>([]);
  const [result, setResult] = useState<Array<Flight>>([]);
  const [airlines, setAirlines] = useState<Array<string>>([]);
  const [sortOrder, setSortOrder] = useState<string>("");
  const [showSortModal, setShowSortModal] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);

  useEffect(() => {
    fetch(API_ENDPOINT).then(resp => resp.json()).then(res => {
      if (Array.isArray(res)) {
        setResult(res);
        setData(res);
        setAirlines(getUniqueAirlines(res));
        setIsLoading(false);
      } else {
        Alert.alert("Data Received in Incorrect Format");
      }
    }).catch((e) => {
      Alert.alert("An error occured. Try again later!");
    })
  }, []);

  const getUniqueAirlines = (arr: Array<Flight>) => [...new Set(arr.map(flight => flight.airline))];

  const sortFlights = (arr: Array<Flight>, sortOrder: string) => {
    if (sortOrder == "Price (Asc)")
      return arr.sort((a, b) => a.price - b.price);
    else if (sortOrder == "Price (Desc)")
      return arr.sort((a, b) => b.price - a.price);
    return arr;
  }

  const changeSortOrder = (newSortOrder: string) => {
    setSortOrder(newSortOrder);
    setShowSortModal(false);
    setData(sortFlights(data, newSortOrder));
  }

  const filterAirlineFlights = (arr: Array<Flight>, airline: string) => {
    return arr.filter(i => i.airline === airline);
  }

  const changeFilter = (newFilter: string) => {
    if (newFilter === "") {
      setFilter("");
      setShowFilterModal(false);
      setData(sortFlights(result, sortOrder));
    } else {
      setFilter(newFilter);
      setShowFilterModal(false);
      setData(sortFlights(filterAirlineFlights(result, newFilter), sortOrder));
    }
  }

  const closeSortModal = () => setShowSortModal(false);
  const openSortModal = () => setShowSortModal(true);
  const closeFilterModal = () => setShowFilterModal(false);
  const openFilterModal = () => setShowFilterModal(true);

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={"#fff"}
      />
      {/* HEADER STARTS HERE */}
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>JetSetGo</Text>
          <View style={styles.headerRightContainer}>
            <TouchableOpacity onPress={openSortModal} style={styles.headerIconContainer}>
              <Icon name="sort" color={"#121212"} size={24} />
            </TouchableOpacity>
            <TouchableOpacity onPress={openFilterModal} style={styles.headerIconContainer}>
              <Icon name="filter-alt" color={"#121212"} size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* HEADER ENDS HERE */}

      {/* MAIN CONTENT STARTS HERE */}
      {isLoading ? <View style={styles.center}>
        <ActivityIndicator size={"large"} />
      </View> :
        <View style={styles.flex}>
          <FlightList data={data} />
        </View>
      }
      {/* MAIN CONTENT ENDS HERE */}

      {/* SORT MODAL STARTS HERE */}
      <Modal
        visible={showSortModal}
        transparent
        statusBarTranslucent
      >
        <Pressable onPress={closeSortModal} style={styles.modal}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.optionContainer} onPress={() => changeSortOrder("Price (Asc)")}>
              <Text style={styles.optionText}>Price (Asc)</Text>
              <Icon name={sortOrder === "Price (Asc)" ? "radio-button-on" : "radio-button-off"} size={24} color={"#000"} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionContainer} onPress={() => changeSortOrder("Price (Desc)")}>
              <Text style={styles.optionText}>Price (Desc)</Text>
              <Icon name={sortOrder === "Price (Desc)" ? "radio-button-on" : "radio-button-off"} size={24} color={"#000"} />
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
      {/* SORT MODAL ENDS HERE */}

      {/* FILTER MODAL STARTS HERE */}
      <Modal
        visible={showFilterModal}
        transparent
        statusBarTranslucent
      >
        <Pressable onPress={closeFilterModal} style={styles.modal}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Filter By Airline</Text>
            {airlines.map((airline) => <TouchableOpacity key={airline} activeOpacity={0.8} style={styles.optionContainer} onPress={() => changeFilter(airline)}>
              <Text style={styles.optionText}>{airline}</Text>
              <Icon name={filter === airline ? "radio-button-on" : "radio-button-off"} size={24} color={"#000"} />
            </TouchableOpacity>)}
            <TouchableOpacity activeOpacity={0.8} style={styles.clearBtnContainer} onPress={() => changeFilter("")}>
              <Text style={styles.clearBtnText}>Remove Filter</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
      {/* FILTER MODAL ENDS HERE */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  header: { padding: 24, backgroundColor: "#fff" },
  headerContainer: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  headerTitle: { fontSize: 24, color: "#000", fontWeight: "bold" },
  headerRightContainer: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingLeft: 8 },
  headerIconContainer: { paddingHorizontal: 8, paddingVertical: 12 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  flex: { flex: 1 },
  modal: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#0007" },
  modalContainer: { padding: 20, width: "80%", borderRadius: 20, backgroundColor: "#fff" },
  modalTitle: { fontSize: 16, color: "#000", fontWeight: "bold", marginBottom: 16 },
  optionContainer: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 8 },
  optionText: { fontSize: 16, color: "#000" },
  clearBtnContainer: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 8 },
  clearBtnText: { borderWidth: 1, borderColor: "#000", padding: 8, borderRadius: 4, fontSize: 16, color: "#000" },
});

export default App;
