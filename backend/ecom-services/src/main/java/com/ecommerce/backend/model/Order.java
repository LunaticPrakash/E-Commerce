package com.ecommerce.backend.model;

import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Table(name="orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "orderId")
    private long orderId;

    @Column(name = "userId")
    private long userId;

    @Column(name = "productId")
    private long productId;

    @Column(name = "productName")
    private String productName;

    @Column(name = "productPrice")
    private float productPrice;

    @Column(name = "productQuantity")
    private int productQuantity;

    @Column(name="orderDate")
    private String orderDate;

    @Column(name="paymentStatus")
    private String paymentStatus;

    @Column(name="transactionId")
    private String transactionId;

}
