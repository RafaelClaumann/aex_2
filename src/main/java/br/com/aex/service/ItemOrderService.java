package br.com.aex.service;

import br.com.aex.api.dto.item_order.ItemOrderDtoV1;
import br.com.aex.entity.ItemPedido;
import br.com.aex.entity.Pedido;
import br.com.aex.entity.Produto;
import br.com.aex.repository.ItemOrderRepository;
import br.com.aex.service.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemOrderService {

    private final ItemOrderRepository itemOrderRepository;
    private final OrderService orderService;
    private final ProductService productService;

    public ItemOrderService(ItemOrderRepository itemOrderRepository, OrderService orderService, ProductService productService) {
        this.itemOrderRepository = itemOrderRepository;
        this.orderService = orderService;
        this.productService = productService;
    }

    public ItemPedido getItemOrder(final Long id) {
        final Optional<ItemPedido> itemOrder = itemOrderRepository.findById(id);
        return itemOrder.orElseThrow(() -> new ResourceNotFoundException(
                "ItemOrder não encontrado: " + id,
                this.getClass().getSimpleName()
        ));
    }

    public ItemPedido saveItemOrder(final ItemOrderDtoV1 itemOrderDto) {
        final Pedido order = orderService.getOrder(itemOrderDto.orderId());
        final Produto product = productService.getProduct(itemOrderDto.productId());

        final ItemPedido itemOrder = ItemPedido.builder()
                .quantidade(itemOrderDto.quantity())
                .precoUnitario(itemOrderDto.piecePrice())
                .pedido(order)
                .produto(product)
                .build();

        return itemOrderRepository.save(itemOrder);
    }

    public List<ItemPedido> saveAll(final List<ItemPedido> itemOrders) {
        return itemOrderRepository.saveAll(itemOrders);
    }

}
