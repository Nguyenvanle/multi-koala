// UserProfile.tsx
import { Colors } from "@/src/constants/Colors";
import { text } from "@/src/constants/Styles";
import useUser from "@/src/feature/user/hooks/useUser";
import { UserBody } from "@/src/feature/user/types/user";
import React, { useEffect, useState } from "react";
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
  KeyboardAvoidingView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import useUserUpdate from "@/src/feature/user/hooks/useUserUpdate";

const UserProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [initialUserInfo, setInitialUserInfo] = useState<UserBody | null>(null);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const { loading, user, setUser, errorMessage, setErrorMessage, updateImage } =
    useUser();
  const [showRolePicker, setShowRolePicker] = useState<boolean>(false);
  const {
    loadingUpdate,
    userUpdate,
    setUserUpdate,
    errorMessageUpdate,
    setErrorMessageUpdate,
    updated,
    setUpdated,
  } = useUserUpdate();

  useEffect(() => {
    if (user) {
      setInitialUserInfo(user); // Lưu thông tin người dùng ban đầu
      fetchUserInfo(user); // Gọi hàm để lấy thông tin người dùng
    }
  }, [user]);

  const fetchUserInfo = (user: UserBody) => {
    const userInfo = {
      firstname: user.firstname,
      lastname: user.lastname,
      userBirth: user.userBirth,
      email: user.email,
      userBio: user.userBio,
      userHometown: user.userHometown,
      firstLogin: user.firstLogin,
    };
    console.log(userInfo);
  };

  const handleSave = () => {
    const updatedUserInfo = {
      ...user,
      userBirth: user.userBirth, // Nếu cần format thêm
    };

    // Gửi thông tin người dùng lên server
    setUserUpdate(updatedUserInfo);

    setIsEditing(false);
  };

  const handleInputChange = (name: keyof UserBody, value: string) => {
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      // Lưu trữ dạng ISO string trong state
      const isoDate = selectedDate.toISOString().split("T")[0];
      handleInputChange("userBirth", isoDate);
    }
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
            {/* Email */}
            <View style={{ ...styles.inputContainer, width: "48%" }}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.disabledInput]}
                value={user.email || ""}
                onChangeText={(text) => handleInputChange("email", text)}
                editable={isEditing}
                numberOfLines={10}
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
                <View style={styles.dateTimePickerWrapper}>
                  <DateTimePicker
                    value={new Date(user.userBirth)}
                    mode="date"
                    display="calendar"
                    onChange={handleDateChange}
                    // Không sử dụng pickerStyle vì không tồn tại
                  />
                </View>
              )}
            </View>
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
  dateTimePickerWrapper: {
    alignItems: "center",
    paddingRight: 12,
    padding: 2,
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
