import React from "react";
import ProfileStyles from "./Profile.module.scss";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";

export default function Profile() {
  return (
    <div className={`${ProfileStyles.profile}`}>
      <div className={`${ProfileStyles.profile_container}`}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid xs={12} md={5}>
              CÁ NHÂN
            </Grid>
            <Grid xs={12} md={7}>
              LỊCH
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}
