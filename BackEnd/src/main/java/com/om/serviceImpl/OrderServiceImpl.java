package com.om.serviceImpl;

import com.om.Mapper.OrderMappings;
import com.om.dto.BranchDto;
import com.om.dto.OrderDto;
import com.om.dto.OrderItemsDto;
import com.om.exception.UserNotFountException;
import com.om.modal.*;
import com.om.repository.BranchRepo;
import com.om.repository.OrderItemsRepo;
import com.om.repository.OrderRepo;
import com.om.repository.ProductRepo;
import com.om.service.OrderService;
import com.om.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private  final UserService userService;
    private  final ProductRepo productRepo;
    private  final OrderItemsRepo orderItemsRepo;

    private  final OrderRepo orderRepo;

    @Override
    public OrderDto createOrder(OrderDto orderDto) {
        User cashier= userService.getCurrentUser();

        Branch branch= cashier.getBranch();
        if(branch==null){
            throw new UserNotFountException("cashiers branch not found");
        }
        Order order= new Order();
        order.setBranch(branch);
        order.setCashier(cashier);
        order.setCustomer(orderDto.getCustomer());
        order.setPaymentType(orderDto.getPaymentType());
        System.out.println("the executin is here level 1");
        if(orderDto.getItems().size() == 0){
            System.out.println("ther no  items found");
        }else{
            for (OrderItemsDto items:orderDto.getItems()
                 ) {
                System.out.println(items.getQuantity());

            }
        }
        List<OrderItems> orderItems= orderDto.getItems().stream().map(
                itemDto-> {
                    Product product= productRepo.findById(itemDto.getProductId()).orElseThrow(()-> new RuntimeException("unable to fetch the product "));
                   OrderItems orderItem = new OrderItems();
                   orderItem.setProduct(product);
                   orderItem.setPrice(itemDto.getQuantity()*product.getSellingPrice());
                   orderItem.setQuantity(itemDto.getQuantity());
                   orderItem.setSellingPrice(product.getSellingPrice());
                   orderItem.setOrder(order);
                   return  orderItem;

                }
        ).collect(Collectors.toList());
        for (OrderItems temp: orderItems
             ) {
            System.out.println(" here if difjdoifjd oidfje f"+temp.getSellingPrice());
            System.out.println("kdjf[ei fidjfie fkjdif iduf "+temp.getQuantity());

        }

        double total= orderItems.stream().mapToDouble(
                OrderItems::getPrice
        ).sum();
        order.setTotalAmount(total);
        order.setItems(orderItems);

        Order saved = orderRepo.save(order);

        return OrderMappings.toDto(saved);
    }


    @Override
    public OrderDto getOrderById(Long id) {
        Order order=  orderRepo.findById(id).orElseThrow(()-> new RuntimeException("no order found with id "+id));
          return  OrderMappings.toDto(order);
    }

    @Override
    public List<OrderDto> getOrdersByBranch(Long branchId, Long cashierId, Long customerId, PaymentType paymentType, OrderStatus status) {
       return orderRepo.findByBranchId(branchId).stream().filter(
               order ->
                   customerId==null || (order.getCustomer()!=null &&
                      order.getCustomer().getId().equals(customerId)))
               .filter(order -> cashierId==null ||
                       order.getCashier()!=null &&
                       order.getCashier().getId().equals(cashierId))
               .filter(order -> paymentType==null || order.getPaymentType()==paymentType)
               .map(OrderMappings::toDto).collect(Collectors.toList());
    }

    @Override
    public List<OrderDto> getOrderByCashier(long cashierId) {
        return  orderRepo.findByCashierId(cashierId).stream().map(OrderMappings::toDto).collect(Collectors.toList());
    }

    @Override
    public void deleteOrder(Long id) {
        Order exist= orderRepo.findById(id).orElseThrow(()-> new RuntimeException("not found order to delete with id"+id));
         orderRepo.delete(exist);
    }

    @Override
    public List<OrderDto> getTodayOrdersByBranch(Long branchId) {
        LocalDate today= LocalDate.now();
        LocalDateTime start= today.atStartOfDay();
        LocalDateTime end= today.plusDays(1).atStartOfDay();
         return   orderRepo.findByBranchIdAndCreatedAtBetween(branchId,start,end).stream().map(OrderMappings::toDto).collect(Collectors.toList());
    }

    @Override
    public List<OrderDto> getOrdersByCustomerId(Long customerId) {
       return  orderRepo.findByCustomerId(customerId).stream().map(OrderMappings::toDto).collect(Collectors.toList());
    }

    @Override
    public List<OrderDto> getTop5RecentOrdersByBranchId(Long branchId) {
       return orderRepo.findTop5ByBranchIdOrderByCreatedAtDesc(branchId).stream().map(OrderMappings::toDto).collect(Collectors.toList());
    }
}
