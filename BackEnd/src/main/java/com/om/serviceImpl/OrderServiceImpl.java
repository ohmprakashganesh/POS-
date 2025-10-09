package com.om.serviceImpl;

import com.om.Mapper.OrderMappings;
import com.om.dto.OrderDto;
import com.om.dto.OrderItemsDto;
import com.om.exception.UserNotFountException;
import com.om.modal.*;
import com.om.repository.OrderRepo;
import com.om.repository.ProductRepo;
import com.om.service.OrderService;
import com.om.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private  final UserService userService;
    private  final ProductRepo productRepo;

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

        List<OrderItems> orderItems= orderDto.getItems().stream().map(
                itemDto-> {
                    Product product= productRepo.findById(itemDto.getId()).orElseThrow(()-> new RuntimeException("unable to fetch the product "));
                   OrderItems orderItem = new OrderItems();
                   orderItem.setProduct(product);
                   orderItem.setPrice(itemDto.getQuantity()*itemDto.getSellingPrice());
                   orderItem.setQuantity(itemDto.getQuantity());
                   orderItem.setOrder(order);

                   return  orderItem;
                }
        ).collect(Collectors.toList());

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
               order -> {
                   customerId==null || (order.getCustomer()!=null &&
                           )
               }
       )
    }

    @Override
    public List<OrderDto> getOrderByCashier(long cashierId) {
        return null;
    }

    @Override
    public void deleteOrder(Long id) {

    }

    @Override
    public List<OrderDto> getTodayOrdersByBranch(Long branchId) {
        return null;
    }

    @Override
    public List<OrderDto> getOrdersByCustomerId(Long customerId) {
        return null;
    }

    @Override
    public List<OrderDto> getTop5RecentOrdersByBranchId(Long branchId) {
        return null;
    }
}
