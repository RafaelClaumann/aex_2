package br.com.aex.api.dto.client;

import br.com.aex.entity.Cliente;

public record ClientResponseDtoV1(
        Long id,
        String nome,
        String telefone
) {

    public static ClientResponseDtoV1 from(final Cliente client) {
        return new ClientResponseDtoV1(
                client.getId(),
                client.getNome(),
                client.getTelefone()
        );
    }

}
