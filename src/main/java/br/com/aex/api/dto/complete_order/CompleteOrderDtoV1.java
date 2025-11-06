package br.com.aex.api.dto.complete_order;

import java.util.List;

public record CompleteOrderDtoV1(Long clientId, Long orderId, List<Product> selectedProducts) {

    public record Product(
            long productId,
            int quantity,
            int discountPercentage
    ) {
    }

}
