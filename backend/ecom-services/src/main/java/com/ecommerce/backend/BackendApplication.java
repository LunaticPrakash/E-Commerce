package com.ecommerce.backend;

import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.repository.ProductRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Arrays;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

//   @Bean
//   public ApplicationRunner initializer(ProductRepository repository) {
//       return args -> repository.saveAll(Arrays.asList(
//               Product.builder().name("Airpods Wireless Bluetooth Headphones").image("/images/airpods.jpg").description("Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working").brand("Apple").category("Electronics").countInStock(7).rating(4.5f).numReviews(102).price(17999f).build(),
//               Product.builder().name("iPhone 11 Pro 256GB Memory").image("/images/phone.jpg").description("Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life").brand("Apple").category("Electronics").countInStock(10).rating(4f).numReviews(5).price(80580f).build(),
//               Product.builder().name("Cannon EOS 80D DSLR Camera").image("/images/camera.jpg").description("Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design").brand("Cannon").category("Electronics").countInStock(6).rating(5f).numReviews(20).price(16000f).build(),
//               Product.builder().name("Sony Playstation 4 Pro White Version").image("/images/playstation.jpg").description("The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music").brand("Sony").category("Electronics").countInStock(3).rating(4.5f).numReviews(12).price(23880f).build(),
//               Product.builder().name("Logitech G-Series Gaming Mouse").image("/images/mouse.jpg").description("Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience").brand("Logitech").category("Electronics").countInStock(1).rating(3.5f).numReviews(12).price(1200f).build(),
//               Product.builder().name("Amazon Echo Dot 3rd Generation").image("/images/alexa.jpg").description("Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space").brand("Amazon").category("Electronics").countInStock(2).rating(2.5f).numReviews(6).price(3299f).build()
//
//               ));
//   }

//    @Bean
//    public ApplicationRunner initializer(CartRepository repository) {
//        return args -> repository.saveAll(Arrays.asList(
//                Cart.builder().userId(1).productId(3).productQuantity(1).build(),
//                Cart.builder().userId(2).productId(1).productQuantity(2).build(),
//                Cart.builder().userId(1).productId(1).productQuantity(1).build(),
//                Cart.builder().userId(2).productId(2).productQuantity(2).build(),
//                Cart.builder().userId(5).productId(4).productQuantity(1).build()
//                ));
//    }
}
