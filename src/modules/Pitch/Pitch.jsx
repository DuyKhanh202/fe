import React, { useEffect, useState } from "react";
import PitchStyles from "./Pitch.module.scss";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import PitchType from "./PitchType";
import PitchList from "./PitchList";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { getListField, getTypeField } from "../../apis/fields";
import { useParams } from "react-router-dom";





export default function Pitch() {
  const { type } = useParams();
  console.log("lấy từ URL:", type);

  const [fieldList, setFieldList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Kiểm tra giá trị của 'type' và gọi hàm tương ứng
        if (type) {
          handleChangeType(type);
        } else {
          const list = await getListField(1);
          setFieldList(list);
        }
      } catch (error) {
        console.error('Error fetching field list:', error);
      }
    };
    fetchData();
  }, [type]); // Đặt type vào dependency array để useEffect được gọi lại khi type thay đổi

  console.log("CAC SAN:", fieldList);

  const handleChangePage = async (page) => {
    const list = await getListField(page);
    setFieldList(list);
  }

  const handleChangeType = async (type) => {
    const list = await getTypeField(type);
    setFieldList(list);
  }

  return (
    <div className={`${PitchStyles.pitch}`}>
      <div className={`${PitchStyles.pitch_container}`}>
        <Grid container spacing={2}>
          <Grid xs={3}>
            <PitchType onHandleChangeType={handleChangeType} />
          </Grid>
          <Grid xs={9}>
            <PitchList fieldList={fieldList} />
            <div className="text-center d-flex justify-content-center mt-5">
              {/* <Stack spacing={2}>
                <Pagination count={10} />
              </Stack> */}
              <button className="me-4" onClick={() => handleChangePage(1)}>
                1
              </button>
              <button className="me-4" onClick={() => handleChangePage(2)}>
                2
              </button>
              <button className="me-4" onClick={() => handleChangePage(3)}>
                3
              </button>
              <button className="me-4" onClick={() => handleChangePage(4)}>
                4
              </button>
              <button className="me-4" onClick={() => handleChangePage(5)}>
                5
              </button>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
