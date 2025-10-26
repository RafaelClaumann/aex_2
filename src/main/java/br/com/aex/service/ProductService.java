package br.com.aex.service;

import br.com.aex.api.dto.product.ProductDtoV1;
import br.com.aex.entity.Categoria;
import br.com.aex.entity.Produto;
import br.com.aex.model.CategoryEnum;
import br.com.aex.repository.ProductRepository;
import br.com.aex.service.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryService categoryService;

    public ProductService(ProductRepository productRepository, CategoryService categoryService) {
        this.productRepository = productRepository;
        this.categoryService = categoryService;
    }

    public List<Produto> getProducts() {
        final List<Produto> products = productRepository.findAll();
        if (products.isEmpty())
            throw new ResourceNotFoundException("Não existem Produtos cadastrados", this.getClass().getSimpleName());

        return products;
    }

    public Produto getProduct(final Long id) {
        final Optional<Produto> product = productRepository.findById(id);
        return product.orElseThrow(() -> new ResourceNotFoundException(
                "Produto não encontrado: " + id,
                this.getClass().getSimpleName()
        ));
    }

    public Produto saveProduct(final ProductDtoV1 productDto) {
        final CategoryEnum categoryEnum = CategoryEnum.from(productDto.categoria());
        final Categoria category = categoryService.getCategory(categoryEnum);
        final Produto product = Produto.builder()
                .nome(productDto.nome())
                .descricao(productDto.descricao())
                .precoVenda(productDto.precoVenda())
                .categoria(category)
                .build();

        return productRepository.save(product);
    }

    public void deleteProduct(final Long id) {
        productRepository.deleteById(id);
    }

}
