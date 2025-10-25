package br.com.aex.service;

import br.com.aex.entity.Categoria;
import br.com.aex.repository.CategoryRepository;
import br.com.aex.service.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Categoria getCategory(final Long id) {
        final Optional<Categoria> product = categoryRepository.findById(id);
        return product.orElseThrow(() -> new ResourceNotFoundException(
                "Categoria não encontrada: " + id,
                this.getClass().getSimpleName()
        ));
    }

}
