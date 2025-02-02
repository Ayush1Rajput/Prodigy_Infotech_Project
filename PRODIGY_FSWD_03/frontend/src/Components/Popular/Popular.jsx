import React, { useEffect, useState } from "react";
import "./Popular.css";
import Item from "../Item/Item";

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/popularinwomen")
      .then((res) => res.json()) // ✅ Return parsed JSON
      .then((data) => {
        if (Array.isArray(data)) {
          setPopularProducts(data); // ✅ Ensure data is an array before setting state
        } else {
          console.error("Error: Expected an array but got", data);
          setPopularProducts([]); // Prevent crash
        }
      })
      .catch((error) => {
        console.error("Failed to fetch popular products:", error);
        setPopularProducts([]); // Prevent crash in case of an error
      });
  }, []);

  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {popularProducts.map((item, i) => {
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

export default Popular;
