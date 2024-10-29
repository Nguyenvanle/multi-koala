import React, { useEffect, useState } from "react";
import { Modal, View, Text, Button, FlatList, StyleSheet } from "react-native";
import { useFilterCourse } from "../../hooks/useFilter";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose }) => {
  const { filterCourse, errorFilterMessage, loadingFilter } = useFilterCourse();
  const [types, setTypes] = useState<string[]>([]); // Sửa đổi ở đây
  const [fields, setFields] = useState<string[]>([]); // Sửa đổi ở đây

  useEffect(() => {
    if (filterCourse) {
      const uniqueTypes = [
        ...new Set(filterCourse.map((item) => item.types.typeName)),
      ]; // Giả sử mỗi course có thuộc tính typeName
      const uniqueFields = [
        ...new Set(filterCourse.map((item) => item.fields.fieldName)),
      ]; // Giả sử mỗi course có thuộc tính fieldName

      setTypes(uniqueTypes);
      setFields(uniqueFields);
    }
  }, [filterCourse]);

  if (loadingFilter) return <Text>Loading...</Text>;
  if (errorFilterMessage) return <Text>{errorFilterMessage}</Text>;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Button title="Close" onPress={onClose} />
          <Text style={styles.title}>Filter Courses</Text>
          <Text style={styles.subtitle}>Types</Text>
          <FlatList
            data={types}
            renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
            keyExtractor={(item, index) => index.toString()}
          />
          <Text style={styles.subtitle}>Fields</Text>
          <FlatList
            data={fields}
            renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 10,
  },
  item: {
    fontSize: 16,
    paddingVertical: 5,
  },
});

export default FilterModal;
