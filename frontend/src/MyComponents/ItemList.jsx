import React,{ useState, useEffect } from 'react';
import Item from './Items';
import axios from 'axios'
import data from '../Assets/sample.json';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState(null);


  useEffect(() => {
    axios.get('https://baniyabro.onrender.com/getData')
      .then((response) => {
        console.log("This is the respone",response)
        setItems(response.data.data);
      })
      .catch((error) => {
        console.error("API fetch failed, using fallback data", error);
        setItems(data.data);
        setError("Failed to load data from API");
      })
      .finally(() => {
        setLoading(false);
      });;
  }, []);

  return (
    <div>
      {items.map((item, index) => (
        <Item
          key={index}
          link={item.prodURL}
          name={item.title.length > 12 ? item.title.slice(0, 9) + '...' : item.title}
          price={item.price}
          imgSrc={item.imgUrl}
        />
      ))}
    </div>
  );
};

export default ItemList;