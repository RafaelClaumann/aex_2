package br.com.aex.repository;

import br.com.aex.entity.Categoria;
import br.com.aex.model.CategoryEnum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Categoria, Long> {

    Optional<Categoria> findCategoryByNome(final CategoryEnum nome);

}
