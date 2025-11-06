package br.com.aex.api.controller;

import br.com.aex.api.dto.product.ProductDtoV1;
import br.com.aex.api.dto.product.ProductResponseDtoV1;
import br.com.aex.entity.Produto;
import br.com.aex.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.tags.Tag;
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
import java.util.List;

import static br.com.aex.api.Endpoints.V1_PRODUCT;

@RestController
@RequestMapping(V1_PRODUCT)
@Tag(name = "Product Management", description = "Operations related to Products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    @Operation(summary = "List available Products")
    public ResponseEntity<List<ProductResponseDtoV1>> getProduct() {
        final List<Produto> products = productService.getProducts();
        final List<ProductResponseDtoV1> response = ProductResponseDtoV1.from(products);
        return ResponseEntity.ok(response);
    }


    @GetMapping(path = "/{id}")
    @Operation(summary = "Get Product by ID")
    @Parameter(name = "id", in = ParameterIn.PATH, description = "Product ID")
    public ResponseEntity<ProductResponseDtoV1> getProduct(@PathVariable final Long id) {
        final Produto produto = productService.getProduct(id);
        final ProductResponseDtoV1 response = ProductResponseDtoV1.from(produto);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    @Operation(summary = "Create Product")
    public ResponseEntity<ProductResponseDtoV1> createProduct(@RequestBody @Valid final ProductDtoV1 productDto) {
        final Produto produto = productService.saveProduct(productDto);
        final URI uri = UriComponentsBuilder
                .fromPath(V1_PRODUCT + "/{id}")
                .buildAndExpand(produto.getId())
                .toUri();

        final ProductResponseDtoV1 response = ProductResponseDtoV1.from(produto);
        return ResponseEntity.created(uri).body(response);
    }

    @DeleteMapping(path = "/{id}")
    @Operation(summary = "Delete Product by ID")
    @Parameter(name = "id", in = ParameterIn.PATH, description = "Product ID")
    public ResponseEntity<Void> deleteProduct(@PathVariable final Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

}
