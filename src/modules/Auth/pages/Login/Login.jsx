import React from "react";
import AuthStyles from "../../components/Auth.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { signin } from "../../../../apis/user";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const loginSchema = object({
    account_name: string().required("Tên tài khoản không được để trống"),
    password: string().required("Mật khẩu không được để trống"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      account_name: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
    // khi người dùng blur nó thì sẽ tự động hiện ra lỗi
    mode: "onTouched",
  });

  const {
    mutate: handleSignin,
    error,
    isLoading,
  } = useMutation({
    mutationFn: (payload) => signin(payload),
    onSuccess: () => {
      navigate("/");
    },
    onError: (errorFromBackend) => {
      // Xử lý lỗi từ backend ở đây
      console.error("Error from backend:", errorFromBackend);

      // Hiển thị thông báo lỗi cho người dùng, ví dụ:
      alert("SAI TÊN ĐĂNG NHẬP HOẶC MẬT KHẨU");

      // Hoặc thực hiện các hành động khác tùy thuộc vào lỗi
    },
  });

  // sau khi form thành công
  const onSubmit = (values) => {
    console.log(values);
    // gọi API đăng ký
    handleSignin(values);
  };

  // sau khi form thất bại
  const onError = (error) => {
    console.log("Lỗi : ", error);
  };

  return (
    <div className={`${AuthStyles.auth}`}>
      <div
        className={`${AuthStyles.auth_container}`}
        style={{
          backgroundImage: `url(
            "https://images.pexels.com/photos/8007122/pexels-photo-8007122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          )`,
        }}
      >
        <div className={`${AuthStyles.auth_container_form}`}>
          <h1>ĐĂNG NHẬP</h1>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            {/* ACCOUNT */}
            <div className={`${AuthStyles.form_input}`}>
              <h6>Account</h6>
              <input
                className={`${AuthStyles.input_taiKhoan}`}
                type="text"
                placeholder="Tên tài khoản"
                {...register("account_name")}
              />
              {errors.account_name && <p>{errors.account_name.message}</p>}
            </div>
            {/* PASSWORD */}
            <div className={`${AuthStyles.form_input}`}>
              <h6>Password</h6>
              <input
                className={`${AuthStyles.input_email}`}
                type="password"
                {...register("password")}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>

            <div className="text-center">
              <button className="btn btn-success btn-lg" type="submit">
                ĐĂNG NHẬP
              </button>
              <p className="mt-3" onClick={() => { navigate("/sign-up") }}>Tạo tài khoản ???</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
