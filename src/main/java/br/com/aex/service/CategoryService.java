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

    public Categoria getCategory(final String name) {
        final Optional<Categoria> category = categoryRepository.findCategoryByNome(name);
        return category.orElseThrow(() -> new ResourceNotFoundException(
                "Categoria não encontrada: " + name,
                this.getClass().getSimpleName()
        ));
    }

}
