import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsFillHeartFill } from "react-icons/bs";
export default function Favirote({ token }) {
  const [fvairote, setFvairote] = useState([]);

  useEffect(async () => {
    try {
      if (token) {
        const reult = await axios.get("https://userjamelah.herokuapp.com/like/", {
          headers: { authorization: "Bearer " + token },
        });
        setFvairote(reult.data);
        console.log(reult.data);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }, [token]);

  const removeFav = async (id,i) => {
    const result = await axios.delete(`https://userjamelah.herokuapp.com//unlike/${id}`, {
      headers: { authorization: "Bearer " + token },
    });
    console.log(result.data);
    const copied = [...fvairote]
    copied.splice(i,1)
    setFvairote(copied);
  };

  return (
    <div>
      {fvairote.map((elem, i) => {
        return (
          <div>
            <p> {elem.name}</p>
            <p> {elem.price}</p>
            <img src={elem.img} alt="nooo img" />
            <BsFillHeartFill
              className="HEART"
              onClick={() => {
                removeFav(elem._id,i);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
