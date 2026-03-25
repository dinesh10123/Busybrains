package com.portfolio.backend.config;

import com.portfolio.backend.entity.Product;
import com.portfolio.backend.entity.User;
import com.portfolio.backend.repository.ProductRepository;
import com.portfolio.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    PasswordEncoder encoder;

    @Override
    public void run(String... args) throws Exception {
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@example.com");
            admin.setPassword(encoder.encode("admin123"));
            admin.setRole("ROLE_ADMIN");
            userRepository.save(admin);
        }

        if (!userRepository.existsByUsername("user")) {
            User user = new User();
            user.setUsername("user");
            user.setEmail("user@example.com");
            user.setPassword(encoder.encode("user123"));
            user.setRole("ROLE_USER");
            userRepository.save(user);
        }

        // Force refresh products for the new UI images - Final Verification 2
        productRepository.deleteAll();
        
        if (productRepository.count() == 0) {
            productRepository.save(new Product(null, "iPhone 15 Pro", "Apple iPhone 15 Pro, 256GB, Titanium Blue", 1099.0, "https://loremflickr.com/800/800/iphone-15-pro?lock=1"));
            productRepository.save(new Product(null, "MacBook Pro 14", "M3 Pro Chip, 16GB RAM, 512GB SSD", 1999.0, "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800"));
            productRepository.save(new Product(null, "Sony WH-1000XM5", "Wireless Noise Cancelling Headphones, Black", 349.0, "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800"));
            productRepository.save(new Product(null, "iPad Pro M2", "12.9-inch Liquid Retina XDR Display, 256GB", 1099.0, "https://images.unsplash.com/photo-1561154464-82e9adf32764?q=80&w=800"));
            productRepository.save(new Product(null, "Apple Watch Ultra", "The most rugged and capable Apple Watch ever.", 799.0, "https://loremflickr.com/800/800/applewatch-ultra?lock=2"));
            productRepository.save(new Product(null, "DJI Mavic 3", "Flagship Triple-Camera System Drone", 2199.0, "https://loremflickr.com/800/800/dji-mavic-drone?lock=3"));
            productRepository.save(new Product(null, "MX Master 3S", "Advanced Wireless Mouse, Silent Clicks", 99.0, "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=800"));
            productRepository.save(new Product(null, "Samsung G9", "49\" Dual QHD Curved Gaming Monitor", 1299.0, "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800"));
        }
    }
}
