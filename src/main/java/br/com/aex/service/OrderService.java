package br.com.aex.service;

import br.com.aex.api.dto.pedido.OrderDtoV1;
import br.com.aex.repository.OrderRepository;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public void save(final OrderDtoV1 orderDto) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

}
