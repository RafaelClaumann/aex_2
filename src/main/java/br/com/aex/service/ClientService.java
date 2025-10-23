package br.com.aex.service;

import br.com.aex.controller.v1.ClientDtoV1;
import br.com.aex.entity.Cliente;
import br.com.aex.repository.ClientRepository;
import br.com.aex.service.exceptions.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {

    private final ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public Cliente getClient(final Long id) {
        final Optional<Cliente> cliente = clientRepository.findById(id);
        return cliente.orElseThrow(() -> new ResourceNotFoundException(
                id.toString(),
                this.getClass().getSimpleName()
        ));
    }

    public Cliente saveClient(final ClientDtoV1 cliente) {
        final Cliente clienteEntity = Cliente.builder()
                .nome(cliente.nome())
                .telefone(cliente.telefone())
                .pedido(List.of())
                .build();

        return clientRepository.save(clienteEntity);
    }

    public void deleteClient(final Long id) {
        clientRepository.deleteById(id);
    }

}
