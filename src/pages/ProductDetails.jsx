import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Breadcrumb, Navbar, Nav } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error('Error fetching product:', error));
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart({ product, quantity }));
    toast.success(`${product.title} has been added to your cart!`, {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  if (!product) return <div>Loading...</div>;

  return (
    <>
    
  

      <Container className="mt-4">
        <Breadcrumb>
          <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="#">Category</Breadcrumb.Item>
          <Breadcrumb.Item active>{product.title}</Breadcrumb.Item>
        </Breadcrumb>

        <Row>
          <Col md={6} className="d-flex justify-content-center">
            <img
              src={product.image}
              alt={product.title}
              className="img-thumbnail" // لتصغير الصورة
            />
          </Col>
          <Col md={6}>
            <h2 className="h3 font-weight-bold mb-3">{product.title}</h2>
            <p className="h4 text-danger mb-3">${product.price.toFixed(2)}</p>
            <p className="text-muted mb-4 fw-bold">{product.description}</p>

            <div className="d-flex align-items-center mb-4">
              <label htmlFor="quantity" className="h5 mr-3">Quantity:</label>
              <input
                type="number"
                id="quantity"
                className="form-control w-25"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                min="1"
              />
              <Button
                variant="danger"
                className="ml-3 w-25 m-4"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </div>
          </Col>
        </Row>
        <ToastContainer />
      </Container>

   
    </>
  );
};

export default ProductDetails;
