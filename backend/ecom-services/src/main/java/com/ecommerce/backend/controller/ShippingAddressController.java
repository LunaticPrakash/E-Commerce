package com.ecommerce.backend.controller;

import com.ecommerce.backend.model.Cart;
import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.model.ShippingAddress;
import com.ecommerce.backend.repository.ShippingAddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5000")
@RestController
@RequestMapping("/api/")

public class ShippingAddressController {

    @Autowired
    private ShippingAddressRepository shippingAddressRepository;

    @GetMapping("/shippingAddress")
    public List<ShippingAddress> getShippingAddresses(){
        return shippingAddressRepository.findAll();
    }

    @GetMapping("/shippingAddress/{id}")
    public ShippingAddress getShippingAddresses(@PathVariable Long id){
        List<ShippingAddress> allShippingAddresses = getShippingAddresses();
        for (ShippingAddress address : allShippingAddresses) {
            if (address.getUserId() == id)
                return address;
        }
        return null;
    }

    @PostMapping("/shippingAddress")
    public ResponseEntity<ShippingAddress> addShippingAddress(@RequestBody ShippingAddress shippingAddress) {
        List<ShippingAddress> allShippingAddresses = getShippingAddresses();
        for (ShippingAddress address : allShippingAddresses) {
            if (address.getUserId() == shippingAddress.getUserId()) {
                ShippingAddress existingItem = address;
                existingItem.setRecipientFullName(shippingAddress.getRecipientFullName());
                existingItem.setRecipientMobileNumber(shippingAddress.getRecipientMobileNumber());
                existingItem.setCity(shippingAddress.getCity());
                existingItem.setStreet(shippingAddress.getStreet());
                existingItem.setPostalCode(shippingAddress.getPostalCode());
                existingItem.setCountry(shippingAddress.getCountry());

                ShippingAddress updatedItem = shippingAddressRepository.save(existingItem);
                return ResponseEntity.ok().body(updatedItem);
            }
        }
        ShippingAddress item = shippingAddressRepository.save(shippingAddress);
        return ResponseEntity.ok().body(item);
    }

}
