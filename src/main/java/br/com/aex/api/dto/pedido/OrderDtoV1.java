package br.com.aex.api.dto.pedido;

import java.math.BigDecimal;

public record OrderDtoV1(
        Long clientId,
        String status,
        BigDecimal valor
) {
}
