package com.ecommerce.payment.paymentservice.repository;

import com.ecommerce.payment.paymentservice.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PaymentRepository extends JpaRepository<Payment,Integer> {
}
