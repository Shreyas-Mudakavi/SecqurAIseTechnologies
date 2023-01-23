import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import moment from "moment";
import { GrMenu } from "react-icons/gr";
import { MdLogout } from "react-icons/md";
import { BsFilter } from "react-icons/bs";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { db } from "../../firebase";
import "./Home.css";
import { useEffect, useState } from "react";

const Home = () => {
  const [select, setSelect] = useState("0M6FGxD2AFYuUvxMsItN");
  const [data, setData] = useState([]);
  const [singleDoc, setSingleDoc] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    fetchAllData();
    fetchDoc();
  }, [select]);

  const fetchAllData = () => {
    const collectionData = collection(db, "Data");
    getDocs(collectionData)
      .then((res) => {
        // console.log(res);
        const dt = res.docs.map((doc) => ({ data: doc.data(), id: doc.id }));
        setData(dt);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const fetchDoc = () => {
    const collectionData = doc(db, "Data", select);
    getDoc(collectionData)
      .then((res) => {
        // console.log([res.data(), doc.id]);
        setSingleDoc([res.data(), doc.id]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleSelect = (id) => {
    setSelect(id);
  };

  const formattedDate = moment(singleDoc[0]?.Date)
    .format("DDDo/MMMM/YYYY")
    .split("/")
    .join(" ");

  const active = { backgroundColor: "#7F7F7F" };
  const inActive = {};

  return (
    <div className="homeSection">
      <div className="leftSection">
        <div>
          <GrMenu />
        </div>
        <div>
          <MdLogout />
        </div>
      </div>
      <div className="middleSection">
        <div className="middleContainer">
          <div className="bio">
            <div>
              <p>{singleDoc[0]?.ID}</p>
              <p>Person Detected</p>
            </div>

            <div>
              <p>Name : {singleDoc[0]?.Name}</p>
              <p>Location : {singleDoc[0]?.Location}</p>
              <p>Date : {singleDoc[0]?.Date}</p>
              <p>Time : {singleDoc[0]?.Time}</p>
            </div>

            <div>
              <p>Description: </p>
              <p style={{ width: "20rem" }}>
                {singleDoc[0]?.Name} detected at {singleDoc[0]?.Location} on{" "}
                {formattedDate}
              </p>
            </div>
          </div>
          <div className="imgContainer">
            <p style={{ fontSize: "1.6rem" }}>{singleDoc[0]?.Gender}</p>

            <img
              className="img"
              src={singleDoc[0]?.ImageUrl}
              alt={singleDoc[0]?.ID}
            />
          </div>
        </div>
      </div>
      <div className="rightSection">
        <div className="rightHeading">
          <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>Events</div>
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <BsFilter style={{ fontSize: "2rem", color: "black" }} />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem>
                Location:
                <select style={{ outline: "none", marginLeft: "0.5rem" }}>
                  <option>Chennai</option>
                  <option>Hyderabad</option>
                  <option>Banglore</option>
                </select>
              </MenuItem>
              <MenuItem>
                Gender:
                <select style={{ outline: "none", marginLeft: "0.5rem" }}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </MenuItem>
              <MenuItem>
                Date:{" "}
                <input
                  type="date"
                  id="date"
                  style={{ outline: "none", marginLeft: "0.5rem" }}
                  name="date"
                />
              </MenuItem>
            </Menu>
          </div>
        </div>
        <div className="allData">
          <div className="">
            {data.map((dt) => (
              <div
                key={dt.data.ID}
                onClick={() => {
                  handleSelect(dt.id);
                }}
                className="eventContainer"
                style={select === dt.id ? active : inActive}
              >
                <div className="first">
                  <div>
                    {dt.data.ID}: {dt.data.Location}
                  </div>
                  <div>
                    {dt.data.Date} {dt.data.Time}
                  </div>
                </div>
                <span style={{}}>Person detected.</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
