import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Product from "./Product";
import { SERVER } from "./PersonalList";
import AddProductForm from "./AddProductForm";

const Account = () => {
  const [alimente, setAlimente] = useState([]);
  const { id } = useParams();
  const getAlimente = async () => {
    const response = await fetch(
      `http://localhost:7000/api/utilizatori/${localStorage.getItem(
        "userId"
      )}/alimente`
    );

    const data = await response.json();
    setAlimente(data);
  };

  useEffect(() => {
    getAlimente();
  }, []);

  return (
    <div className="account-container">
      {/* rerender la alimente cu ajutorul props */}
      <AddProductForm alimente={alimente} setAlimente={setAlimente} />
      <div className="product-listing">
        {alimente.map((item, idx) => (
          <Product product={item} key={idx} id={idx} />
        ))}
      </div>
    </div>
  );
};

export default Account;
