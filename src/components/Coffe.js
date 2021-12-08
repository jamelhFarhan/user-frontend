import React, { useState, useEffect } from "react";
import axios from "axios";
export default function Coffe({ token }) {
  const [allData, setallData] = useState(null)
  useEffect(async (id) => {
    try {
      const result = await axios.get(`https://userjamelah.herokuapp.com/getaddProduct/${id}`,
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      setallData(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div>
      {allData?<div>
        <p >{allData.name}</p>
              <p> {allData.price}</p>
              
              <img  className="imgggg"
              src={allData.img}alt="nooo img"/>

      </div> :""}
    </div>
  );
}
