package br.com.aex.repository;

import br.com.aex.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Categoria, Long> {

    Optional<Categoria> findCategoryByNome(final String nome);

}
