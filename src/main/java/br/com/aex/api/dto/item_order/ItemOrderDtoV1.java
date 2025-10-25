package br.com.aex.api.dto.item_order;

import br.com.aex.entity.ItemPedido;

import java.math.BigDecimal;
import java.util.Objects;

public record ItemOrderDtoV1(
        Integer quantity,
        BigDecimal piecePrice,
        Long orderId,
        Long productId
) {

    public static ItemOrderDtoV1 from(final ItemPedido itemOrder) {
        return new ItemOrderDtoV1(
                itemOrder.getQuantidade(),
                itemOrder.getPrecoUnitario(),
                Objects.nonNull(itemOrder.getPedido().getId()) ? itemOrder.getPedido().getId() : null,
                Objects.nonNull(itemOrder.getProduto().getId()) ? itemOrder.getProduto().getId() : null
        );
    }

}
