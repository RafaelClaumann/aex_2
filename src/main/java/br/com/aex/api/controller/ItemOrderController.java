package br.com.aex.api.controller;

import br.com.aex.api.dto.item_order.ItemOrderDtoV1;
import br.com.aex.entity.ItemPedido;
import br.com.aex.service.ItemOrderService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/v1/item_order")
public class ItemOrderController {

    private final ItemOrderService itemOrderService;

    public ItemOrderController(ItemOrderService itemOrderService) {
        this.itemOrderService = itemOrderService;
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<ItemPedido> getItemOrder(@PathVariable final Long id) {
        final ItemPedido itemOrder = itemOrderService.getItemOrder(id);
        return ResponseEntity.ok(itemOrder);
    }

    @PostMapping
    public ResponseEntity<ItemOrderDtoV1> createItemOrder(@RequestBody @Valid final ItemOrderDtoV1 itemOrderDto) {
        final ItemPedido itemOrder = itemOrderService.saveItemOrder(itemOrderDto);
        final URI uri = UriComponentsBuilder
                .fromPath("/v1/item_order/{id}")
                .buildAndExpand(itemOrder.getId())
                .toUri();

        return ResponseEntity.created(uri).body(itemOrderDto);
    }

}
