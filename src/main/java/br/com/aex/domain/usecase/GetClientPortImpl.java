package br.com.aex.domain.usecase;

import br.com.aex.domain.ports.input.GetClientPort;
import org.springframework.stereotype.Service;

@Service
public class GetClientPortImpl implements GetClientPort {

    // private final RepositoryPort repositoryPort

    @Override
    public String getClient() {
        System.out.println("invocando repositoryPort");
        System.out.println("convertendo o cliente");
        return "retornando o cliente";
    }

}
