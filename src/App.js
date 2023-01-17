import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; //
import "./App.css";
import PersonalList from "./components/PersonalList";
import Login from "./components/Login";
import Header from "./components/Header";
import Account from "./components/Account";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<PersonalList />} />
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path={`/utilizatori/${localStorage.getItem("userId")}`}
          element={<Account />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
//te loghezi, cu user parola, se cauta in baza de date dupa user si parola, se gaseste id, se stocheaza in local storage, apoi face route
// la pagina cu elementele lui
