package br.com.aex.api.dto.product;

import br.com.aex.entity.Categoria;

import java.math.BigDecimal;

public record ProductDtoV1(
        String nome,
        String descricao,
        BigDecimal precoVenda,
        Integer idCategoria
) {
}
