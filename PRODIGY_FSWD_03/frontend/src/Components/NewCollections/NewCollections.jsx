import React, { useEffect, useState } from "react";
import "./NewCollections.css";
import Item from "../Item/Item";
const NewCollections = () => {
  const [new_collection, setNew_collection] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/newcollections")
      .then((res) => res.json()) // ✅ Return the parsed JSON
      .then((data) => {
        if (Array.isArray(data)) {
          setNew_collection(data); // ✅ Ensure data is an array before setting state
        } else {
          console.error("Error: Expected an array but got", data);
          setNew_collection([]); // Prevent crash
        }
      })
      .catch((error) => {
        console.error("Failed to fetch new collections:", error);
        setNew_collection([]); // Prevent crash in case of an error
      });
  }, []);

  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewCollections;
