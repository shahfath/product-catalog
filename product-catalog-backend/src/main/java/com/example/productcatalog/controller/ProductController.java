package com.example.productcatalog.controller;

import com.example.productcatalog.model.Product;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/products")
public class ProductController {
    private List<Product> products = new ArrayList<>();
    private final AtomicLong idGenerator = new AtomicLong(1);

    public ProductController() {
        products.add(new Product(idGenerator.getAndIncrement(),
         "Smartphone",
         "A high-performance smartphone with a stunning display and long-lasting battery.",
         799.99,
         "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1vYmlsZSUyMHBob25lfGVufDB8fDB8fHww"
        ));
        products.add(new Product(idGenerator.getAndIncrement(), 
         "Smartwatch",
         "A sleek smartwatch with fitness tracking and customizable watch faces.",
         249.99,
         "https://media.istockphoto.com/id/1286099942/photo/close-up-of-hand-touching-smartwatch-with-health-app-on-the-screen-gadget-for-fitness-active.webp?a=1&b=1&s=612x612&w=0&k=20&c=3hQz5H3ZEeL6HnntJIj8m1w6W9z4xDUlY7Z2dMQtlgM="
        ));
        products.add(new Product(idGenerator.getAndIncrement(),
         "Laptop",
         "A lightweight laptop with a sharp display, perfect for work or entertainment.",
         1499.99,
         "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDN8fHRhYmxldHxlbnwwfHx8fDE2OTE0NTcxMDM&ixlib=rb-1.2.1&q=80&w=400"
        ));
    }

    @GetMapping
    public List<Product> getProducts() {
        return products;
    }

    @PostMapping
    public void addProduct(@RequestBody Product product) {
        product.setId(idGenerator.getAndIncrement()); 
        products.add(product);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        products.removeIf(product -> product.getId().equals(id));
    }
}

