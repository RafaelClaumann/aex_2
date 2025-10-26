package br.com.aex.model;

import br.com.aex.service.exception.ResourceNotFoundException;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CategoriaEnum {
    LANCHE("Lanche"),
    ACOMPANHAMENTO("Acompanhamento"),
    BEBIDA("Bebida"),
    SOBREMESA("Sobremesa"),
    COMBO("Combo"),
    ESPECIAL("Especial"),
    DESCONHECIDA("Desconhecida");

    private final String descricao;

    public static CategoriaEnum from(final String categoria) {
        for (final CategoriaEnum categoriaEnum : CategoriaEnum.values()) {
            if (categoriaEnum.getDescricao().equals(categoria)) {
                return categoriaEnum;
            }
        }

        throw new ResourceNotFoundException("Categoria inexistente: " + categoria, CategoriaEnum.class.getSimpleName());
    }

}
