package com.om.Mapper;

import com.om.dto.OrderDto;
import com.om.dto.ProductDto;
import com.om.dto.RefundDto;
import com.om.dto.ShiftReportDto;
import com.om.modal.Order;
import com.om.modal.Product;
import com.om.modal.Refund;
import com.om.modal.ShiftReport;

import java.util.List;
import java.util.stream.Collectors;

public class ShiftMapper {

    public  static ShiftReportDto toDto(ShiftReport entity){
        return  ShiftReportDto.builder()
                .id(entity.getId())
                .shiftStart(entity.getShiftStart())
                .shiftEnd(entity.getShiftEnd())
                .totalOrders(entity.getTotalOrders())
                .totalRefunds(entity.getTotalRefunds())
                .totalSales(entity.getTotalSales())
                .netSale(entity.getNetSale())
                .cashier(Mappings.userToDto(entity.getCashier()))
                .cashierId(entity.getCashier().getId())
                .branchId(entity.getBranch().getId())
                .recentOrders(mapOrders(entity.getRecentOrders()))
                .refund(mapRefunds(entity.getRefund()))
                .topSellingProducts(mapProducts(entity.getTopSellingProducts()))
                .paymentSummeries(entity.getPaymentSummeries())
                .build();
    }

    private static List<ProductDto> mapProducts(List<Product> topSellingProducts) {
        if(topSellingProducts ==null){return null;}
        return  topSellingProducts.stream().map(ProductMappings::productToDto).collect(Collectors.toList());

    }

    private static List<RefundDto> mapRefunds(List<Refund> refund) {
        if(refund ==null){return null;}
        return  refund.stream().map(RefundMapper::toDto).collect(Collectors.toList());
    }

    private static List<OrderDto> mapOrders(List<Order> recentOrders) {
        if(recentOrders==null) {
            return null;
        }
        return  recentOrders.stream().map(OrderMappings::toDto).collect(Collectors.toList());

    }
}
