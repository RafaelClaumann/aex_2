package br.com.aex.api.exception;

import java.time.LocalDateTime;

public record ErrorResponse(
        String httpMethod,
        Integer status,
        String error,
        String path,
        String thrownByClass,
        String message,
        LocalDateTime timestamp
) {
}
