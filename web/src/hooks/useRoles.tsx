import { permissionMap, Role } from "@/lib/permissions";

export const useRoles = () => {
  // const { roles } = useContext(RoleContext);

  // Vai trò tạm thời (thay thế bằng vai trò thực tế từ context)
  const roles: Role[] = ["guest"];

  const hasRole = (role: Role) => roles.includes(role);

  const canAccess = (permission: string): boolean => {
    const allowedRoles = permissionMap[permission];

    if (!allowedRoles) {
      return false; // Không có quyền truy cập
    }

    // Kiểm tra xem người dùng có vai trò nào trong danh sách được phép
    return roles.some((role) => allowedRoles.includes(role));
  };

  return { roles, hasRole, canAccess };
};
