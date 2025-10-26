package br.com.aex.model;

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

}
