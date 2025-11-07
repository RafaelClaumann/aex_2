package br.com.aex.api.dto.product;

import br.com.aex.entity.Produto;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

public record ProductResponseDtoV1(
        Long id,
        String nome,
        String descricao,
        BigDecimal precoVenda,
        String nomeCategoria
) {

    public static ProductResponseDtoV1 from(final Produto product) {
        return new ProductResponseDtoV1(
                product.getId(),
                product.getNome(),
                product.getDescricao(),
                product.getPrecoVenda(),
                Objects.nonNull(product.getCategoria()) ? product.getCategoria().getNome().name() : null
        );
    }

    public static List<ProductResponseDtoV1> from(final List<Produto> products) {
        return products.stream().map(product ->
                new ProductResponseDtoV1(
                        product.getId(),
                        product.getNome(),
                        product.getDescricao(),
                        product.getPrecoVenda(),
                        Objects.nonNull(product.getCategoria()) ? product.getCategoria().getNome().name() : null
                )
        ).toList();
    }

}
