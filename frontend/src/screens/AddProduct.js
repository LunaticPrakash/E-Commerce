import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch } from 'react-redux'
import { addNewProduct } from "../actions/productActions";
import { useNavigate } from "react-router-dom";
    
const AddProduct = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [numReviews, setNumReviews] = useState(0);
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);

  const submitHandler = (e) => {
    e.preventDefault();
    const product = {
      name: name,
      brand: brand,
      category: category,
      countInStock: countInStock,
      description: description,
      image: image,
      price: price,
      numReviews: 0,
      rating: 0,
    };


    dispatch(addNewProduct(product));

    navigate("/");
  };

  useEffect(() => {
    if(localStorage.getItem("userInfo") == null)
      navigate("/login")
  }, [])

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-3" controlId="brand">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="brand"
            placeholder="Enter brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-3" controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-3" controlId="countInStock">
          <Form.Label>Count In Stock</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Count In Stock"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            placeholder="Choose Image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></Form.Control>
        </Form.Group>
{/* 
        <Form.Group controlId="numReviews">
          <Form.Label>Number of Reviews</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter number of Reviews"
            value={numReviews}
            onChange={(e) => setNumReviews(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="rating">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          ></Form.Control>
        </Form.Group> */}

        <Button className="my-3" type="submit" variant="primary">
          Add Product
        </Button>
      </Form>

      {/* <Row className="py-3">
        <Col>
          Have an Account? <Link to="/login">Login</Link>
        </Col>
      </Row> */}
    </FormContainer>
  );
};

export default AddProduct;
