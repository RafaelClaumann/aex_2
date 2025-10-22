package br.com.aex.adapter.input;

import br.com.aex.domain.ports.input.GetClientPort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/users")
public class ClienteController {

    private final GetClientPort getClientPort;

    public ClienteController(final GetClientPort getClientPort) {
        this.getClientPort = getClientPort;
    }

    @GetMapping
    public ResponseEntity<String> getUsers() {
        final String clientResponse = getClientPort.getClient();
        return ResponseEntity.ok(clientResponse);
    }

}
