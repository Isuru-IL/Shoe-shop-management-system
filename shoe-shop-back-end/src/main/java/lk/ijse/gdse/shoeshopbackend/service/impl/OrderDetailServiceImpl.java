package lk.ijse.gdse.shoeshopbackend.service.impl;

import lk.ijse.gdse.shoeshopbackend.dto.OrderDTO;
import lk.ijse.gdse.shoeshopbackend.entity.Customer;
import lk.ijse.gdse.shoeshopbackend.entity.Order;
import lk.ijse.gdse.shoeshopbackend.entity.OrderDetail;
import lk.ijse.gdse.shoeshopbackend.repository.CustomerRepo;
import lk.ijse.gdse.shoeshopbackend.repository.OrderDetailRepo;
import lk.ijse.gdse.shoeshopbackend.repository.OrderRepo;
import lk.ijse.gdse.shoeshopbackend.service.OrderDetailService;
import lk.ijse.gdse.shoeshopbackend.util.CustomerLoyaltyLevel;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderDetailServiceImpl implements OrderDetailService {
    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private OrderDetailRepo orderDetailRepo;

    private CustomerRepo customerRepo;

    @Autowired
    private ModelMapper mapper;
    @Override
    public List<OrderDTO> getAllRefundOrders() {
        return orderRepo.getAllRefundOrders().stream().map(order -> mapper.map(order,OrderDTO.class)).toList();
    }

    @Override
    public boolean refundOrder(String orderId) {
        if (orderRepo.existsById(orderId)) {
            System.out.println("Refund Order");
            //remove customer added points ////////////////////////////////////////////////
            Order refundOrder = orderRepo.findByOrderId(orderId);
            System.out.println(refundOrder);
            /*//System.out.println(refundOrder.getCustomer_id().getCode());
            Customer customer = customerRepo.findByCode(refundOrder.getCustomer_id().getCode());
            //System.out.println(customer);

            int currentPoints = customer.getLoyaltyPoints();
            int reducePoints = refundOrder.getAddedPoints();
            int newPoints = currentPoints-reducePoints;

            CustomerLoyaltyLevel loyaltyLevel = null;
            if (newPoints < 10){
                loyaltyLevel = CustomerLoyaltyLevel.NEW;
            }else if (newPoints >= 10 && newPoints<30){
                loyaltyLevel = CustomerLoyaltyLevel.BRONZE;
            } else if (newPoints >= 30 && newPoints<100) {
                loyaltyLevel = CustomerLoyaltyLevel.SILVER;
            } else if (newPoints >= 100) {
                loyaltyLevel = CustomerLoyaltyLevel.GOLD;
            }
            customer.setLoyaltyLevel(loyaltyLevel);
            customer.setLoyaltyPoints(newPoints);
            System.out.println(customer);
            //customerRepo.save(customer);

            //Reduce item qty /////////////////////////////////////////////////////////////
            List<OrderDetail> orderDetailsByOrderId = orderDetailRepo.findOrderDetailsByOrderId(orderId);
            System.out.println(orderDetailsByOrderId);*/

            //orderRepo.deleteById(orderId);
            return true;
        } else {
            return false;
        }
    }
}
