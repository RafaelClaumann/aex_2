package br.com.aex.api.dto.client;

import jakarta.validation.constraints.Size;

public record ClientPatchDtoV1(
        @Size(min = 3, max = 50, message = "O nome deve ter entre 3 e 50 caracteres")
        String nome,

        @Size(min = 8, max = 11, message = "O telefone deve ter entre 8 e 11 caracteres")
        String telefone
) {
}
