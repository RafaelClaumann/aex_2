package br.com.aex.api.controller.v1.exception;

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
