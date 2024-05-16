package lk.ijse.gdse.shoeshopbackend.service;

import lk.ijse.gdse.shoeshopbackend.dto.OrderDTO;

import java.util.List;

public interface OrderDetailService {
    List<OrderDTO> getAllRefundOrders();
    boolean refundOrder(String orderId);
    OrderDTO getOrderByOrderId(String orderId);
}
