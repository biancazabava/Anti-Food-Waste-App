import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Product from "./Product";
//import { useSelector, useDispatch } from "react-redux";
//import e from "cors";
//import { getAlimente } from "../actions/food-actions";

//const foodListSelector = (state) => state.food.foodList;
export const SERVER = "http://localhost:7000/api";

const PersonalList = () => {
  // const foodList = useSelector(foodListSelector);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAlimente());
  // }, [dispatch]);

  const [alimente, setAlimente] = useState([]);

  const getAlimente = async () => {
    const response = await fetch(`${SERVER}/getAlimente`);

    const data = await response.json();
    setAlimente(data);
  };

  useEffect(() => {
    getAlimente();
  }, []);

  return (
    <div className="product-listing">
      {alimente.map((item, idx) => (
        <Product product={item} key={idx} id={idx} />
      ))}
    </div>
  );
};
export default PersonalList;
