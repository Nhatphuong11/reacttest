export const isAdmin = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Kiểm tra token và role có phải admin không
  return token && role === "admin";
};
