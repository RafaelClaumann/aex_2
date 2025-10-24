package br.com.aex.api.dto.order;

import br.com.aex.entity.Pedido;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record OrderResponseDtoV1(
        Long id,
        Long clientId,
        LocalDateTime createdAt,
        String status,
        BigDecimal valor
) {

    public static OrderResponseDtoV1 from(Pedido order) {
        return new OrderResponseDtoV1(
                order.getId(),
                order.getCliente().getId(),
                order.getDataCriacao(),
                order.getStatus(),
                order.getValor()
        );
    }

}
