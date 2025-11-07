package br.com.aex.api.controller;

import br.com.aex.api.dto.client.ClientDtoV1;
import br.com.aex.api.dto.client.ClientOrderResponseDtoV1;
import br.com.aex.api.dto.client.ClientPatchDtoV1;
import br.com.aex.api.dto.client.ClientResponseDtoV1;
import br.com.aex.entity.Cliente;
import br.com.aex.service.ClientService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

import static br.com.aex.api.Endpoints.V1_CLIENT;

@RestController
@RequestMapping(V1_CLIENT)
@Tag(name = "Client Management", description = "Operations related to Clients")
public class ClientController {

    final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping
    @Operation(summary = "Get Client by telephone number")
    @Parameter(name = "telephone", in = ParameterIn.QUERY, description = "Telephone number")
    public ResponseEntity<ClientResponseDtoV1> getClient(@RequestParam final String telephone) {
        final Cliente client = clientService.getClient(telephone);
        final ClientResponseDtoV1 response = ClientResponseDtoV1.from(client);
        return ResponseEntity.ok(response);
    }

    @GetMapping(path = "/{id}")
    @Operation(summary = "Get Client by ID")
    @Parameter(name = "id", in = ParameterIn.PATH, description = "Client ID")
    public ResponseEntity<ClientResponseDtoV1> getClient(@PathVariable final Long id) {
        final Cliente client = clientService.getClient(id);
        final ClientResponseDtoV1 response = ClientResponseDtoV1.from(client);
        return ResponseEntity.ok(response);
    }

    @GetMapping(path = "/{id}/orders")
    @Operation(summary = "Get Client orders by ID")
    @Parameter(name = "id", in = ParameterIn.PATH, description = "Client ID")
    public ResponseEntity<ClientOrderResponseDtoV1> getClientOrders(@PathVariable final Long id) {
        final Cliente client = clientService.getClient(id);
        final ClientOrderResponseDtoV1 response = ClientOrderResponseDtoV1.from(client);

        return ResponseEntity.ok(response);
    }

    @PostMapping
    @Operation(summary = "Create Client")
    public ResponseEntity<ClientDtoV1> createClient(@RequestBody @Valid final ClientDtoV1 clientDto) {
        final Cliente client = clientService.saveClient(clientDto);
        final URI uri = UriComponentsBuilder
                .fromPath(V1_CLIENT + "/{id}")
                .buildAndExpand(client.getId())
                .toUri();

        return ResponseEntity.created(uri).body(clientDto);
    }

    @PatchMapping(path = "/{id}")
    @Operation(summary = "Patch Client by ID")
    @Parameter(name = "id", in = ParameterIn.PATH, description = "Client ID")
    public ResponseEntity<Cliente> patchClient(@PathVariable final Long id, @RequestBody @Valid final ClientPatchDtoV1 patchDto) {
        clientService.patchClient(id, patchDto);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping(path = "/{id}")
    @Operation(summary = "Delete Client by ID")
    @Parameter(name = "id", in = ParameterIn.PATH, description = "Client ID")
    public ResponseEntity<Cliente> deleteClient(@PathVariable final Long id) {
        clientService.deleteClient(id);
        return ResponseEntity.noContent().build();
    }

}
