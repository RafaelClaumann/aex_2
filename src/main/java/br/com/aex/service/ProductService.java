package br.com.aex.service;

import br.com.aex.api.dto.product.ProductDtoV1;
import br.com.aex.entity.Categoria;
import br.com.aex.entity.Produto;
import br.com.aex.repository.ProductRepository;
import br.com.aex.service.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryService categoryService;

    public ProductService(ProductRepository productRepository, CategoryService categoryService) {
        this.productRepository = productRepository;
        this.categoryService = categoryService;
    }

    public Produto getProduct(final Long id) {
        final Optional<Produto> product = productRepository.findById(id);
        return product.orElseThrow(() -> new ResourceNotFoundException(
                "Produto não encontrado: " + id,
                this.getClass().getSimpleName()
        ));
    }

    public Produto saveProduct(final ProductDtoV1 productDto) {
        final Categoria category = categoryService.getCategory(productDto.idCategoria());

        final Produto build = Produto.builder()
                .nome(productDto.nome())
                .descricao(productDto.descricao())
                .precoVenda(productDto.precoVenda())
                .categoria(category)
                .build();

        return productRepository.save(build);
    }

    public void deleteProduct(final Long id) {
        productRepository.deleteById(id);
    }

}
