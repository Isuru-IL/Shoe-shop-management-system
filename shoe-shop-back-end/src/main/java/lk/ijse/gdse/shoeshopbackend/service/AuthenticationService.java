package lk.ijse.gdse.shoeshopbackend.service;

import lk.ijse.gdse.shoeshopbackend.auth.request.SignInRequest;
import lk.ijse.gdse.shoeshopbackend.auth.request.SignUpRequest;
import lk.ijse.gdse.shoeshopbackend.auth.response.JwtAuthResponse;

import java.util.List;

public interface AuthenticationService {
    JwtAuthResponse signIn(SignInRequest signInRequest);
    JwtAuthResponse signUp(SignUpRequest signUpRequest);

    List<String> sendWishes();
}
