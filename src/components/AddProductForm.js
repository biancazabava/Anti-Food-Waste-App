import React from "react";
import { useNavigate } from "react-router-dom";

const AddProductForm = ({ alimente, setAlimente }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const utilizatorId = localStorage.getItem("userId");
    const denumire = e.target.denumire.value;
    const data_expirare = e.target.dto.value;
    const categorie = e.target.categorie.value;
    try {
      const response = await fetch(
        `http://localhost:7000/api/users/${utilizatorId}/aliment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ denumire, data_expirare, categorie }),
        }
      );
      window.location.href = `http://localhost:3000/utilizatori/${utilizatorId}`;
      setAlimente((prevState) => [
        ...prevState,
        {
          categorie: categorie,
          denumire: denumire,
          data_expirare: data_expirare,
          disponibilitate: "Indisponibil",
        },
      ]);
      e.target.denumire.value = "";
      e.target.dto.value = "";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="form-wrapper">
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="product-input-container">
          <label>Denumire </label>
          <input type="text" name="denumire" autoComplete="off" required />
        </div>
        <div className="product-input-container">
          <label>Data expirare </label>
          <input
            className="product-input-container"
            type="date"
            name="dto"
            id="date_timepicker_end"
            required
          ></input>
        </div>
        <div className="product-input-container">
          <label>Categorie</label>
          <select name="categorie" required>
            <option value="Mancare gatita">Mancare gatita</option>
            <option value="Lactate">Lactate</option>
            <option value="Fructe si legume">Fructe si legume</option>
            <option value="Carne">Carne</option>
          </select>
        </div>
        <div className="product-button-container">
          <input type="submit" value="Adauga Aliment" />
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
