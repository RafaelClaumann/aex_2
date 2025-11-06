package br.com.aex.model;

import br.com.aex.service.exception.ResourceNotFoundException;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CategoryEnum {
    LANCHE("Lanche"),
    ACOMPANHAMENTO("Acompanhamento"),
    BEBIDA("Bebida"),
    SOBREMESA("Sobremesa"),
    COMBO("Combo"),
    ESPECIAL("Especial"),
    DESCONHECIDA("Desconhecida");

    private final String description;

    public static CategoryEnum from(final String categoria) {
        for (final CategoryEnum category : CategoryEnum.values()) {
            if (category.name().equals(categoria)) {
                return category;
            }
        }
        throw new ResourceNotFoundException("Categoria inexistente: " + categoria, CategoryEnum.class.getSimpleName());
    }

}
