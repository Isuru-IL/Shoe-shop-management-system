package lk.ijse.gdse.shoeshopbackend.service.impl;

import lk.ijse.gdse.shoeshopbackend.dto.MostSoldItemDTO;
import lk.ijse.gdse.shoeshopbackend.entity.Inventory;
import lk.ijse.gdse.shoeshopbackend.entity.Order;
import lk.ijse.gdse.shoeshopbackend.repository.CustomerRepo;
import lk.ijse.gdse.shoeshopbackend.repository.InventoryRepo;
import lk.ijse.gdse.shoeshopbackend.repository.OrderDetailRepo;
import lk.ijse.gdse.shoeshopbackend.repository.OrderRepo;
import lk.ijse.gdse.shoeshopbackend.service.AdminPanelService;
import lk.ijse.gdse.shoeshopbackend.util.CustomerLoyaltyLevel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminServiceImpl implements AdminPanelService {
    @Autowired
    private OrderRepo orderRepo;
    private OrderDetailRepo orderDetailRepo;
    @Autowired
    private CustomerRepo customerRepo;
    @Autowired
    private InventoryRepo inventoryRepo;

    @Override
    public Integer getOrdersCountForDate(LocalDate date) {
        Timestamp startOfDay = Timestamp.valueOf(date.atStartOfDay());
        Timestamp endOfDay = Timestamp.valueOf(date.atTime(LocalTime.MAX));
        return orderRepo.countOrdersForDate(startOfDay, endOfDay);
    }
    @Override
    public Double getTotalPriceForDate(LocalDate date) {
        Timestamp startOfDay = Timestamp.valueOf(date.atStartOfDay());
        Timestamp endOfDay = Timestamp.valueOf(date.atTime(LocalTime.MAX));
        return orderRepo.sumTotalPriceForDate(startOfDay, endOfDay);
    }

    @Override
    public Integer getGoldCustomerCount() {
        Integer count = customerRepo.countByLoyaltyLevel(CustomerLoyaltyLevel.GOLD);
        if (count == null){
            count = 0;
        }
        return count;
    }
    @Override
    public Map<String, Object> getMostSoldItemByDate(LocalDate date){
        List<MostSoldItemDTO> result = inventoryRepo.findMostSoldItemByDate(date);
        Map<String, Object> response = new HashMap<>();
        if (!result.isEmpty()) {
            MostSoldItemDTO mostSoldItemDTO = result.get(0);
            Inventory mostSoldItem = mostSoldItemDTO.getInventory();
            Long totalQty = mostSoldItemDTO.getTotalQty();

            response.put("mostSoldItemName", mostSoldItem.getDescription());
            response.put("mostSoldItemPicture", mostSoldItem.getItemPic());
            response.put("mostSoldItemQty", totalQty);
        } else {
            response.put("mostSoldItemName", null);
            response.put("mostSoldItemPicture", null);
            response.put("mostSoldItemQty", 0);
        }
        return response;
    }

    @Override
    public Double getTotalProfitForDate(LocalDate date) {
        /*List<Inventory> mostSoldItem = inventoryRepo.findMostSoldItemByDate(date);

        if (!mostSoldItem.isEmpty()){
            Inventory inventory = mostSoldItem.get(0);
            System.out.println(inventory.getOrderDetails().get(0).getOrderDetailPK().getItem_code());
            System.out.println(inventory.getOrderDetails().get(0).getItemQty());
        }*/
        return 45.6;
    }

}
