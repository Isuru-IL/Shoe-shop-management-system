package lk.ijse.gdse.shoeshopbackend.service.impl;

import lk.ijse.gdse.shoeshopbackend.dto.CustomDTO;
import lk.ijse.gdse.shoeshopbackend.dto.OrderDTO;
import lk.ijse.gdse.shoeshopbackend.dto.OrderDetailDTO;
import lk.ijse.gdse.shoeshopbackend.dto.SupplierDTO;
import lk.ijse.gdse.shoeshopbackend.embedded.OrderDetailPK;
import lk.ijse.gdse.shoeshopbackend.entity.*;
import lk.ijse.gdse.shoeshopbackend.repository.CustomerRepo;
import lk.ijse.gdse.shoeshopbackend.repository.InventoryRepo;
import lk.ijse.gdse.shoeshopbackend.repository.OrderDetailRepo;
import lk.ijse.gdse.shoeshopbackend.repository.OrderRepo;
import lk.ijse.gdse.shoeshopbackend.service.OrderDetailService;
import lk.ijse.gdse.shoeshopbackend.service.exception.NotFoundException;
import lk.ijse.gdse.shoeshopbackend.util.CustomerLoyaltyLevel;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderDetailServiceImpl implements OrderDetailService {
    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private OrderDetailRepo orderDetailRepo;

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private InventoryRepo inventoryRepo;

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
            System.out.println(refundOrder.getCustomer_id().getCode());
            //System.out.println(refundOrder.getCustomer_id().getCode());
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
            System.out.println("loyaltyLevel = "+customer.getLoyaltyLevel());
            System.out.println("loyaltyPoints = "+customer.getLoyaltyPoints());
            customerRepo.save(customer);

            //Reduce item qty /////////////////////////////////////////////////////////////
            List<OrderDetail> orderDetailsByOrderId = orderDetailRepo.findOrderDetailsByOrderId(orderId);
            for (OrderDetail orderDetail : orderDetailsByOrderId) {
                String itemCode = orderDetail.getOrderDetailPK().getItem_code();
                String size = orderDetail.getOrderDetailPK().getSize();
                int availableQty = inventoryRepo.findQtyByItemCodeAndSize(itemCode, size);
                int newQty = availableQty + orderDetail.getItemQty();

                /*System.out.println("itemCode = "+itemCode);
                System.out.println("size ="+newQty);*/

                String status;
                if (newQty<=0){
                    status="Not Available";
                } else if (newQty<10) {
                    status="Low";
                } else {
                    status="Available";
                }
                inventoryRepo.updateByItemCodeAndSize(newQty, status, itemCode,size);
            }

            orderRepo.deleteById(orderId);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean refundOrderDetails(CustomDTO customDTO) {
        OrderDetailPK pk = new OrderDetailPK(customDTO.getOrderId(),customDTO.getItemCode(),customDTO.getSize());
        if (orderDetailRepo.existsById(pk)){
            /*Update order total //////////////////*/
            Order order = orderRepo.findByOrderId(customDTO.getOrderId());
            if (order != null){
                double newTotalPrice = order.getTotalPrice() - customDTO.getUnitTotalPrice();
                order.setTotalPrice(newTotalPrice);
                orderRepo.save(order);
            }

            /*Update Item qty /////////////////////*/
            String itemCode = customDTO.getItemCode();
            String size = customDTO.getSize();
            int availableQty = inventoryRepo.findQtyByItemCodeAndSize(itemCode, size);
            int newQty = availableQty + customDTO.getQty();

            String status;
            if (newQty<=0){
                status="Not Available";
            } else if (newQty<10) {
                status="Low";
            } else {
                status="Available";
            }
            inventoryRepo.updateByItemCodeAndSize(newQty, status, itemCode,size);


            /*Delete order detail /////////////////*/
            orderDetailRepo.deleteById(pk);

            /*Delete order ////////////////////////*/
            if (customDTO.getArrayLength() == 0){
                orderRepo.deleteById(customDTO.getOrderId());
                //System.out.println("Delete Order");
            }
            //System.out.println("exists");
            return true;
        } else {
            return false;
        }
    }

    @Override
    public OrderDTO getOrderByOrderId(String orderId) {
        if (!orderRepo.existsById(orderId)){
            throw new NotFoundException("Order Id does not exists!");
        }
        Order order = orderRepo.findOrderByOrderId(orderId);
        return mapper.map(order, OrderDTO.class);
    }

    @Override
    public List<OrderDetailDTO> getOrderDetailListByOrderId(String orderId) {
        List<OrderDetail> details = orderDetailRepo.findOrderDetailsByOrderId(orderId);
        List<OrderDetailDTO> detailDTOS = new ArrayList<>();
        for (OrderDetail detail : details) {
            OrderDetailDTO dto = new OrderDetailDTO(
                    detail.getOrderDetailPK().getOrder_id(),
                    detail.getOrderDetailPK().getItem_code(),
                    detail.getItemName(),
                    detail.getOrderDetailPK().getSize(),
                    detail.getUnitPrice(),
                    detail.getItemQty()
            );
            detailDTOS.add(dto);
        }
        return detailDTOS;
    }
}
