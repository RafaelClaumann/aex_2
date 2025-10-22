package br.com.aex.domain.ports.output;

import br.com.aex.entity.Cliente;

public interface ClientRepository {

    Cliente getClientById(Long id);

}
