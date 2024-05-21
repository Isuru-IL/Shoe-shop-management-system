package lk.ijse.gdse.shoeshopbackend.controller;

import lk.ijse.gdse.shoeshopbackend.service.AdminPanelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/v1/adminPanel")
@CrossOrigin(origins = "*")
public class AdminPanelController {
    @Autowired
    private AdminPanelService adminPanelService;
    @GetMapping("/getSummeryForToday")
    public Map<String, Object> getSummaryForToday(@RequestParam("date") String dateString) {
        LocalDate date = LocalDate.parse(dateString);
        Map<String, Object> response = new HashMap<>();
        response.put("ordersCount", adminPanelService.getOrdersCountForDate(date));
        response.put("totalPrice", adminPanelService.getTotalPriceForDate(date));
        response.put("goldCusCount", adminPanelService.getGoldCustomerCount());
        return response;
    }

    @GetMapping("/getSummeryForSelectedDate")
    public Map<String, Object> getSummeryForSelectedDate(@RequestParam("date")String dateString){
        LocalDate date = LocalDate.parse(dateString);
        Map<String, Object> response = new HashMap<>();
        response.put("totalPrice", adminPanelService.getTotalPriceForDate(date));

        Map<String, Object> mostSolidItem = adminPanelService.getMostSoldItemByDate(date);
        response.put("mostSoldItemName", mostSolidItem.get("mostSoldItemName"));
        response.put("mostSoldItemPicture", mostSolidItem.get("mostSoldItemPicture"));
        response.put("mostSoldItemQty", mostSolidItem.get("mostSoldItemQty"));

        adminPanelService.getTotalProfitForDate(date);
        return response;
    }
}
