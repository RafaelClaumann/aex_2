package br.com.aex.adapter.output.persistence;

import br.com.aex.domain.ports.output.ClientRepository;

public class ClientRepositoryAdapter implements ClientRepository {

    private final ClientJpaRepository clientJpaRepository;

    public ClientRepositoryAdapter(ClientJpaRepository clientJpaRepository) {
        this.clientJpaRepository = clientJpaRepository;
    }

    @Override
    public void getClientById(Long id) {
        clientJpaRepository.findById(id).ifPresent(client -> {});
    }
}
