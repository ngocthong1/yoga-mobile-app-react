// screens/HomeScreen.js
import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { database } from "../firebaseConfig";

export default function HomeScreen({ navigation }) {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
     // Cập nhật tùy chọn header khi HomeScreen được render
     navigation.setOptions({
      title: 'Class List', // Thay đổi tiêu đề của header
      headerStyle: {
        backgroundColor: '#E8A87C', // Thay đổi màu nền của header
      },
      headerTintColor: '#fff', // Thay đổi màu của tiêu đề
      headerTitleAlign: 'center', // Căn giữa tiêu đề trong header
    });
    const classRef = ref(database, "classes/");
    onValue(classRef, (snapshot) => {
      const data = snapshot.val();
      const classList = data
        ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
        : [];
      setClasses(classList);
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={classes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.classItem}>
            <Text style={styles.teacherText}>{item.teacher}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("DetailScreen", { classId: item.id })}
              style={styles.moreButton}
            >
              <Text style={styles.moreButtonText}>More</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f9",
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  classItem: {
    backgroundColor: "#8EC6C5",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5, // Android shadow effect
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  teacherText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  moreButton: {
    backgroundColor: "#D99268",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  moreButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
