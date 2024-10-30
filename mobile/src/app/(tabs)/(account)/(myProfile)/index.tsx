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
} from "react-native";

const UserProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const { loading, user, setUser, errorMessage, setErrorMessage, updateImage } =
    useUser();

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

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      handleInputChange("userBirth", formattedDate);
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
            <Text style={styles.label}>Vai trò</Text>
            {Platform.OS === "ios" ? (
              <View
                style={[
                  styles.input,
                  !isEditing && styles.disabledInput,
                  styles.pickerContainer,
                ]}
              >
                <Picker
                  selectedValue={userInfo.role}
                  enabled={isEditing}
                  onValueChange={(value) =>
                    handleInputChange("role", value as "student" | "teacher")
                  }
                >
                  <Picker.Item label="Học sinh" value="student" />
                  <Picker.Item label="Giáo viên" value="teacher" />
                </Picker>
              </View>
            ) : (
              <Picker
                style={styles.picker}
                enabled={isEditing}
                selectedValue={userInfo.role}
                onValueChange={(value) =>
                  handleInputChange("role", value as "student" | "teacher")
                }
              >
                <Picker.Item label="Học sinh" value="student" />
                <Picker.Item label="Giáo viên" value="teacher" />
              </Picker>
            )}
          </View>

          {/* Ngày sinh */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Birthday</Text>
            <TouchableOpacity
              onPress={() => isEditing && setShowDatePicker(true)}
              style={[styles.input, !isEditing && styles.disabledInput]}
            >
              <Text>{user.userBirth || "Chưa cập nhật"}</Text>
            </TouchableOpacity>
          </View>

          {showDatePicker && ""}

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
    backgroundColor: "#fff",
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
    ...text.p,
    fontWeight: "500",
    marginBottom: 8,
    color: Colors.black,
    marginHorizontal: 4,
  },
  input: {
    ...text.p,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 6,
    padding: 12,
    backgroundColor: Colors.background,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
  },
  disabledInput: {
    backgroundColor: Colors.background,
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
});

export default UserProfile;
