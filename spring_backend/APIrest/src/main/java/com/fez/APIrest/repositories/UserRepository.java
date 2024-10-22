package com.fez.APIrest.repositories;

import com.fez.APIrest.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository <User, Long> {

    
}
