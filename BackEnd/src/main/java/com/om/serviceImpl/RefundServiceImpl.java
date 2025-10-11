package com.om.serviceImpl;

import com.om.Mapper.RefundMapper;
import com.om.dto.RefundDto;
import com.om.modal.Branch;
import com.om.modal.Order;
import com.om.modal.Refund;
import com.om.modal.User;
import com.om.repository.OrderRepo;
import com.om.repository.RefundRepo;
import com.om.service.RefundService;
import com.om.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.sql.Ref;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RefundServiceImpl implements RefundService {

private  final RefundRepo refundRepo;
private  final UserService userService;
private  final OrderRepo orderRepo;


    @Override
    public RefundDto createRefund(RefundDto refund) {
        User cashier= userService.getCurrentUser();
        Order order= orderRepo.findById(refund.getOrderId()).orElseThrow(()-> new RuntimeException("not found the order with id "+refund.getOrderId()));
        Branch branch= order.getBranch();

        Refund created= Refund.builder()
                .order(order)
                .cashier(cashier)
                .branch(branch)
                .reason(refund.getReason())
                .amount(refund.getAmount())
                .createdAt(refund.getCreatedAt())
                .build();

        Refund saved=refundRepo.save(created);
        return RefundMapper.toDto(saved);
    }

    @Override
    public List<RefundDto> getAllRefunds() {
        return  refundRepo.findAll().stream().map(RefundMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public List<RefundDto>  getRefundByCashier(Long cashierId) {
       return refundRepo.findByCashierId(cashierId).stream().map(RefundMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public List<RefundDto> getRefundByShiftReport(Long shiftReportId) {
       return  refundRepo.findByShiftReportId(shiftReportId).stream().map(RefundMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public List<RefundDto> getRefundByCashierDateRange(Long cashierId, LocalDateTime start, LocalDateTime end) {
        return  refundRepo.findByCashierIdAndCreatedAtBetween(cashierId,start,end).stream().map(RefundMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public List<RefundDto> getRefundByBranch(Long branchId) {
      return   refundRepo.findByBranchId(branchId).stream().map(RefundMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public RefundDto getRefundById(Long id) {
       Optional< Refund> ref= refundRepo.findById(id);
       if(ref.isPresent()){
           return RefundMapper.toDto(ref.get());

       }else{
           throw new RuntimeException("not found with id "+id);
       }
    }
}
