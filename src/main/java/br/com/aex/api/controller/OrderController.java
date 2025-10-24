package br.com.aex.api.controller;

import br.com.aex.api.dto.order.OrderDtoV1;
import br.com.aex.entity.Pedido;
import br.com.aex.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/v1/order")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<OrderDtoV1> saveOrder(@RequestBody @Valid OrderDtoV1 orderDto, final UriComponentsBuilder uriBuilder) {
        final Pedido orderEntity = orderService.saveOrder(orderDto);
        final URI uri = uriBuilder
                .path("/v1/order/{id}")
                .buildAndExpand(orderEntity.getId())
                .toUri();

        return ResponseEntity.created(uri).body(orderDto);
    }
}
