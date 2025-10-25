package br.com.aex.api.controller;

import br.com.aex.api.dto.product.ProductDtoV1;
import br.com.aex.entity.Produto;
import br.com.aex.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/v1/product")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<ProductDtoV1> getProduct(@PathVariable final Long id) {
        final Produto produto = productService.getProduct(id);
        final ProductDtoV1 response = ProductDtoV1.from(produto);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ProductDtoV1> createProduct(@RequestBody @Valid final ProductDtoV1 productDto) {
        final Produto produto = productService.saveProduct(productDto);
        final URI uri = UriComponentsBuilder
                .fromPath("/v1/product/{id}")
                .buildAndExpand(produto.getId())
                .toUri();

        return ResponseEntity.created(uri).body(productDto);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable final Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

}
