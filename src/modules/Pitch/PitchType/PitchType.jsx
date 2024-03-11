import React from "react";
import PitchTypeStyles from "./PitchType.module.scss";
import { styled } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

// CUSTOM CHECKBOX
const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 0 1px rgb(16 22 26 / 40%)"
      : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
  backgroundImage:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
      : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "#dc0813" : "#dc0813",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#dc0813",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "gray",
  },
});
// Inspired by blueprintjs
function BpRadio(props) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}
export default function PitchType({ onHandleChangeType }) {
  return (
    <div className={`${PitchTypeStyles.pitchType}`}>
      <div className={`${PitchTypeStyles.pitchType_container}`}>
        <h2>LOẠI SÂN</h2>
        <div className={`${PitchTypeStyles.checkbox}`}>
          <FormControl>
            <RadioGroup
              defaultValue="Sân Trong Nhà"
              aria-labelledby="demo-customized-radios"
              name="customized-radios"
            >
              <FormControlLabel
                onClick={() => { onHandleChangeType("Sân Trong Nhà") }}
                value="Sân Trong Nhà"
                control={<BpRadio />}
                label="Sân Trong Nhà"
                className="pt-4"
              />
              <FormControlLabel
                onClick={() => { onHandleChangeType("Sân Ngoài Trời") }}
                value="Sân Ngoài Trời"
                control={<BpRadio />}
                label="Sân Ngoài Trời"
                className="pt-4"
              />
              <FormControlLabel
                onClick={() => { onHandleChangeType("Sân Đa Năng") }}
                value="Sân Đa Năng"
                control={<BpRadio />}
                label="Sân Đa Năng"
                className="pt-4"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    </div>
  );
}
