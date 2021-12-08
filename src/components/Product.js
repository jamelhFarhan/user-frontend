import React, { useState, useEffect } from "react";
import { BsFillHeartFill } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { GrBasket } from "react-icons/gr";
import "./Pruduct.css";
import axios from "axios";

export default function Courses({ token }) {
  const history = useHistory();

  const [proudect, setproduct] = useState([]);
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [search, setsearch] = useState("");

  console.log(token, "token");
  useEffect(async () => {
    const res = await axios.get(
      "https://userjamelah.herokuapp.com/getaddProduct",
      {
        headers: { authorization: "Bearer " + token },
      }
    );
    setproduct(res.data);
  }, []);

  const changeNameVal = (e) => {
    setName(e.target.value);
  };
  const changeDescVal = (e) => {
    setPrice(e.target.value);
  };
  const changeImgVal = (e) => {
    setImg(e.target.value);
  };

  const searchTarget = (e) => {
    setsearch(e.target.value);
  };

  const addProduct = async () => {
    console.log("Sss");
    try {
      const result = await axios.post(
        "http://https://userjamelah.herokuapp.com/addProduct",
        {
          name: name,
          price: price,
          img: img,
        },

        {
          headers: { authorization: "Bearer " + token },
        }
      );
      console.log(result.data);
      const copied = [...proudect];
      copied.push(result.data);
      setproduct(copied);
    } catch (error) {
      console.log("eroew");
    }
  };

  const deletePro = async (id, index) => {
    try {
      const deletedCourse = await axios.delete(
        `https://userjamelah.herokuapp.com/deletProduct/${id}`,
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      const copied = [...proudect];
      copied.splice(index, 1);
      setproduct(copied);
    } catch (error) {
      console.log("erroe");
    }
  };

  const search1 = () => {
    const search1 = proudect.filter((element) => {
      if (element.name.toLowerCase().includes(search.toLocaleLowerCase())) {
        return element;
      }
      console.log(element);
    });
    setproduct(search1);
    return search1;
  };

  const GoToCoffe = (id) => {
    history.push(`/Coffe/${id}`);
    console.log();
  };

  const fav = async (id) => {
    try {
      const result = await axios.post(
        `https://userjamelah.herokuapp.com//like/${id}`,
        {},
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      console.log(result.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      <div id="inputSearch">
        <input
          placeholder="search"
          onChange={(e) => {
            searchTarget(e);
          }}
        />
        <button
          onClick={() => {
            search1();
          }}
        >
          🔍
        </button>
      </div>

      <div className="miandevv">
        <div id="mm">
          {proudect.map((element, i) => {
            return (
              <div id="map" key={element._id}>
                {" "}
                {/* <h1>{element.user.name}</h1> */}
                <div id="id">
                  <p>{element.name}</p>
                  <p> {element.price}</p>

                  <img
                    className="imgggg"
                    onClick={() => {
                      GoToCoffe(element._id);
                    }}
                    src={element.img}
                    alt="nooo img"
                  />

                  <div className="icons">
                    <BsFillHeartFill
                      className="HEART"
                      onClick={() => {
                        fav(element._id);
                      }}
                    />

                    <GrBasket
                      id="delelet"
                      onClick={() => {
                        deletePro(element._id, i);
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div id="putfinal">
          <input
            id="i1"
            placeholder="name"
            onChange={(e) => {
              changeNameVal(e);
            }}
          />{" "}
          <input
            id="i1"
            placeholder="price"
            onChange={(e) => {
              changeDescVal(e);
            }}
          />
          <input
            id="i1"
            placeholder="image"
            onChange={(e) => {
              changeImgVal(e);
            }}
          />
          <button
            id="i11"
            onClick={() => {
              addProduct();
            }}
          >
            Submit{" "}
          </button>
        </div>
      </div>

      {/* <h3>{token}</h3> */}
    </>
  );
}
