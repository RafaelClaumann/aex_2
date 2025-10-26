package br.com.aex.api.controller;

import br.com.aex.entity.ItemPedido;
import br.com.aex.service.ItemOrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
