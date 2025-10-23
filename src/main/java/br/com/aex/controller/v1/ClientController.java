package br.com.aex.controller.v1;

import br.com.aex.entity.Cliente;
import br.com.aex.service.ClientService;
import br.com.aex.service.exceptions.ClientNotFoundException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

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

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Cliente> deleteClient(@PathVariable final Long id) {
        boolean clientExists = clientService.existsById(id);
        if (clientExists) {
            clientService.deleteClient(id);
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<ClientDtoV1> saveClient(@RequestBody @Valid final ClientDtoV1 clienteDto, final UriComponentsBuilder uriBuilder) {
        Cliente clienteEntity = clientService.saveClient(clienteDto);

        var uri = uriBuilder
                .path("/v1/client/{id}")
                .buildAndExpand(clienteEntity.getId())
                .toUri();

        return ResponseEntity
                .created(uri)
                .body(clienteDto);
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ClientNotFoundException.class)
    public ProblemDetail handleClientNotFound(final ClientNotFoundException ex) {
        return ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleRequestBodyValidation(final MethodArgumentNotValidException ex) {
        ProblemDetail problemDetail = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST.value());
        ex.getBindingResult().getFieldErrors().forEach(error -> problemDetail.setProperty(error.getField(), error.getDefaultMessage()));
        return problemDetail;
    }

}
