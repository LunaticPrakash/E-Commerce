package com.ecommerce.backend.controller;

import com.ecommerce.backend.common.TxnResponse;
import com.ecommerce.backend.model.Cart;
import com.ecommerce.backend.model.Order;
import com.ecommerce.backend.model.Order;
import com.ecommerce.backend.model.ShippingAddress;
import com.ecommerce.backend.repository.OrderRepository;
import com.ecommerce.backend.repository.ShippingAddressRepository;
import com.ecommerce.backend.service.PaymentService;
import com.twilio.Twilio;
import com.twilio.converter.Promoter;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.rest.lookups.v1.PhoneNumber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin()
@RestController
@RequestMapping("/api/")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private ShippingAddressRepository shippingAddressRepository;

    @GetMapping("/orders")
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @GetMapping("/orders/{id}")
    public List<Order> getOrderForUser(@PathVariable Long id) {
        List<Order> userOrder = new ArrayList<>();
        List<Order> allOrderedProducts = getAllOrders();
        for (Order orderedItem : allOrderedProducts) {
            if (orderedItem.getUserId() == id) {
                userOrder.add(orderedItem);
            }
        }
        return userOrder;
    }

    @PostMapping("/order")
    public TxnResponse createOrder(@RequestBody Order order) {
        return  paymentService.placeOrder(order);

    }

}
