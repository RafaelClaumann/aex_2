package br.com.aex.api.dto.product;

import br.com.aex.entity.Produto;

import java.math.BigDecimal;
import java.util.List;
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

    public static List<ProductDtoV1> from(final List<Produto> products) {
        return products.stream().map(product ->
                new ProductDtoV1(
                        product.getNome(),
                        product.getDescricao(),
                        product.getPrecoVenda(),
                        Objects.nonNull(product.getCategoria()) ? product.getCategoria().getId() : null
                )
        ).toList();
    }

}
