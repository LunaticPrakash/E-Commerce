import React, { useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch(savePaymentMethod(paymentMethod))
    const paymentData = {
      "method":paymentMethod,
      "name": name,
      "cardNumber": cardNumber,
      "cvv": cvv,
      "expiryDate": expiryDate,
    };
    if (paymentMethod == "Credit/Debit Card") {
      localStorage.setItem("paymentInfo", JSON.stringify(paymentData));
    }
    else{
      localStorage.setItem("paymentInfo", JSON.stringify(paymentData));
    }
    navigate("/placeorder", {
      paymentMethod: { paymentMethod },
    });
  };

  useEffect(() => {
    if (localStorage.getItem("userInfo") == null) navigate("/login");
  }, []);

  return (
    <FormContainer>
      {/* three steps are done in the checkout process */}
      <CheckoutSteps step1 step2 step3 />
      <div
        style={{
          display: "flex",
          flexFlow: "column nowrap",
          alignItems: "center",
        }}
      >
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Col>
              <Form.Check
                inline
                type="radio"
                label="Credit/Debit Card"
                id="Credit/Debit Card"
                name="paymentMethod"
                value="Credit/Debit Card"
                checked={paymentMethod === "Credit/Debit Card"}
                onChange={handleChange}
              />
              <Form.Check
                defaultChecked={true}
                inline
                type="radio"
                label="Cash on Delivery"
                id="cod"
                name="paymentMethod"
                value="Cash on Delivery"
                checked={true}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <div className="d-grid">
            <Button
              style={{ textAlign: "center" }}
              type="submit"
              className="mx-5 my-3"
              size="md"
            >
              Continue
            </Button>
          </div>
        </Form>

        {paymentMethod ? (
          paymentMethod == "Credit/Debit Card" ? (
            <div className="card-details hidden">
              <h3 style={{ margin: "20px" }}>Enter Card Details</h3>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                  <Form.Label>Card Holder's Name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="my-3" controlId="cardnumber">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Card Number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="my-3" controlId="cvv">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="my-3" controlId="expirydate">
                  <Form.Label>Expiry Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Button className="my-3" type="submit" variant="primary">
                  Continue
                </Button>
              </Form>
            </div>
          ) : (
            <h4>Cash on Delivery</h4>
          )
        ) : (
          <></>
        )}
      </div>
    </FormContainer>
  );
};

export default PaymentScreen;
