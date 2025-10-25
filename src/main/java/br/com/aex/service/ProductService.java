package br.com.aex.service;

import br.com.aex.api.dto.product.ProductDtoV1;
import br.com.aex.entity.Produto;
import br.com.aex.repository.ProductRepository;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Produto saveProduct(final ProductDtoV1 productDto) {
        Produto build = Produto.builder()
                .nome(productDto.nome())
                .descricao(productDto.descricao())
                .precoVenda(productDto.precoVenda())
                // .categoria(productDto.idCategoria())
                .build();

        return productRepository.save(build);
    }

}
