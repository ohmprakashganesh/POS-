package com.om.serviceImpl;

import com.om.Mapper.ShiftMapper;
import com.om.dto.ShiftReportDto;
import com.om.modal.*;
import com.om.repository.*;
import com.om.service.ShirtReportServices;
import com.om.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class ShiftReportsImpl implements ShirtReportServices {

    private  final ShiftReportRepo shiftReportRepo;
    private  final UserService userService;
   private  final RefundRepo refundRepo;
   private  final OrderRepo orderRepo;
   private  final UserRepo userRepo;

    @Override
    public ShiftReportDto startShirt() {
        User current = userService.getCurrentUser();
        LocalDateTime start = LocalDateTime.now();
        LocalDateTime startOfDay = start.withHour(0).withMinute(0).withSecond(0);
        LocalDateTime endOfDay = start.withHour(23).withMinute(59).withSecond(59);

        Optional<ShiftReport> existing = shiftReportRepo.findByCashierAndShiftStartBetween(
                current, startOfDay, endOfDay
        );

        // ✅ If no shift exists today, create a new one
        if (existing.isEmpty()) {
            Branch branch = current.getBranch();

            ShiftReport rep = ShiftReport.builder()
                    .cashier(current)
                    .shiftStart(start)
                    .branch(branch)
                    .build();

            ShiftReport saved = shiftReportRepo.save(rep);
            return ShiftMapper.toDto(saved);
        }

        // ✅ If already started, return the existing shift instead of null
        return ShiftMapper.toDto(existing.get());
    }


    @Override
    public ShiftReportDto endShift(Long ShiftReportId, LocalDateTime shiftEnd) {
        User current= userService.getCurrentUser();

        ShiftReport shift= shiftReportRepo.findTopByCashierAndShiftEndIsNullOrderByShiftStartDesc(current).orElseThrow(()-> new RuntimeException("shift not found "));

        shift.setShiftEnd(shiftEnd);

        List<Refund> refunds= refundRepo.findByCashierIdAndCreatedAtBetween(current.getId(),shift.getShiftStart(),shift.getShiftEnd());

        double totalRefunds= refunds.stream().mapToDouble(refund -> refund.getAmount()!=null ?
                refund.getAmount():0.0).sum();

        List<Order> orders= orderRepo.findByCashierAndCreatedAtBetween(current,shift.getShiftStart(),shift.getShiftEnd());

     double totalSales=orders.stream().mapToDouble(Order::getTotalAmount).sum();

     int totalOrders= orders.size();

       shift.setTotalRefunds(totalRefunds);
       shift.setTotalSales(totalSales);
       shift.setTotalOrders(totalOrders);
       shift.setNetSale(totalSales-totalRefunds);
       shift.setRecentOrders(getRecentOrders(orders));
       shift.setTopSellingProducts(getTopSellingProducts(orders));
       shift.setPaymentSummeries(getPaymentSummeries(orders,totalSales));
       shift.setRefund(refunds);

       ShiftReport saved= shiftReportRepo.save(shift);
            return  ShiftMapper.toDto(saved);
    }

    private List<PaymentSummery> getPaymentSummeries(List<Order> orders, double totalSales) {

        //cash - order 1, order 2
        //card - order 2

        Map<PaymentType,List<Order>> grouped=orders.stream()
                .collect(Collectors.groupingBy(order -> order.getPaymentType()!=null ?order.getPaymentType():PaymentType.CASH));

        List<PaymentSummery>summeries = new ArrayList<>();
        for (Map.Entry<PaymentType,List<Order>> entry: grouped.entrySet()){
            double amount= entry.getValue().stream()
                    .mapToDouble(Order::getTotalAmount).sum();
            int transaction= entry.getValue().size();
            double percent= (amount/totalSales) *100;

            PaymentSummery ps= new PaymentSummery();
            ps.setPercentage(percent);
            ps.setTotalAmount(amount);
            ps.setTranscationCount(transaction);
            ps.setType(entry.getKey());
            summeries.add(ps);

        }
        return  summeries;

    }

    private List<Product> getTopSellingProducts(List<Order> orders) {
        Map<Product, Integer> salesMap= new HashMap<>();
        for(Order order:orders){
            for (OrderItems item: order.getItems()){
                Product product= item.getProduct();
                salesMap.put(product, salesMap.getOrDefault(product,0)+item.getQuantity());
            }
        }
        return  salesMap.entrySet().stream().sorted((a,b)-> b.getValue().compareTo(a.getValue())).limit(5).map(Map.Entry::getKey).collect(Collectors.toList());
    }

    private List<Order> getRecentOrders(List<Order> orders) {
      return  orders.stream().sorted(Comparator.comparing(Order::getCreatedAt).reversed())
              .limit(5)
              .collect(Collectors.toList());
    }

    @Override
    public ShiftReportDto getShiftReportById(Long id) {
       return  ShiftMapper.toDto(shiftReportRepo.findById(id).orElseThrow(()->new RuntimeException("not found shirt by id"+id)));
    }

    @Override
    public List<ShiftReportDto> getAllShiftReports() {
       return shiftReportRepo.findAll().stream().map(ShiftMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public List<ShiftReportDto> getShiftReportsByBranchId(Long branchId) {
        return  shiftReportRepo.findByBranchId(branchId).stream().map(ShiftMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public List<ShiftReportDto> getShiftReportsByCashierId(Long cashierId) {
        return  shiftReportRepo.findByCashierId(cashierId).stream().map(ShiftMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public ShiftReportDto getCurrentShiftProgress(Long cashierId) {
        User user= userService.getCurrentUser();
        ShiftReport shift= shiftReportRepo.findTopByCashierAndShiftEndIsNullOrderByShiftStartDesc(user).orElseThrow(()->new RuntimeException("not found shirt by id"));
        LocalDateTime now= LocalDateTime.now();
        List<Order> orders= orderRepo.findByCashierAndCreatedAtBetween(
                user, shift.getShiftStart(),shift.getShiftEnd()!=null?shift.getShiftEnd():now
        );
       if(orders.size() ==0){
           System.out.println("ther is no order found");
       }else{
           for (Order ord: orders
                ) {
               System.out.println(ord.getPaymentType());

           }
       }
        List<Refund> refunds= refundRepo.findByCashierIdAndCreatedAtBetween(user.getId(),shift.getShiftStart(),shift.getShiftEnd()==null?now:shift.getShiftEnd());

        double totalRefunds= refunds.stream().mapToDouble(refund -> refund.getAmount()!=null ?
                refund.getAmount():0.0).sum();

        double totalSales=orders.stream().mapToDouble(Order::getTotalAmount).sum();

        int totalOrders= orders.size();

        shift.setTotalRefunds(totalRefunds);
        shift.setTotalSales(totalSales);
        shift.setTotalOrders(totalOrders);
        shift.setNetSale(totalSales-totalRefunds);
        shift.setRecentOrders(getRecentOrders(orders));
        shift.setTopSellingProducts(getTopSellingProducts(orders));
        shift.setPaymentSummeries(getPaymentSummeries(orders,totalSales));
        shift.setRefund(refunds);

        ShiftReport saved= shiftReportRepo.save(shift);

        return ShiftMapper.toDto(saved);
    }

    @Override
    public ShiftReportDto getShiftByCashierAndDate(Long cashierId, LocalDateTime date) {
        LocalDateTime startOfDay = date.withHour(0).withMinute(0).withSecond(0);
        LocalDateTime endOfDay = date.withHour(23).withMinute(59).withSecond(59);
        User cashier= userRepo.findById(cashierId).orElseThrow(()-> new RuntimeException("cashier not found"));

        Optional<ShiftReport> reportOpt =
                shiftReportRepo.findByCashierAndShiftStartBetween(cashier, startOfDay, endOfDay);

        if (reportOpt.isEmpty()) {
            throw new RuntimeException("No shift found for cashier ID " + cashierId + " on " + date.toLocalDate());
        }

        return ShiftMapper.toDto(reportOpt.get());
    }


}
