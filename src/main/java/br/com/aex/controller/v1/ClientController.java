package br.com.aex.controller.v1;

import br.com.aex.entity.Cliente;
import br.com.aex.service.ClientService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@RequestMapping("/v1/client")
public class ClientController {

    final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping
    public ResponseEntity<Cliente> getClient(@RequestParam final Long id) {
        Cliente client = clientService.getClient(id);
        return ResponseEntity.ok(client);
    }

}
