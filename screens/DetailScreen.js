// screens/DetailScreen.js
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { database } from "../firebaseConfig";
import { ref, get } from "firebase/database";

export default function DetailScreen({ route, navigation }) {
  const { classId } = route.params;
  const [classDetail, setClassDetail] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      title: 'Class Detail', // Thay đổi tiêu đề của header
      headerStyle: {
        backgroundColor: '#E8A87C', // Thay đổi màu nền của header
      },
      headerTintColor: '#fff', // Thay đổi màu của tiêu đề
      headerTitleAlign: 'center', // Căn giữa tiêu đề trong header
    });
    const classRef = ref(database, `classes/${classId}`);
    get(classRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setClassDetail(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [classId]);

  if (!classDetail) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Teacher:</Text>
      <Text style={styles.info}>{classDetail.teacher}</Text>
      <Text style={styles.label}>Date:</Text>
      <Text style={styles.info}>{classDetail.date}</Text>
      <Text style={styles.label}>Comment:</Text>
      <Text style={styles.info}>{classDetail.comment}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  
  label: {
    fontSize: 18,
    fontWeight: "500",
    color: "#555",
    marginTop: 10,
  },
  info: {
    fontSize: 16,
    color: "#777",
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#8EC6C5",
    borderRadius: 5,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3, // For Android shadow effect
  },
});
