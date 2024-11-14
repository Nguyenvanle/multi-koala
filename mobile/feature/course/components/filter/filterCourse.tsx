import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { text } from "@/constants/Styles";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useCourse } from "../../hooks/useCourse";

// Định nghĩa kiểu dữ liệu
interface FilterOption {
  id: string;
  label: string;
}

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApplyFilters: (selectedTypes: string[], selectedFields: string[]) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onApplyFilters,
}) => {
  const { course, errorMessage, loading } = useCourse();
  const [types, setTypes] = useState<string[]>([]);
  const [fields, setFields] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
  const [selectedFields, setSelectedFields] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (course) {
      const uniqueTypes = new Set<string>();
      const uniqueFields = new Set<string>();

      course.forEach((item) => {
        // Kiểm tra nếu types là mảng
        if (Array.isArray(item.types)) {
          item.types.forEach((type) => uniqueTypes.add(type.typeName)); // Thêm từng typeName
        }

        // Kiểm tra nếu fields là mảng
        if (Array.isArray(item.fields)) {
          item.fields.forEach((field) => uniqueFields.add(field.fieldName)); // Thêm từng fieldName
        }
      });

      setTypes(Array.from(uniqueTypes)); // Chuyển đổi Set thành mảng
      setFields(Array.from(uniqueFields)); // Chuyển đổi Set thành mảng
    }
  }, [course]);

  const toggleSelection = (
    id: string,
    setSelected: React.Dispatch<React.SetStateAction<Set<string>>>
  ) => {
    setSelected((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(id)) {
        newSelected.delete(id); // Bỏ chọn nếu đã chọn
      } else {
        newSelected.add(id); // Chọn nếu chưa chọn
      }
      return newSelected;
    });
  };

  const resetFilters = () => {
    setSelectedTypes(new Set());
    setSelectedFields(new Set());
  };

  const handleApply = () => {
    onApplyFilters(Array.from(selectedTypes), Array.from(selectedFields)); // Chuyển đổi Set thành mảng
    onClose();
  };

  const FilterSection = ({
    title,
    options,
    selectedItems,
    onToggle,
  }: {
    title: string;
    options: FilterOption[];
    selectedItems: Set<string>;
    onToggle: (id: string) => void;
  }) => (
    <View style={styles.section}>
      <Text style={[text.h3, styles.sectionTitle]}>{title}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionButton,
              selectedItems.has(option.id) && styles.selectedOption,
            ]}
            onPress={() => onToggle(option.id)}
          >
            {selectedItems.has(option.id) && (
              <AntDesign
                name="check"
                size={16}
                color={Colors.white}
                style={styles.checkIcon}
              />
            )}
            <Text
              style={[
                text.p,
                selectedItems.has(option.id)
                  ? styles.selectedOptionText
                  : styles.optionText,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={[text.h2, styles.title]}>Filter Course</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={Colors.dark} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollContainer}>
            <FilterSection
              title="Types"
              options={types.map((type) => ({ id: type, label: type }))} // Giả định rằng bạn có thể tạo FilterOption từ types
              selectedItems={selectedTypes}
              onToggle={(id) => toggleSelection(id, setSelectedTypes)}
            />

            <FilterSection
              title="Fields"
              options={fields.map((field) => ({ id: field, label: field }))} // Giả định rằng bạn có thể tạo FilterOption từ fields
              selectedItems={selectedFields}
              onToggle={(id) => toggleSelection(id, setSelectedFields)}
            />
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
              <Text style={[text.p, styles.resetButtonText]}>Reset</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={[text.p, styles.applyButtonText]}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
    height: "75%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    color: Colors.teal_dark,
  },
  scrollContainer: {
    flex: 1,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    marginBottom: 16,
    color: Colors.dark,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.grey,
    backgroundColor: Colors.white,
  },
  selectedOption: {
    backgroundColor: Colors.teal_dark,
    borderColor: Colors.teal_dark,
  },
  optionText: {
    color: Colors.dark_grey,
  },
  selectedOptionText: {
    color: Colors.white,
  },
  checkIcon: {
    marginRight: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    gap: 16,
  },
  resetButton: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    backgroundColor: Colors.background,
    alignItems: "center",
  },
  resetButtonText: {
    color: Colors.dark,
  },
  applyButton: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    backgroundColor: Colors.teal_dark,
    alignItems: "center",
  },
  applyButtonText: {
    color: Colors.white,
  },
});

export default FilterModal;
