package lk.ijse.gdse.shoeshopbackend.service;

import java.time.LocalDate;
import java.util.Map;

public interface AdminPanelService {
    Integer getOrdersCountForDate(LocalDate date);
    Double getTotalPriceForDate(LocalDate date);
    Integer getGoldCustomerCount();
    Map<String, Object> getMostSoldItemByDate(LocalDate date);
    Double getTotalProfitForDate(LocalDate date);
}
