import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ButtonGroup,
  ListGroup,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";

const OrderScreen = () => {
  const orders = useSelector((state) => state.order);
  const orderItems = orders.orderItems;
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userInfo") == null) navigate("/login");
  }, []);

  console.log("orders = ", orders);

  useEffect(() => {
    if (!orders) navigate("/");
  },[]);

  return (
    <>
      <Row>
        {/* <Meta title='My Cart | Kosells' /> */}
        <Col md={15}>
          <h1>My Orders</h1>
          {orderItems ? (
            orders.loading ? (
              <Loader />
            ) : orderItems.length == 0 ? (
              <Message>
                No order exists.{" "}
                <Link style={{ color: "blue" }} to="/">
                  Buy some products.
                </Link>{" "}
              </Message>
            ) : (
              <ListGroup variant="flush">
                {orderItems.map((item) => (
                  <ListGroup.Item key={item.productId}>
                    <Row
                      style={{
                        display: "flex",
                        alignItems: "center",
                        border: "2px solid grey",
                        padding: "4px",
                        margin: "4px",
                      }}
                    >
                      {/* <Col md={2}>
                        <Image
                          className="product-image"
                          src={item.image}
                          alt={item.name}
                          fluid
                          rounded
                        />
                      </Col> */}
                      <Col>
                        <Link to={`/product/${item.productId}`}>
                          {item.productName}
                        </Link>
                      </Col>
                      <Col
                        className="d-none d-md-flex"
                        style={{
                          alignItems: "center",
                          justifyContent: "space-evenly",
                        }}
                      >
                        {item.productPrice.toLocaleString("en-IN", {
                          maximumFractionDigits: 2,
                          style: "currency",
                          currency: "INR",
                        })}

                        <div>
                          <i
                            style={{ fontSize: "0.7em" }}
                            className="fas fa-times"
                          />{" "}
                          {item.productQuantity}
                        </div>
                      </Col>

                      <Col>
                        <p>{item.orderDate}</p>
                      </Col>

                      <Col>
                        <p>{item.paymentStatus}</p>
                      </Col>

                      <Col>
                        <p>{item.transactionId}</p>
                      </Col>

                      {/* display this col only on mobile screens */}
                      <Col
                        className="d-flex d-md-none mt-2"
                        style={{
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          className="d-flex"
                          style={{
                            fontSize: "1.2em",
                            width: "50%",
                          }}
                        >
                          {item.productPrice.toLocaleString("en-IN", {
                            maximumFractionDigits: 2,
                            style: "currency",
                            currency: "INR",
                          })}

                          <div>
                            <i
                              style={{
                                fontSize: "0.7em",
                              }}
                              className="fas fa-times"
                            />{" "}
                            {item.productQuantity}
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )
          ) : (
            <Loader />
          )}
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
