package br.com.aex.service.exceptions;

public class ClientNotFoundException extends RuntimeException {

    public ClientNotFoundException(final Long id) {
        super(String.format("Client with id %s not found", id));
    }

}
