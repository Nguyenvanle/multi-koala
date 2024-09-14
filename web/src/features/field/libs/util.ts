export const formatString = (input: string) => {
  return input
    .replace(/([A-Z])/g, " $1") // Thêm khoảng trắng trước chữ cái viết hoa
    .toLowerCase() // Chuyển ký tự thành chữ thường
    .trim() // Loại bỏ khoảng trắng thừa
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Viết hoa chữ cái đầu
};
