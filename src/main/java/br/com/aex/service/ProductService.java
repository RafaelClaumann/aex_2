package br.com.aex.service;

import br.com.aex.api.dto.product.ProductDtoV1;
import br.com.aex.entity.Produto;
import br.com.aex.repository.ProductRepository;
import br.com.aex.service.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Produto getProduct(final Long id) {
        final Optional<Produto> product = productRepository.findById(id);
        return product.orElseThrow(() -> new ResourceNotFoundException(
                id.toString(),
                this.getClass().getSimpleName()
        ));
    }

    public Produto saveProduct(final ProductDtoV1 productDto) {
        final Produto build = Produto.builder()
                .nome(productDto.nome())
                .descricao(productDto.descricao())
                .precoVenda(productDto.precoVenda())
                // .categoria(productDto.idCategoria())
                .build();

        return productRepository.save(build);
    }

}
