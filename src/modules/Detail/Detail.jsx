import React, { useEffect, useState } from "react";
import DetailStyles from "./Detail.module.scss";
import Loading from "../../components/Loading";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import MapIcon from "@mui/icons-material/Map";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import { bookingField, getBookById, getListInfo } from "../../apis/fields";
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useMutation } from "@tanstack/react-query";

import Swal from 'sweetalert2'
import { getUserById } from "../../apis/user";




export default function Detail() {

  // or via CommonJS
  const Swal = require('sweetalert2')
  const bookingSchema = object({
    date_book: string().required("Ngày đặt không được để trống"),
    time_start: string().required("Giờ bắt đầu không được để trống"),
    time_end: string().required("Giờ kết thúc không được để trống"),
    referee: string().required("Số lượng trọng tài không được để trống"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date_book: "",
      time_start: "",
      time_end: "",
      referee: "",

    },
    resolver: yupResolver(bookingSchema),
    // khi người dùng blur nó thì sẽ tự động hiện ra lỗi
    mode: "onTouched",
  });

  const {
    mutate: handleSignin,
    error,
    isLoading,
  } = useMutation({
    mutationFn: (payload) => bookingField(payload),
    onSuccess: () => {
      // navigate("/");
    },
  });



  // MUI SETUP
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const ColorButton = styled(Button)(({ theme }) => ({
    color: "white",
    border: "1px solid black",
    backgroundColor: "#001100",
    "&:hover": {
      backgroundColor: "#001100",
    },
  }));

  // COMPONENTS SETUP
  const [pitchDetail, setPitchDetail] = useState(null);
  const [pitchs, setPitchs] = useState(null);
  const [book, setBook] = useState([]);
  const [user, setUser] = useState([]);
  const { idD } = useParams();

  // Lấy dữ liệu từ localStorage
  var userDataString = localStorage.getItem('userData');
  // Kiểm tra xem dữ liệu có tồn tại không
  if (userDataString) {
    // Chuyển đổi chuỗi JSON thành đối tượng JavaScript
    var userDataObject = JSON.parse(userDataString);

    // Bây giờ userDataObject chứa đối tượng từ localStorage
    console.log(userDataObject);

    // Bạn có thể sử dụng userDataObject như một biến trong mã của mình
  } else {
    console.log('Không có dữ liệu trong localStorage với key là "userData"');
  }

  // sau khi form thành công
  const onSubmit = (values) => {

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "ĐẶT",
      denyButtonText: `HỦY ĐẶT`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const startTime = new Date(`2023-01-01 ${values.time_start}`);
        const endTime = new Date(`2023-01-01 ${values.time_end}`);
        // Tính số giờ giữa hai thời điểm
        const timeDifferenceInMilliseconds = endTime - startTime;
        const hoursDifference = timeDifferenceInMilliseconds / (1000 * 60 * 60);

        console.log(hoursDifference); // Kết quả: 1
        // Thêm giá trị id và userId vào đối tượng values
        const updatedValues = {
          ...values,
          account_id: userDataObject.id,
          total_price: hoursDifference * pitchDetail.price,
          field_id: idD
        };

        console.log("FORM ĐẶT SÂN", updatedValues);

        // Gọi API đặt sân với đối tượng đã được cập nhật
        handleSignin(updatedValues);
        Swal.fire("SÂN ĐÃ ĐƯỢC ĐẶT !!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("SỰ KIỆN ĐÃ BỊ HỦY", "", "info");
      }
    });




  };

  // sau khi form thất bại
  const onError = (error) => {
    console.log("Lỗi : ", error);
  };



  // let item = {
  //   name: "Sân Mỹ Đình 2",
  //   type: "Sân 7",
  //   status: "trống",
  //   address: "81 landmark",
  //   image:
  //     "https://nld.mediacdn.vn/2018/6/2/mordovia-arena-saransk-1527915860667205779137.jpg",
  //   price: 1000,
  // };

  const fetchData = async () => {
    try {
      const pitch = await getListInfo(idD);
      const booked = await getBookById(idD);
      const sortedBook = [...booked].sort((a, b) => new Date(b.date_book) - new Date(a.date_book));

      setPitchDetail(pitch);
      setBook(sortedBook);

    } catch (error) {
      console.error('Error fetching field list:', error);
    }
  };


  const fetchUserDetails = async () => {
    try {
      const userDetails = [];
      for (const booking of book) {

        const user = await getUserById(booking.account_id); // Giả sử có thuộc tính userId trong đối tượng booking
        userDetails.push(user);

        setUser(userDetails);
      }

      // Do something with userDetails, such as updating state or performing further operations
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Gọi fetchData khi component được mount

  useEffect(() => {
    // Gọi fetchUserDetails khi state book thay đổi
    fetchUserDetails();
  }, [book]);

  // const userBook = await getUserById(2);
  //      setUser(userBook);

  console.log(book);
  console.log("Mảng user:", user);

  if (!pitchDetail) return <Loading />;
  console.log(pitchDetail);
  return (
    <div className={`${DetailStyles.detail}`}>
      <div className={`${DetailStyles.detail_container}`}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid xs={12} md={8}>
              <h2>{pitchDetail.name}</h2>
              <div className={`${DetailStyles.detail_container_image}`}>
                <img src={pitchDetail.image} alt={pitchDetail.name} />
              </div>
              <div
                className={`${DetailStyles.detail_container_description} mt-4`}
              >
                <div className="text-center">
                  <h2 style={{ backgroundColor: "gray" }}>MÔ TẢ SÂN</h2>
                </div>
                <h4>
                  Loại sân:{" "}
                  <span style={{ color: "#dc0813" }}>{pitchDetail.type}</span>
                </h4>
                <p>
                  Sân bóng {pitchDetail.name} là 1 sân cầu lâu đời, mới được
                  chủ đầu tư chỉnh trang, nâng cấp và đang là 1 trong những sân
                  cầu đẹp nhất sân BADMINTON
                </p>
                <h4>Cơ sở vật chất và tiện ích tại sân</h4>
                <ul>
                  <li>
                    <p>Địa điểm thú vị để thi đấu</p>
                  </li>
                  <li>
                    <p>
                      Có hệ thống đèn chiếu sáng hiện đại, đáp ứng nhu cầu thi
                      đấu ban đêm
                    </p>
                  </li>
                  <li>
                    <p>Có nước uống giải khát sẵn khi đặt sân tại BADMINTON</p>
                  </li>
                  <li>
                    <p>Có khán đài để cổ vũ</p>
                  </li>
                  <li>
                    <p>Có cho thuê áo tập</p>
                  </li>
                  <li>
                    <p>Có Cho thuê trọng tài</p>
                  </li>
                </ul>
                <div className="d-flex">
                  <h4>Giá Thuê Sân</h4>
                  <Button
                    className="ms-3"
                    aria-describedby={id}
                    variant="contained"
                    style={{ backgroundColor: "blue" }}
                    onClick={handleClick}
                  >
                    CLICK ĐỂ XEM
                  </Button>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <Typography sx={{ p: 2 }}>
                      {pitchDetail.price.toLocaleString()} $
                    </Typography>
                  </Popover>
                </div>
              </div>
            </Grid>
            <Grid xs={12} md={4}>
              <div className={`${DetailStyles.book}`}>
                <div className={`${DetailStyles.book_container} text-center`}>
                  <h4>Địa chỉ</h4>
                  <h2>{pitchDetail.address}</h2>

                  <div>
                    <form onSubmit={handleSubmit(onSubmit, onError)}>
                      <div>
                        <h6>NGÀY ĐẶT</h6>
                        <input
                          type="date"
                          placeholder="Ngày đặt"
                          {...register("date_book")}
                        />
                        {errors.date_book && <p>{errors.date_book.message}</p>}
                      </div>
                      <div>
                        <h6>GIỜ BẮT ĐẦU</h6>
                        <input
                          type="time"
                          placeholder="Giờ bắt đầu"
                          {...register("time_start")}
                        />
                        {errors.time_start && <p>{errors.time_start.message}</p>}
                      </div>
                      <div>
                        <h6>GIỜ KẾT THÚC</h6>
                        <input
                          type="time"
                          placeholder="Giờ kết thúc"
                          {...register("time_end")}
                        />
                        {errors.time_end && <p>{errors.time_end.message}</p>}
                      </div>
                      <div>
                        <h6>SỐ LƯỢNG TRỌNG TÀI</h6>
                        <input
                          type="text"
                          placeholder="Số lượng trọng tài"
                          {...register("referee")}
                        />
                        {errors.referee && <p>{errors.referee.message}</p>}
                      </div>
                      <div className="text-center">
                        <ColorButton
                          className="mt-4"
                          variant="outlined"
                          startIcon={<PriceCheckIcon />}
                          type="submit"
                        >
                          ĐẶT SÂN
                        </ColorButton>
                      </div>
                    </form>
                  </div>
                </div>

              </div>
              <div className="text-center mt-5 text-bold " >
                <p>LỊCH ĐÃ ĐẶT CỦA {pitchDetail.name}</p>
              </div>
              <div className={`${DetailStyles.booked}`}>

                {book.map((item, index) => {
                  const formattedDate = new Date(item.date_book).toLocaleDateString();
                  console.log(index);

                  // Sử dụng destructuring assignment để lấy thông tin người đặt sân
                  const { name } = user[index] || {};

                  return (
                    <div className="text-center bg-warning rounded mb-3 p-3" key={index}>
                      <p>{formattedDate}</p>
                      <p>GIỜ BẮT ĐẦU: {item.time_start}</p>
                      <p>GIỜ KẾT THÚC: {item.time_end}</p>
                      {name && (
                        <p>NGƯỜI ĐẶT: {name}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}
