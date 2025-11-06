package br.com.aex.repository;

import br.com.aex.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepository<Cliente, Long> {

    Optional<Cliente> findClienteByTelefone(final String telefone);

}
