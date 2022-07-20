import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { deleteProduct, listProductDetails } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  addItem,
  deleteItem,
  saveCartDataToDB,
  updateItem,
} from "../actions/cartActions";

const ProductScreen = ({ history, match }) => {
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const productEditURL = `/productedit/${id}`;
  const productDetails = useSelector((state) => state.productDetails);
  const cartItems = useSelector((state) => state.cartDetails.cartItems);

  const userData = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  const token = userData ? userData.jwtToken : null;
  const role = userData ? userData.user.role[0].roleName : null;
  const userId = userData ? userData.user.id : null;

  const addToCartHandler = () => {
    if (localStorage.getItem("userInfo") == null) navigate("/login");
    let oldQuantity = 0;
    if (cartItems) {
      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].productId == parseInt(id)) {
          oldQuantity = cartItems[i].productQuantity;
          const totalQuantity = parseInt(oldQuantity) + parseInt(quantity);
          if (totalQuantity <= productDetails.products.countInStock) {
            updateItem(dispatch, id, totalQuantity, userId, token);
            // saveCartDataToDB(id, totalQuantity);
            return navigate(`/cart`);
          } else {
            return alert(
              "You have selected more quantity than available stock!"
            );
          }
        }
      }
    } else {
      oldQuantity = 0;
    }
    addItem(dispatch, id, parseInt(oldQuantity) + parseInt(quantity), userId, token);
    navigate(`/cart`);
  };

  const deleteProductHandler = async () => {
    await deleteProduct(dispatch, id);
    navigate(`/`);
  };

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch]);

  return (
    <>
      <h3>Product Details</h3>
      <Link className="btn btn-dark my-3" to="/">
        Go back{" "}
      </Link>

      {role == "Admin" && (
        <Link className="btn btn-dark my-3 mx-5" to={productEditURL}>
          Edit Product{" "}
        </Link>
      )}

      {role == "Admin" && (
        <Button className="btn btn-dark my-3" onClick={deleteProductHandler}>
          Delete Product{" "}
        </Button>
      )}

      {productDetails ? (
        productDetails.loading ? (
          <Loader />
        ) : productDetails.products ? (
          <Row>
            <Col md={6}>
              <Image
                src={productDetails.products.image}
                alt={productDetails.products.name}
                fluid
              />
            </Col>

            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{productDetails.products.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={productDetails.products.rating}
                    text={`${productDetails.products.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  Price:{" "}
                  {productDetails.products.price.toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                    style: "currency",
                    currency: "INR",
                  })}
                </ListGroup.Item>
                <ListGroup.Item>
                  Description:{productDetails.products.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>
                          {productDetails.products.price.toLocaleString(
                            "en-IN",
                            {
                              maximumFractionDigits: 2,
                              style: "currency",
                              currency: "INR",
                            }
                          )}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {productDetails.products.countInStock > 0
                          ? "In Stock"
                          : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {productDetails.products.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          <strong>Qty:</strong>
                        </Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                          >
                            {/* create as many options as the countInStock */}
                            {[
                              ...Array(
                                productDetails.products.countInStock
                              ).keys(),
                            ].map((ele) => {
                              return (
                                <option key={ele + 1} value={ele + 1}>
                                  {ele + 1}
                                </option>
                              );
                            })}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn btn-block"
                      type="button"
                      disabled={productDetails.products.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </card>
            </Col>
          </Row>
        ) : (
          <Message variant="danger">{productDetails.error}</Message>
        )
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ProductScreen;
