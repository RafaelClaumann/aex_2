package br.com.aex.api.dto.product;

import br.com.aex.entity.Produto;

import java.math.BigDecimal;
import java.util.Objects;

public record ProductDtoV1(
        String nome,
        String descricao,
        BigDecimal precoVenda,
        Long idCategoria
) {

    public static ProductDtoV1 from(final Produto product) {
        return new ProductDtoV1(
                product.getNome(),
                product.getDescricao(),
                product.getPrecoVenda(),
                Objects.nonNull(product.getCategoria()) ? product.getCategoria().getId() : null
        );
    }

}
