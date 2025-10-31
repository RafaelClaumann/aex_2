package br.com.aex.service;

import br.com.aex.api.dto.complete_order.CompleteOrderDtoV1;
import br.com.aex.entity.Cliente;
import br.com.aex.entity.ItemPedido;
import br.com.aex.entity.Pedido;
import br.com.aex.entity.Produto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class CreateOrderService {

    private final ProductService productService;
    private final ClientService clientService;
    private final OrderService orderService;
    private final ItemOrderService itemOrderService;

    public CreateOrderService(
            ProductService productService,
            ClientService clientService,
            OrderService orderService,
            ItemOrderService itemOrderService
    ) {
        this.productService = productService;
        this.clientService = clientService;
        this.orderService = orderService;
        this.itemOrderService = itemOrderService;
    }

    @Transactional
    public CompleteOrderDtoV1 createOrder(final CompleteOrderDtoV1 completeOrderDto) {
        final Cliente client = clientService.getClient(completeOrderDto.clientId());

        final Pedido order = buildOrder(client);
        orderService.saveOrder(order);

        final List<ItemPedido> itemOrderList = createItemOrderList(completeOrderDto.selectedProducts(), order);
        final BigDecimal orderTotalPrice = calculateTotalPrice(itemOrderList);
        order.setValor(orderTotalPrice);

        itemOrderService.saveAll(itemOrderList);

        return new CompleteOrderDtoV1(
                completeOrderDto.clientId(),
                order.getId(),
                completeOrderDto.selectedProducts()
        );
    }

    private Pedido buildOrder(final Cliente client) {
        return Pedido.builder()
                .dataCriacao(LocalDateTime.now())
                .status("PENDENTE")
                .cliente(client)
                .build();
    }

    private List<ItemPedido> createItemOrderList(final List<CompleteOrderDtoV1.Product> products, final Pedido order) {
        return products.stream().map(item -> {
            final Produto product = productService.getProduct(item.productId());
            final BigDecimal priceDiscount = calculatePriceWithDiscount(product, item.discountPercentage());
            return ItemPedido.builder()
                    .quantidade(item.quantity())
                    .precoUnitario(priceDiscount)
                    .pedido(order)
                    .produto(product)
                    .build();
        }).toList();
    }

    private BigDecimal calculatePriceWithDiscount(final Produto product, final double discountPercentage) {
        final BigDecimal price = product.getPrecoVenda();
        final BigDecimal discount = price.multiply(BigDecimal.valueOf(discountPercentage / 100.0));
        return price.subtract(discount);
    }

    private BigDecimal calculateTotalPrice(final List<ItemPedido> itemOrderList) {
        return itemOrderList.stream()
                .map(item -> item.getPrecoUnitario().multiply(BigDecimal.valueOf(item.getQuantidade())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

}
