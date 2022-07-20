import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getShippingAddress, listCartItems } from "../actions/cartActions";
import { listOrderedItems } from "../actions/orderAction";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const userData = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const token = userData ? userData.jwtToken : null;
const role = userData ? userData.user.role[0].roleName : null;
const userId = userData ? userData.user.id : null;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listCartItems(userId,token));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getShippingAddress(userId,token))
  }, [dispatch]);


  useEffect(() => {
    dispatch(listOrderedItems(userId,token))
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {productList ? (
        productList.loading ? (
          <Loader />
        ) : productList.products ? (
          <Row>
            {productList.products.map((product) => {
              return (
                <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
        ) : (
          <Message variant="danger">{productList.error}</Message>
        )
      ) : (
        <Loader />
      )}
    </>
  );
};

export default HomeScreen;
