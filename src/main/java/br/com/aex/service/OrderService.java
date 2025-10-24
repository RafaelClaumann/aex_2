package br.com.aex.service;

import br.com.aex.api.dto.order.OrderDtoV1;
import br.com.aex.api.dto.order.OrderPatchDtoV1;
import br.com.aex.entity.Cliente;
import br.com.aex.entity.Pedido;
import br.com.aex.repository.OrderRepository;
import br.com.aex.service.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ClientService clientService;

    public OrderService(OrderRepository orderRepository, ClientService clientService) {
        this.orderRepository = orderRepository;
        this.clientService = clientService;
    }

    public Pedido getOrder(final Long id) {
        final Optional<Pedido> order = orderRepository.findById(id);
        return order.orElseThrow(() -> new ResourceNotFoundException(id.toString(), this.getClass().getSimpleName()));
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
