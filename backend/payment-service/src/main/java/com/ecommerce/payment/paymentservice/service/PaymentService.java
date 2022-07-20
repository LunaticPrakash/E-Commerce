package com.ecommerce.payment.paymentservice.service;

import com.ecommerce.payment.paymentservice.entity.Payment;
import com.ecommerce.payment.paymentservice.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.Random;
import java.util.UUID;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository repository;

    public Payment doPay(Payment payment){
        payment.setPaymentStatus(paymentStatus());
        payment.setTxId(UUID.randomUUID().toString());
        return repository.save(payment);
    }

    private String paymentStatus(){
        //mocking a 3rd party payment call like Gpay,Paytm,etc.
//        return new Random().nextBoolean()?"Success":"Failure";
            return "Success";
    }
}
