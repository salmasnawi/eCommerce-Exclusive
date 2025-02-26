import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const handleAddToCart = () => {
    if (currentUser) {
      dispatch(addToCart({ userId: currentUser.id, product }));
    } else {
      alert('Please log in to add items to the cart.');
    }
  };

  return (
    <div>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default Product;
