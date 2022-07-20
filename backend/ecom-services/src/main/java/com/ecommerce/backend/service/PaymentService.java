package com.ecommerce.backend.service;

import com.ecommerce.backend.common.Payment;
import com.ecommerce.backend.common.TxnResponse;
import com.ecommerce.backend.model.Order;
import com.ecommerce.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class PaymentService {

    @Autowired
    OrderRepository repository;

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        // Do any additional configuration here
        return builder.build();
    }
    @Autowired
    private RestTemplate template;

    public TxnResponse placeOrder(Order order){
        Payment paymentReq = new Payment();
        paymentReq.setOrderId(order.getOrderId());
        paymentReq.setAmount(order.getProductQuantity()*order.getProductPrice());
        Payment paymentRes =
                template.postForObject("http://localhost:8081/payment/doPay/",
                        paymentReq, Payment.class);
        TxnResponse txResponse = new TxnResponse();
        txResponse.setOrder(order);
        txResponse.setStatus(paymentRes.getPaymentStatus());
        txResponse.setAmount(paymentRes.getAmount());
        txResponse.setTxId(paymentRes.getTxId());
        System.out.println("PS = " + paymentRes.getPaymentStatus());
        System.out.println("TI = " + paymentRes.getTxId());

        order.setPaymentStatus(paymentRes.getPaymentStatus());
        order.setTransactionId(paymentRes.getTxId());
        repository.save(order);
        return txResponse;
    }
}
