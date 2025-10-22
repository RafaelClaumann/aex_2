package br.com.aex.adapter.output.persistence;

import br.com.aex.adapter.output.persistence.mapper.ClientMapper;
import br.com.aex.domain.models.ClienteModel;
import br.com.aex.domain.ports.output.ClientRepository;
import br.com.aex.adapter.output.persistence.entities.Cliente;

public class ClientRepositoryAdapter implements ClientRepository {

    private final ClientJpaRepository clientJpaRepository;
    private final ClientMapper clientMapper;

    public ClientRepositoryAdapter(ClientJpaRepository clientJpaRepository, ClientMapper clientMapper) {
        this.clientJpaRepository = clientJpaRepository;
        this.clientMapper = clientMapper;
    }

    @Override
    public ClienteModel getClientById(Long id) {
        final Cliente foundEntity = clientJpaRepository.findById(id).orElseThrow(() -> new IllegalArgumentException());
        return clientMapper.toClientModel(foundEntity);
    }

}
