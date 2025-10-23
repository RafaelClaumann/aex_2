package br.com.aex.service;

import br.com.aex.controller.v1.ClientDtoV1;
import br.com.aex.entity.Cliente;
import br.com.aex.repository.ClientRepository;
import br.com.aex.service.exceptions.ClientNotFoundException;
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
        Optional<Cliente> cliente = clientRepository.findById(id);
        return cliente.orElseThrow(() -> new ClientNotFoundException(id));
    }

    public Cliente SaveClient(final ClientDtoV1 cliente) {
        Cliente clienteEntity = Cliente.builder()
                .nome(cliente.nome())
                .telefone(cliente.telefone())
                .pedido(List.of())
                .build();

        return clientRepository.save(clienteEntity);
    }

}
