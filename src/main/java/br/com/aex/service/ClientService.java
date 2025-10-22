package br.com.aex.service;

import br.com.aex.entity.Cliente;
import br.com.aex.repository.ClientRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ClientService {

    private final ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public Cliente getClient(final Long id) {
        Optional<Cliente> cliente = clientRepository.findById(id);
        return cliente.orElse(null);
    }

}
