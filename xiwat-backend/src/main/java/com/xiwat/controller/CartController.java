package com.xiwat.controller;

import com.xiwat.model.CartItem;
import com.xiwat.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    @PostMapping
    public CartItem addToCart(@RequestBody CartItem cartItem) {
        return cartRepository.save(cartItem);
    }

    @GetMapping("/{email}")
    public List<CartItem> getCart(@PathVariable String email) {
        return cartRepository.findByUserEmail(email);
    }
}
