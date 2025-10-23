package br.com.aex.service.exceptions;

import lombok.Getter;

@Getter
public class ResourceNotFoundException extends RuntimeException {

    private final String thrownByClass;

    public ResourceNotFoundException(final String message, final String className) {
        super(message);
        this.thrownByClass = className;
    }

}
