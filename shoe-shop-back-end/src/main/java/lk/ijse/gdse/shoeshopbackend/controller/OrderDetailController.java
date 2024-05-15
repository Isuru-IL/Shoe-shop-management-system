package lk.ijse.gdse.shoeshopbackend.controller;

import lk.ijse.gdse.shoeshopbackend.dto.OrderDTO;
import lk.ijse.gdse.shoeshopbackend.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/orderDetail")
@CrossOrigin(origins = "*")
public class OrderDetailController {
    @Autowired
    private OrderDetailService orderDetailService;

    @GetMapping("/getAllRefundOrders")
    public List<OrderDTO> getAllRefundOrders(){
        return orderDetailService.getAllRefundOrders();
    }

    @DeleteMapping("/refundOrder")
    public ResponseEntity<String> refundOrder(@RequestParam String orderId) {
        System.out.println("refundOrder = "+orderId);
        try {
            boolean isRefunded = orderDetailService.refundOrder(orderId);
            if (isRefunded) {
                return ResponseEntity.ok("Order refunded successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while refunding the order");
        }
    }
}
