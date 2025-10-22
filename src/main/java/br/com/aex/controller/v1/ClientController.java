package br.com.aex.controller.v1;

import br.com.aex.entity.Cliente;
import br.com.aex.service.ClientService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/client")
public class ClientController {

    final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Cliente> getClient(@PathVariable final Long id) {
        Cliente client = clientService.getClient(id);
        return ResponseEntity.ok(client);
    }

}
