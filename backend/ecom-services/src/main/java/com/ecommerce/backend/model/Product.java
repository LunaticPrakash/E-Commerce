package com.ecommerce.backend.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "products")
public class Product {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private long id;

        @Column(name = "name")
        private String name;

        @Column(name = "image")
        private String image;

        @Column(name = "description")
        private String description;

        @Column(name = "brand")
        private String brand;

        @Column(name = "category")
        private String category;

        @Column(name = "price")
        private float price;

        @Column(name = "countInStock")
        private int countInStock;

        @Column(name = "rating")
        private float rating;

        @Column(name = "numReviews")
        private float numReviews;

//        @OneToMany(cascade = CascadeType.ALL)
//        @JoinColumn(name = "fk_product_id", referencedColumnName = "id")
//        private Set<Cart> coachGroups = new HashSet<Cart>();


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public int getCountInStock() {
        return countInStock;
    }

    public void setCountInStock(int countInStock) {
        this.countInStock = countInStock;
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public float getNumReviews() {
        return numReviews;
    }

    public void setNumReviews(float numReviews) {
        this.numReviews = numReviews;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", image='" + image + '\'' +
                ", description='" + description + '\'' +
                ", brand='" + brand + '\'' +
                ", category='" + category + '\'' +
                ", price=" + price +
                ", countInStock=" + countInStock +
                ", rating=" + rating +
                ", numReviews=" + numReviews +
                '}';
    }
}
