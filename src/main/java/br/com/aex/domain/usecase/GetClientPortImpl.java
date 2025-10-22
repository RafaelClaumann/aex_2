package br.com.aex.domain.usecase;

import br.com.aex.domain.models.ClienteModel;
import br.com.aex.domain.ports.input.GetClientPort;
import br.com.aex.domain.ports.output.ClientRepository;
import org.springframework.stereotype.Service;

@Service
public class GetClientPortImpl implements GetClientPort {

    private final ClientRepository clientRepository;

    public GetClientPortImpl(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @Override
    public String getClient() {
        ClienteModel clientById = clientRepository.getClientById(5L);
        System.out.println("Cliente Encontrado: " + clientById);
        return "retornando o cliente com id 5";
    }

}
