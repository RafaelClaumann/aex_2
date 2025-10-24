package br.com.aex.api.controller;

import br.com.aex.api.dto.client.ClientDtoV1;
import br.com.aex.api.dto.client.ClientPatchDtoV1;
import br.com.aex.api.dto.client.ClientResponseDtoV1;
import br.com.aex.entity.Cliente;
import br.com.aex.service.ClientService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/v1/client")
public class ClientController {

    final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Cliente> getClient(@PathVariable final Long id) {
        final Cliente client = clientService.getClient(id);
        return ResponseEntity.ok(client);
    }

    @GetMapping(path = "/{id}/orders")
    public ResponseEntity<ClientResponseDtoV1> getClientOrders(@PathVariable final Long id) {
        final Cliente client = clientService.getClient(id);
        final ClientResponseDtoV1 response = ClientResponseDtoV1.from(client);

        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ClientDtoV1> saveClient(@RequestBody @Valid final ClientDtoV1 clientDto, final UriComponentsBuilder uriBuilder) {
        final Cliente clienteEntity = clientService.saveClient(clientDto);
        final URI uri = uriBuilder
                .path("/v1/client/{id}")
                .buildAndExpand(clienteEntity.getId())
                .toUri();

        return ResponseEntity.created(uri).body(clientDto);
    }

    @PatchMapping(path = "/{id}")
    public ResponseEntity<Cliente> patchClient(@PathVariable final Long id, @RequestBody @Valid final ClientPatchDtoV1 patchDto) {
        clientService.patchClient(id, patchDto);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Cliente> deleteClient(@PathVariable final Long id) {
        clientService.deleteClient(id);
        return ResponseEntity.noContent().build();
    }

}
