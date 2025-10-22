package br.com.aex.adapter.output.persistence;

import br.com.aex.domain.ports.output.ClientRepository;
import br.com.aex.entity.Cliente;

public class ClientRepositoryAdapter implements ClientRepository {

    private final ClientJpaRepository clientJpaRepository;

    public ClientRepositoryAdapter(ClientJpaRepository clientJpaRepository) {
        this.clientJpaRepository = clientJpaRepository;
    }

    @Override
    public Cliente getClientById(Long id) {
        return clientJpaRepository.findById(id).orElseThrow(() -> new IllegalArgumentException());
    }

}
