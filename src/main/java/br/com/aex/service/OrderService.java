package br.com.aex.service;

import br.com.aex.api.dto.order.OrderPatchDtoV1;
import br.com.aex.entity.Pedido;
import br.com.aex.repository.OrderRepository;
import br.com.aex.service.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public Pedido getOrder(final Long id) {
        final Optional<Pedido> order = orderRepository.findById(id);
        return order.orElseThrow(() -> new ResourceNotFoundException(
                "Pedido não encontrado: " + id,
                this.getClass().getSimpleName())
        );
    }

    public Pedido saveOrder(final Pedido orderEntity) {
        return orderRepository.save(orderEntity);
    }

    public void deleteOrder(final Long id) {
        orderRepository.deleteById(id);
    }

    public void patchOrder(final Long id, final OrderPatchDtoV1 patchDto) {
        Pedido order = this.getOrder(id);

        if (patchDto.valor() != null)
            order.setValor(patchDto.valor());

        if (patchDto.status() != null)
            order.setStatus(patchDto.status());

        orderRepository.save(order);
    }
}
