package com.portfolio.backend.controller;

import com.portfolio.backend.entity.User;
import com.portfolio.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Principal principal) {
        return userRepository.findByUsername(principal.getName())
                .map(user -> {
                    user.setPassword(null); // Hide password
                    return ResponseEntity.ok(user);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(Principal principal, @RequestBody User profileDetails) {
        return userRepository.findByUsername(principal.getName())
                .map(user -> {
                    user.setEmail(profileDetails.getEmail());
                    // Username usually doesn't change in simple setups
                    userRepository.save(user);
                    return ResponseEntity.ok(Map.of("message", "Profile updated successfully!"));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(Principal principal, @RequestBody Map<String, String> passwordData) {
        return userRepository.findByUsername(principal.getName())
                .map(user -> {
                    String newPassword = passwordData.get("newPassword");
                    user.setPassword(encoder.encode(newPassword));
                    userRepository.save(user);
                    return ResponseEntity.ok(Map.of("message", "Password changed successfully!"));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
