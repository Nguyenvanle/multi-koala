// UserProfile.tsx
import { Colors } from "@/src/constants/Colors";
import { text } from "@/src/constants/Styles";
import useUser from "@/src/feature/user/hooks/useUser";
import { UserBody, UserRes } from "@/src/feature/user/types/user";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  ActivityIndicator,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import useUserUpdate from "@/src/feature/user/hooks/useUserUpdate";
import { UserPost } from "@/src/feature/user/types/user-update";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "@/src/context/user/userContext";
import API_CONFIG from "@/src/types/api/config";

const UserProfile: React.FC = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UserProfile must be used within a UserProvider");
  }
  const { user, setUser } = context;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const {
    loadingUser: userLoading,
    errorMessage,
    setErrorMessage,
    refreshUser,
  } = useUser();
  const { loadingUpdate, errorMessageUpdate, updateSuccess, updateUser } =
    useUserUpdate();

  const handleInputChange = (name: keyof UserBody, value: string) => {
    setUser((prevUser) => {
      if (!prevUser) return undefined;
      return {
        ...prevUser,
        [name]: value,
      };
    });
  };

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
      setUser((prevUser) => {
        if (!prevUser) return undefined;
        return {
          ...prevUser,
          userBirth: selectedDate.toISOString().split("T")[0],
        };
      });
    }
  };

  // In your render method, you might want to show a loading indicator
  if (loadingUpdate) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.teal_dark} />
        <Text style={styles.loadingText}>Updating...</Text>
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

  const handleSave = async () => {
    if (!user) return;

    try {
      const updateData: UserPost = {
        firstname: user.firstname,
        lastname: user.lastname,
        userBio: user.userBio,
        userBirth: user.userBirth,
        userHometown: user.userHometown,
      };

      const updatedUser = await updateUser(updateData);

      if (updatedUser) {
        setUser(updatedUser);
        await refreshUser();
        setIsEditing(false);
      }
    } catch (error) {
      Alert.alert(
        "Update Failed",
        error instanceof Error
          ? error.message
          : "Failed to update user information"
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, justifyContent: "center" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
    >
      <ScrollView style={styles.content}>
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
              <Text style={styles.changeImageText}>Change Image</Text>
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
              <Text style={styles.label}>Firstname</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.disabledInput]}
                value={user.firstname || ""}
                onChangeText={(text) => handleInputChange("firstname", text)}
                editable={isEditing}
              />
            </View>
            <View style={styles.nameInputContainer}>
              <Text style={styles.label}>Lastname</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.disabledInput]}
                value={user.lastname || ""}
                onChangeText={(text) => handleInputChange("lastname", text)}
                editable={isEditing}
              />
            </View>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {/* Vai trò */}
            <View style={{ ...styles.inputContainer, width: "48%" }}>
              <Text style={styles.label}>Role</Text>
              <TextInput
                style={[
                  styles.input,
                  styles.disabledInput,
                  isEditing && styles.disabledInputNone,
                ]} // Áp dụng styles.disabledInput luôn
                value={user.roles[0].roleName || ""}
                onChangeText={null} // Không xử lý thay đổi văn bản
                editable={false} // Không cho phép chỉnh sửa
                selectTextOnFocus={false} // Không cho phép chọn văn bản
              />
            </View>
            {/* Ngày sinh */}
            <View style={{ ...styles.inputContainer, width: "48%" }}>
              <Text style={styles.label}>Birthday</Text>
              {!isEditing ? (
                <TextInput
                  onPress={() => isEditing && setShowDatePicker(true)}
                  style={[{ ...styles.input }]}
                >
                  <Text style={styles.disabledText}>
                    {formatDate(user.userBirth || "No update yet")}
                  </Text>
                </TextInput>
              ) : (
                <View style={{ alignSelf: "baseline" }}>
                  <DateTimePicker
                    style={styles.dateTimePickerWrapper}
                    value={new Date(user.userBirth)}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                    // Không sử dụng pickerStyle vì không tồn tại
                  />
                </View>
              )}
            </View>
          </View>

          {/* Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>

            <TextInput
              style={[
                styles.input,
                styles.disabledInput,
                isEditing && styles.disabledInputNone,
              ]}
              value={user.email || ""}
              onChangeText={null}
              editable={false}
              selectTextOnFocus={false}
            />
          </View>

          {/* Quê quán */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Hometown</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.disabledInput]}
              value={user.userHometown || ""}
              onChangeText={(text) => handleInputChange("userHometown", text)}
              editable={isEditing}
              numberOfLines={2}
            />
          </View>

          {/* Giới thiệu */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.disabledInput]}
              value={user.userBio || ""}
              onChangeText={(text) => handleInputChange("userBio", text)}
              editable={isEditing}
              multiline
              numberOfLines={10}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    marginBottom: 16,
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
    marginTop: 8,
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
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 120,
    marginBottom: 8,
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
    gap: 16,
  },
  nameContainer: {
    flexDirection: "row",
    gap: 16,
  },
  nameInputContainer: {
    flex: 1,
    gap: 4,
  },
  inputContainer: {
    gap: 4,
  },
  label: {
    ...text.large,
    fontWeight: "600",
    color: Colors.teal_dark,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 6,
    padding: 12,
    backgroundColor: Colors.white,
  },
  disabledInputNone: {
    color: Colors.dark_grey,
    borderWidth: 0,
    borderRadius: 6,
    padding: 12,
    backgroundColor: Colors.background,
  },
  dateTimePickerWrapper: {
    padding: 2,
    width: "100%",
  },
  multilineInput: {
    height: 300,
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
