package br.com.aex.api.controller;

import br.com.aex.api.dto.order.OrderDtoV1;
import br.com.aex.api.dto.order.OrderPatchDtoV1;
import br.com.aex.entity.Cliente;
import br.com.aex.entity.Pedido;
import br.com.aex.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping(path = "/{id}")
    public ResponseEntity<OrderDtoV1> getOrder(@PathVariable final Long id) {
        final Pedido order = orderService.getOrder(id);
        final OrderDtoV1 response = OrderDtoV1.from(order);

        return ResponseEntity.ok(response);
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

    @PatchMapping(path = "/{id}")
    public ResponseEntity<Void> patchOrder(@PathVariable final Long id, @RequestBody @Valid final OrderPatchDtoV1 patchDto) {
        orderService.patchOrder(id, patchDto);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Cliente> deleteOrder(@PathVariable final Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }

}
