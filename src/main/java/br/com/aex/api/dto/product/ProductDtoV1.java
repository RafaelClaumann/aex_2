package br.com.aex.api.dto.product;

import java.math.BigDecimal;

public record ProductDtoV1(
        String nome,
        String descricao,
        BigDecimal precoVenda,
        String categoria
) {

}
