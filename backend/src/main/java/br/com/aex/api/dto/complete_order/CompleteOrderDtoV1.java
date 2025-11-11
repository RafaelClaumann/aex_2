package br.com.aex.api.dto.complete_order;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record CompleteOrderDtoV1(
        @NotNull
        Long clientId,
        Long orderId,
        @NotEmpty
        List<Product> selectedProducts
) {

    public record Product(
            long productId,
            int quantity,
            int discountPercentage
    ) {
    }

}
