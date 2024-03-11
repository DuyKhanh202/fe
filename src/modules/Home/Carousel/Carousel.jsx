import React from "react";
import CarouselStyles from "./Carousel.module.scss";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { getTypeField } from "../../../apis/fields";
import { useNavigate } from "react-router-dom";


export default function Carousel() {
  const [loaiSan, setLoaiSan] = React.useState("");
  const navigate = useNavigate();


  const handleChange = (event) => {
    setLoaiSan(event.target.value);

  };

  const handleMoveToPitch = (type) => {
    navigate(`pitch/${type}`);
  }
  console.log(loaiSan);
  return (
    <div className={`${CarouselStyles.carousel}`}>
      <div className={`${CarouselStyles.carousel_container}`}>
        <div className={`${CarouselStyles.carousel_container_bg}`}></div>
        <div className={`${CarouselStyles.carousel_container_player}`}>
          <img src="./img/newFile-3.png" />
        </div>
        <div className={`${CarouselStyles.carousel_container_search}`}>
          <div
            className={`${CarouselStyles.carousel_container_search_container}`}
          >
            <h1>
              <span className="text-danger">FIND</span> YOUR{" "}
              <span className="text-danger">STADIUM</span>
            </h1>
            <p className="text-secondary">
              <em>Tìm kiếm sân chơi thể thao của riêng bạn</em>
            </p>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sân</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={loaiSan}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={"Sân Trong Nhà "}>SânTrong Nhà </MenuItem>
                  <MenuItem value={"Sân Ngoài Trời"}>Sân Ngoài Trời</MenuItem>
                  <MenuItem value={"Sân Đa Năng"}>Sân Đa Năng</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button
              style={{ backgroundColor: "#0000FF" }}
              className="mt-3"
              variant="contained"
              onClick={() => {
                handleMoveToPitch(loaiSan);
              }}
            >
              TÌM SÂN
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
