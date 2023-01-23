import { AiOutlineSearch } from "react-icons/ai";

import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navabrContainer">
      <div className="navabrTitle">
        SECQUR<span style={{ color: "#F10307" }}>AI</span>SE
      </div>
      <div className="rightNavbar">
        <div className="searchBtn">
          <AiOutlineSearch />
        </div>
        <div className="countSection">
          <div className="maleCt">25</div>
          <div className="femaleCt">25</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
