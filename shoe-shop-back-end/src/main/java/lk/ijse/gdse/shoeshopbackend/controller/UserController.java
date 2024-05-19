package lk.ijse.gdse.shoeshopbackend.controller;

import lk.ijse.gdse.shoeshopbackend.auth.request.SignInRequest;
import lk.ijse.gdse.shoeshopbackend.auth.request.SignUpRequest;
import lk.ijse.gdse.shoeshopbackend.auth.response.JwtAuthResponse;
import lk.ijse.gdse.shoeshopbackend.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {
    private final AuthenticationService authenticationService;

    @PostMapping("/signIn")
    public ResponseEntity<JwtAuthResponse> signIn(@RequestBody SignInRequest signInRequest){
        //System.out.println(signInRequest);
        return ResponseEntity.ok(authenticationService.signIn(signInRequest));
    }
    @PostMapping("/signUp")
    public ResponseEntity<JwtAuthResponse> signUp(@RequestBody SignUpRequest signUpRequest){
        return ResponseEntity.ok(authenticationService.signUp(signUpRequest));
    }
}
