package br.com.aex.service;

import br.com.aex.api.dto.client.ClientDtoV1;
import br.com.aex.api.dto.client.ClientPatchDtoV1;
import br.com.aex.entity.Cliente;
import br.com.aex.repository.ClientRepository;
import br.com.aex.service.exception.ResourceNotFoundException;
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

    public Cliente getClient(final String telefone) {
        final Optional<Cliente> cliente = clientRepository.findClienteByTelefone(telefone);
        return cliente.orElseThrow(() -> new ResourceNotFoundException(
                String.format("Cliente com telefone [ %s ] não encontrado", telefone),
                this.getClass().getSimpleName()
        ));
    }

    public Cliente saveClient(final ClientDtoV1 clientDto) {
        final Cliente clienteEntity = Cliente.builder()
                .nome(clientDto.nome())
                .telefone(clientDto.telefone())
                .pedido(List.of())
                .build();

        return clientRepository.save(clienteEntity);
    }

    public void patchClient(final Long id, final ClientPatchDtoV1 patchDto) {
        final Cliente client = this.getClient(id);

        if (patchDto.nome() != null)
            client.setNome(patchDto.nome());

        if (patchDto.telefone() != null)
            client.setTelefone(patchDto.telefone());

        clientRepository.save(client);
    }

    public void deleteClient(final Long id) {
        clientRepository.deleteById(id);
    }

}
