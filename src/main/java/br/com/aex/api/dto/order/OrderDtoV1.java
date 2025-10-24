package br.com.aex.api.dto.order;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;

public record OrderDtoV1(
        @Positive
        @NotNull
        Long clientId,

        @NotBlank(message = "O status do pedido é obrigatório")
        String status,

        @Positive
        @Digits(integer = 6, fraction = 2)
        BigDecimal valor
) {
}
