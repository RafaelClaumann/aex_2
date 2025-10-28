package br.com.aex.api.dto.client;

import br.com.aex.api.dto.order.OrderResponseDtoV1;
import br.com.aex.entity.Cliente;

import java.util.List;

public record ClientOrderResponseDtoV1(
        ClientDtoV1 client,
        List<OrderResponseDtoV1> orders
) {

    public static ClientOrderResponseDtoV1 from(final Cliente client) {
        final ClientDtoV1 clientDto = new ClientDtoV1(client.getNome(), client.getTelefone());
        final List<OrderResponseDtoV1> ordersDtoList = client.getPedido().stream().map(OrderResponseDtoV1::from).toList();

        return new ClientOrderResponseDtoV1(clientDto, ordersDtoList);
    }

}
