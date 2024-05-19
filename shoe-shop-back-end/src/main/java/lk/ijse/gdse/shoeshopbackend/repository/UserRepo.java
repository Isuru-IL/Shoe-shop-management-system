package lk.ijse.gdse.shoeshopbackend.repository;

import lk.ijse.gdse.shoeshopbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User,String > {
    Optional<User> findByEmail(String email);

    User getAllByEmail(String email);
}
