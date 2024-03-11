import React, { useEffect, useState } from "react";
import PitchListStyles from "./Pitch.module.scss";
import PitchItem from "../PitchItem/PitchItem";
import Loading from "../../../components/Loading";

export default function PitchList({ fieldList }) {
  const [pitch, setPitch] = useState([]);


  useEffect(() => {


    setPitch(fieldList);


  }, [fieldList]);

  console.log(fieldList);
  if (!fieldList?.length) return <Loading />;



  return (
    <div className={`${PitchListStyles.pitchList}`}>
      <div className={`${PitchListStyles.pitchList_container}`}>
        <PitchItem pitchs={pitch} />
      </div>
    </div>
  );
}
