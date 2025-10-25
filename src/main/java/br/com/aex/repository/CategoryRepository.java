package br.com.aex.repository;

import br.com.aex.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Categoria, Long> {
}
