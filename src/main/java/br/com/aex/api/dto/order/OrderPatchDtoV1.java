package br.com.aex.api.dto.order;

import jakarta.validation.constraints.Digits;

import java.math.BigDecimal;

public record OrderPatchDtoV1(
        @Digits(integer = 6, fraction = 2)
        BigDecimal valor,
        String status
) {
}
