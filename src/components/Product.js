import React, { useEffect, useState } from "react";

const Product = ({ product }) => {
  const [disponibilitate, setDisponibilitate] = useState(
    product.disponibilitate
  );

  const handleClickDisponibilitate = async (id) => {
    try {
      const response = await fetch(`http://localhost:7000/api/alimente/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();
      if (response.status === 200) {
        console.log(json.message);
        //in loc de rerender
        setDisponibilitate(
          disponibilitate === "Disponibil" ? "Indisponibil" : "Disponibil"
        );
      } else {
        console.log(json.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleClickDelete = async (id) => {
    try {
      const requestBody = {
        id: id,
      };
      const response = await fetch(
        "http://localhost:7000/api/alimente/delete",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );
      const json = await response.json();
      if (response.status === 200) {
        window.location.href = `http://localhost:3000/utilizatori/${localStorage.getItem(
          "userId"
        )}`;
        console.log(json.message);
      } else {
        console.log(json.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickClaim = async (id_aliment) => {
    try {
      const requestBody = {
        UtilizatorId: localStorage.getItem("userId"),
        id: id_aliment,
      };
      const response = await fetch("http://localhost:7000/api/alimente", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      const json = await response.json();
      if (response.status === 200) {
        console.log(json.message);
        //in loc de rerender
        window.location.href = `http://localhost:3000/utilizatori/${localStorage.getItem(
          "userId"
        )}`;
      } else {
        console.log(json.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //verifica daca produsul expira in mai putin de 7 zile
  function verificaTermen() {
    var saptamana = 7 * 24 * 60 * 60 * 1000;
    var data_curenta = new Date().getTime();
    var data_expirare = Date.parse(product.data_expirare);
    console.log(data_expirare);
    console.log(data_curenta);
    console.log(data_expirare - data_curenta);
    if (data_expirare - data_curenta < saptamana) {
      console.log(`expira in curand ${product.denumire}`);
      alert(
        `${product.denumire} expira in curand : ${product.data_expirare}  `
      );
      const aliment_id = product.id;
      fetch(`http://localhost:7000/api/alimentealert/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alimentId: aliment_id }),
      }).then((data) => {
        if (data.status === 200) {
          console.log(data.message);
        } else {
          console.log(data.error);
        }
      });
      return false;
    } else {
      console.log(`mai are pana expira ${product.denumire}`);
      return true;
    }
  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      verificaTermen();
    }, 1000 * 60 * 60 * 24);

    return () => clearInterval(intervalId);
  }, [product]);

  return (
    <div className="product-root">
      <img
        className="product-img"
        src="https://freesvg.org/img/simplefastfoodicon.png"
        alt="..."
      ></img>
      <div className="product-categorie ">Categorie: {product.categorie}</div>
      <div className="product-denumire">{product.denumire}</div>
      <div className="product-data">
        Expira in {product.data_expirare.slice(0, 10)}
      </div>
      <div className="product-status ">{disponibilitate}</div>
      {window.location.pathname ===
      "/utilizatori/" + localStorage.getItem("userId") ? (
        <>
          <button
            className="account-product-button"
            onClick={() => handleClickDisponibilitate(product.id)}
          >
            Schimba disponibilitatea
          </button>
          <button
            className="account-product-button"
            onClick={() => handleClickDelete(product.id)}
          >
            Sterge din lista
          </button>
        </>
      ) : null}
      {product.disponibilitate === "Disponibil" &&
      product.UtilizatorId != localStorage.getItem("userId") &&
      localStorage.getItem("userId") ? (
        <button
          className="claim-product-button"
          onClick={() => handleClickClaim(product.id)}
        >
          Claim
        </button>
      ) : null}
    </div>
  );
};

export default Product;
