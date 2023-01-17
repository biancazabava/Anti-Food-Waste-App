import React from "react";

const Header = () => {
  const handleLogout = () => {
    localStorage.clear();
  };
  return (
    <div className="header-container ">
      <a className="nav-link " href="/">
        Acasa
      </a>
      {localStorage.getItem("userId") === null ? null : (
        <a
          className="nav-link"
          href={`/utilizatori/${localStorage.getItem("userId")}`}
        >
          Contul meu
        </a>
      )}
      {localStorage.getItem("userId") === null ? (
        <a className="nav-link" href="/login">
          Log in
        </a>
      ) : null}
      {localStorage.getItem("userId") === null ? null : (
        <a className="nav-link " href="/" onClick={handleLogout}>
          Log out
        </a>
      )}
    </div>
  );
};

export default Header;
