package br.com.aex.adapter.output.persistence;

import br.com.aex.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientJpaRepository extends JpaRepository<Cliente, Long> {
}
