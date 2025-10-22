package br.com.aex.domain.ports.output;

import br.com.aex.domain.models.ClienteModel;

public interface ClientRepository {

    ClienteModel getClientById(Long id);

}
