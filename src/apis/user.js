import fetcher from "./fetcher";
import axios from "axios";

// ĐĂNG KÝ
export const signup = async (payload) => {
  try {
    const response = await fetcher.post("/account/register", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

// ĐĂNG NHẬP
export const signin = (payload) => {
  return fetcher.post("/account/login", payload)
    .then((response) => {
      // Kiểm tra response.success và xử lý tùy thuộc vào kết quả
      if (response.data?.success) {
        // Lưu dữ liệu vào localStorage
        localStorage.setItem('userData', JSON.stringify(response.data?.data?.content));
        return response.data?.data?.content;
      } else {
        // Nếu response.success là false, ném ra một lỗi để bắt ở phía catch
        throw new Error('Đăng nhập không thành công');
      }
    })
    .catch((error) => {
      // Xử lý lỗi và ném ra ngoại lệ
      throw error.response.data?.content?.account_name || 'Đã xảy ra lỗi không xác định';
    });
};
// ĐĂNG XUẤT 
export const logout = () => {
  // Xóa dữ liệu userData khỏi localStorage
  localStorage.removeItem('userData');

  // Thực hiện các bước khác khi người dùng logout (nếu cần)
  // Ví dụ: đẩy người dùng đến trang đăng nhập
  window.location.href = '/sign-in';
};


// /account/getinfoByID

export const getUserById = async (id) => {
  try {
    const response = await fetcher.post("/account/getinfoByID", { id: id });
    return response.data?.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};
