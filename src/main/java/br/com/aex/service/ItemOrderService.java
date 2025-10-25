package br.com.aex.service;

import br.com.aex.entity.ItemPedido;
import br.com.aex.repository.ItemOrderRepository;
import br.com.aex.service.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ItemOrderService {

    private final ItemOrderRepository itemOrderRepository;

    public ItemOrderService(ItemOrderRepository itemOrderRepository) {
        this.itemOrderRepository = itemOrderRepository;
    }

    public ItemPedido getItemOrder(final Long id) {
        final Optional<ItemPedido> itemOrder = itemOrderRepository.findById(id);
        return itemOrder.orElseThrow(() -> new ResourceNotFoundException(
                "ItemOrder não encontrado: " + id,
                this.getClass().getSimpleName()
        ));
    }

}
