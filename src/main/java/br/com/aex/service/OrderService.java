package br.com.aex.service;

import br.com.aex.api.dto.order.OrderDtoV1;
import br.com.aex.entity.Cliente;
import br.com.aex.entity.Pedido;
import br.com.aex.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ClientService clientService;

    public OrderService(OrderRepository orderRepository, ClientService clientService) {
        this.orderRepository = orderRepository;
        this.clientService = clientService;
    }

    public Pedido saveOrder(final OrderDtoV1 orderDto) {
        final Cliente client = clientService.getClient(orderDto.clientId());
        final Pedido order = Pedido.builder()
                .dataCriacao(LocalDateTime.now())
                .valor(orderDto.valor())
                .status(orderDto.status())
                .cliente(client)
                .build();

        return orderRepository.save(order);
    }

}
