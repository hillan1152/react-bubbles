import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import axiosAuth from "../utils/axiosAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    axiosAuth()
      .get('http://localhost:5000/api/colors')
      .then(res => {
        setColorList(res.data)
        console.log('Set Color', colorList)  
      })
      .catch(err => console.log('NO BUBBLE PAGE', err.response))
  }, [])
  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />

    </>
  );
};

export default BubblePage;
