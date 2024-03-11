import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PitchItemStyles from "./PitchItem.module.scss";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Loading from "../../../components/Loading";
import { useNavigate } from "react-router-dom";

const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#191970",
  "&:hover": {
    backgroundColor: "Black",
  },
}));

export default function PitchItem({ pitchs }) {

  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  console.log(pitchs);
  if (!pitchs?.length) return <Loading />;
  return (
    <div className={`${PitchItemStyles.pitchItem}`}>
      <div className={`${PitchItemStyles.pitchItem_container}`}>
        <Grid container spacing={2}>
          {pitchs.map((pitch) => {
            return (
              <Grid xs={12} md={6}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="194"
                    image={pitch.image}
                    alt="Paella dish"
                  />

                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      <p className="fw-bold text-black">
                        {pitch.name} | {pitch.type}
                      </p>
                      <p>{pitch.address}</p>
                      <p>{pitch.price.toLocaleString()}0</p>
                    </Typography>
                    <ColorButton
                      variant="contained"
                      onClick={() => {
                        navigate(`/detail/${pitch.id}`);
                      }}
                    >
                      XEM CHI TIẾT | ĐẶT SÂN
                    </ColorButton>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
}
