// UserProfile.tsx
import { Colors } from "@/src/constants/Colors";
import { text } from "@/src/constants/Styles";
import useUser from "@/src/feature/user/hooks/useUser";
import { UserBody } from "@/src/feature/user/types/user";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Dimensions,
  ActivityIndicator,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const UserProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const { loading, user, setUser, errorMessage, setErrorMessage, updateImage } =
    useUser();
  const [showRolePicker, setShowRolePicker] = useState<boolean>(false);
  const defaultRole =
    user.roles.length > 0 ? user.roles[0].roleName : "STUDENT";

  const getRoleLabel = (roles) => {
    if (roles.length > 0) {
      return roles[0].roleName; // Trả về tên vai trò đầu tiên
    }
    return "No role assigned"; // Trả về thông báo nếu không có vai trò
  };

  // Xử lý loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.teal_dark} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // Xử lý error state
  if (errorMessage) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Có lỗi xảy ra: {errorMessage}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => {
            setErrorMessage("");
            // Thêm hàm retry load data nếu cần
          }}
        >
          <Text style={styles.retryButtonText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Kiểm tra user null/undefined
  if (!user) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Không tìm thấy thông tin người dùng
        </Text>
      </View>
    );
  }

  const handleInputChange = (name: keyof UserBody, value: string) => {
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Thêm hàm formatDate để chuyển đổi định dạng ngày tháng
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      // Lưu trữ dạng ISO string trong state
      const isoDate = selectedDate.toISOString().split("T")[0];
      handleInputChange("userBirth", isoDate);
    }
  };

  const handleSave = () => {
    // Tại đây sẽ thêm logic để lưu thông tin vào backend
    setIsEditing(false);
  };

  const CustomInput = ({
    label,
    value,
    onChangeText,
    disabled = false,
    multiline = false,
  }: {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    disabled?: boolean;
    multiline?: boolean;
  }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          multiline && styles.multilineInput,
          disabled && styles.disabledInput,
        ]}
        value={value}
        onChangeText={onChangeText}
        editable={!disabled}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Ảnh đại diện */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: user.image?.imageUrl || "https://via.placeholder.com/160",
            }}
            style={styles.image}
          />
          {isEditing && (
            <TouchableOpacity style={styles.changeImageButton}>
              <Text style={styles.changeImageText}>Đổi ảnh</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.button, isEditing && styles.saveButton]}
            onPress={() => (isEditing ? handleSave() : setIsEditing(true))}
          >
            <Text style={styles.buttonText}>{isEditing ? "Save" : "Edit"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          {/* Họ và Tên */}
          <View style={styles.nameContainer}>
            <View style={styles.nameInputContainer}>
              <Text style={styles.label}>First name</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.disabledInput]}
                value={user.firstname || ""}
                onChangeText={(text) => handleInputChange("firstname", text)}
                editable={isEditing}
              />
            </View>
            <View style={styles.nameInputContainer}>
              <Text style={styles.label}>Last name</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.disabledInput]}
                value={user.lastname || ""}
                onChangeText={(text) => handleInputChange("lastname", text)}
                editable={isEditing}
              />
            </View>
          </View>

          {/* Email */}
          <CustomInput
            label="Email"
            value={user.email || ""}
            onChangeText={(text) => handleInputChange("email", text)}
            disabled={!isEditing}
          />

          {/* Vai trò */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Role</Text>
            <TouchableOpacity
              onPress={() => isEditing && setShowRolePicker(true)}
              style={[styles.input, !isEditing && styles.disabledInput]}
            >
              <Text style={[!isEditing && styles.disabledText]}>
                {user && user.roles && user.roles.length > 0
                  ? getRoleLabel(user.roles)
                  : defaultRole}
              </Text>
            </TouchableOpacity>
            {/* Modal cho iOS */}
            {Platform.OS === "ios" && showRolePicker && (
              <Modal
                transparent={true}
                visible={showRolePicker}
                animationType="fade"
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContent}>
                    <View style={styles.pickerHeader}>
                      <TouchableOpacity
                        onPress={() => setShowRolePicker(false)}
                        style={styles.pickerButton}
                      >
                        <Text style={styles.pickerButtonText}>Close</Text>
                      </TouchableOpacity>
                    </View>
                    <Picker
                      selectedValue={user?.roles[0]?.roleName || defaultRole} // Sử dụng vai trò đầu tiên hoặc giá trị mặc định
                      onValueChange={(value) => {
                        handleInputChange("roles", value); // Cập nhật giá trị khi chọn vai trò
                        setShowRolePicker(false);
                      }}
                    >
                      {user?.roles?.map((role, index) => (
                        <Picker.Item
                          key={index}
                          label={role.roleName}
                          value={role.roleName.toLowerCase()} // Đảm bảo giá trị là chữ thường
                        />
                      )) || (
                        <Picker.Item label="No roles available" value="" />
                      )}{" "}
                      {/* Thông báo nếu không có vai trò */}
                    </Picker>
                  </View>
                </View>
              </Modal>
            )}
          </View>

          {/* Ngày sinh */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Birthday</Text>
            <TouchableOpacity
              onPress={() => isEditing && setShowDatePicker(true)}
              style={[styles.input, !isEditing && styles.disabledInput]}
            >
              <Text style={styles.disabledText}>
                {formatDate(user.userBirth || "No update yet")}
              </Text>
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={new Date(user.userBirth)}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}

          {/* Quê quán */}
          <CustomInput
            label="Home town"
            value={user.userHometown || ""}
            onChangeText={(text) => handleInputChange("userHometown", text)}
            disabled={!isEditing}
          />

          {/* Giới thiệu */}
          <CustomInput
            label="Description"
            value={user.userBio || ""}
            onChangeText={(text) => handleInputChange("userBio", text)}
            disabled={!isEditing}
            multiline
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.teal_light,
    backgroundColor: Colors.teal_dark,
  },
  saveButton: {
    backgroundColor: Colors.super_teal_dark,
  },
  buttonText: {
    color: Colors.white,
  },
  content: {
    padding: 16,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 80,
  },
  changeImageButton: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  changeImageText: {
    color: "#007AFF",
    fontSize: 12,
  },
  formContainer: {
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
  },
  nameContainer: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  nameInputContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    ...text.large,
    fontWeight: "600",
    marginBottom: 4,
    color: Colors.teal_dark,
    marginHorizontal: 4,
  },
  input: {
    ...text.p,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 6,
    padding: 12,
    backgroundColor: Colors.white,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
  },
  disabledInput: {
    backgroundColor: Colors.white,
    color: Colors.dark_grey,
  },
  pickerContainer: {
    padding: 0,
  },
  picker: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e1e1e1",
    borderRadius: 6,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#ff3b30",
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  pickerHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
  },
  pickerButton: {
    padding: 8,
  },
  pickerButtonText: {
    color: "#007AFF",
    fontSize: 16,
  },
  disabledText: {
    color: Colors.dark_grey,
  },
});

export default UserProfile;
