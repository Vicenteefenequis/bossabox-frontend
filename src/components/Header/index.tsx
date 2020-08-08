import React from "react";
import "./styles.css";
import Logo from "../../assets/logo.png";

interface IProps {
  title?: string;
  description?: string;
}

const Header: React.FC<IProps> = ({ title, description }) => {
  return (
    <div className="header">
      <div className="header-essencial">
        <div className="header-title">
          <img src={Logo} alt="logovuttr" />
          <h1 className="title-header">{title}</h1>
        </div>
        <h4 className="description-header">{description}</h4>
      </div>
    </div>
  );
};

export default Header;
