import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import {
  addItem,
  listCartItems,
  removeItem,
  saveCartDataToDB,
  updateItem,
} from "../actions/cartActions";
import Loader from "../components/Loader";

const CartScreen = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartDetails);
  const cartItems = useSelector((state) => state.cartDetails.cartItems);
  const allProducts = useSelector((state) => state.productList.products);

  const navigate = useNavigate();
  const [totalItems, setTotalItems] = useState(0);
  const [allCartProducts, setAllCartProducts] = useState([]);
  const [update, setUpdate] = useState(false);

  const userData = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  const token = userData ? userData.jwtToken : null;
  const role = userData ? userData.user.role[0].roleName : null;
  const userId = userData ? userData.user.id : null;
  console.log("token = ", token);

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  useEffect(() => {

    if(userId == null)
    return;

    let array = [];
    cartItems.forEach((item) => {
      allProducts.forEach((product) => {
        if (product.id == item.productId) {
          let temp = {
            ...product,
            productQuantity: item.productQuantity,
          };
          array.push(temp);
        }
      });
    });
    setAllCartProducts(array);
  }, [cartItems, update]);

  useEffect(() => {
    if (allProducts.length == 0) navigate("/");
    // return () => {
    //   console.log(changed);
    //   if (Object.keys(changed).length > 0) {
    //     console.log("if changed = ", changed);
    //     for (let id in changed) {
    //       console.log(id, changed[id]);
    //       saveCartDataToDB(id, changed[id]);
    //     }
    //   } else {
    //     console.log("else changed = ", changed);
    //   }
    // };
  }, []);

  useEffect(() => {
    if (localStorage.getItem("userInfo") == null) navigate("/login");
  }, []);

  return (
    <>
      <Row>
        {/* <Meta title='My Cart | Kosells' /> */}
        <Col md={8}>
          <h1>Shopping Cart.</h1>
          {cart ? (
            cart.loading ? (
              <Loader />
            ) : allCartProducts.length == 0 ? (
              <Message>
                Your Cart is empty. <Link to="/">Go Back.</Link>{" "}
              </Message>
            ) : (
              <ListGroup variant="flush">
                {allCartProducts.map((item) => (
                  <ListGroup.Item key={item.id}>
                    <Row
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Col md={2}>
                        <Image
                          className="product-image"
                          src={item.image}
                          alt={item.name}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col md={4}>
                        <Link to={`/product/${item.id}`}>{item.name}</Link>
                      </Col>
                      <Col
                        md={3}
                        className="d-none d-md-flex"
                        style={{
                          alignItems: "center",
                          justifyContent: "space-evenly",
                        }}
                      >
                        {item.price.toLocaleString("en-IN", {
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
                      {/* display this col only for larger screens */}
                      <Col
                        md={3}
                        className="d-none d-md-flex"
                        style={{
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <ButtonGroup aria-label="Addtocart">
                          <Button
                            style={{
                              outline: "none",
                              borderRight: "1px solid white",
                            }}
                            disabled={item.productQuantity >= item.countInStock}
                            onClick={() => {
                              setUpdate(!update);
                              updateItem(
                                dispatch,
                                item.id,
                                item.productQuantity + 1,
                                token
                              );
                            }}
                            variant="primary"
                          >
                            <i className="fas fa-plus" />
                          </Button>
                          <Button
                            style={{
                              outline: "none",
                              borderLeft: "1px solid white",
                            }}
                            variant="primary"
                            disabled={item.productQuantity === 1}
                            onClick={() => {
                              setUpdate(!update);
                              updateItem(
                                dispatch,
                                item.id,
                                item.productQuantity - 1,
                                token
                              );
                            }}
                          >
                            <i className="fas fa-minus" />
                          </Button>
                        </ButtonGroup>
                        <Button
                          type="button"
                          onClick={() => {
                            setUpdate(!update);
                            removeItem(dispatch, item.id, token);
                          }}
                        >
                          <i className="fas fa-trash" />
                        </Button>
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
                          {item.price.toLocaleString("en-IN", {
                            maximumFractionDigits: 2,
                            style: "currency",
                            currency: "INR",
                          })}

                          <div className="ms-1">
                            <i
                              style={{
                                fontSize: "0.7em",
                              }}
                              className="fas fa-times"
                            />{" "}
                            {item.productQuantity}
                          </div>
                        </div>

                        <div
                          className="d-flex"
                          style={{
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "50%",
                          }}
                        >
                          <Button
                            type="button"
                            onClick={() => {
                              setUpdate(!update);
                              removeItem(dispatch, item.id, token);
                            }}
                          >
                            <i className="fas fa-trash" />
                          </Button>
                          <Button
                            style={{
                              outline: "none",
                              borderRight: "1px solid white",
                            }}
                            disabled={item.productQuantity >= item.countInStock}
                            onClick={() => {
                              setUpdate(!update);
                              updateItem(
                                dispatch,
                                item.id,
                                item.productQuantity + 1,
                                token
                              );
                            }}
                            variant="primary"
                          >
                            <i className="fas fa-plus" />
                          </Button>
                          <Button
                            style={{
                              outline: "none",
                              borderLeft: "1px solid white",
                            }}
                            variant="primary"
                            disabled={item.productQuantity === 1}
                            onClick={() => {
                              setUpdate(!update);
                              updateItem(
                                dispatch,
                                item.id,
                                item.productQuantity - 1,
                                token
                              );
                            }}
                          >
                            <i className="fas fa-minus" />
                          </Button>
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
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Subtotal (
                  {allCartProducts.reduce(
                    (acc, item) => acc + item.productQuantity,
                    0
                  )}
                  ) items
                </h2>

                {allCartProducts
                  .reduce(
                    (acc, item) => acc + item.productQuantity * item.price,
                    0
                  )
                  .toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                    style: "currency",
                    currency: "INR",
                  })}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={allCartProducts.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
