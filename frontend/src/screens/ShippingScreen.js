import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import {
  getShippingAddress,
  saveShippingAddress,
} from "../actions/cartActions";

const ShippingScreen = () => {
  const shipAddress = useSelector((state) => state.cartDetails.shippingAddress);

  const [fullName, setFullName] = useState(
    shipAddress ? shipAddress.recipientFullName : ""
  );
  const [mobileNumber, setMobileNumber] = useState(
    shipAddress ? shipAddress.recipientMobileNumber : ""
  );
  const [street, setStreet] = useState(shipAddress ? shipAddress.street : "");
  const [city, setCity] = useState(shipAddress ? shipAddress.city : "");
  const [postalCode, setPostalCode] = useState(
    shipAddress ? shipAddress.postalCode : ""
  );
  const [country, setCountry] = useState(
    shipAddress ? shipAddress.country : ""
  );

  const userData = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  const token = userData ? userData.jwtToken : null;
  const userId = userData ? userData.user.id : null;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const address = {
      recipientFullName: fullName,
      recipientMobileNumber: mobileNumber,
      street: street,
      city: city,
      postalCode: postalCode,
      country: country,
    };


    dispatch(saveShippingAddress(address, userId, token));

    navigate("/payment");
    
  };

  useEffect(() => {
    dispatch(getShippingAddress(userId, token));
  }, [userData]);

  useEffect(() => {
    if(localStorage.getItem("userInfo") == null)
      navigate("/login")
  }, [])

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1 style={{ padding: "12px" }}>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="fullName" className="my-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Full Name"
            value={fullName}
            required
            onChange={(e) => setFullName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="mobileNumber" className="my-3">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Mobile Number"
            value={mobileNumber}
            required
            onChange={(e) => setMobileNumber(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="street" className="my-3">
          <Form.Label>Street</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Street"
            value={street}
            required
            onChange={(e) => setStreet(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city" className="my-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode" className="my-3">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="statecountry" className="my-3">
          <Form.Label>State, Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter state, country"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
