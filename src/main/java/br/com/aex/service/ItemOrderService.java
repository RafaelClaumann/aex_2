package br.com.aex.service;

import br.com.aex.entity.ItemPedido;
import br.com.aex.repository.ItemOrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemOrderService {

    private final ItemOrderRepository itemOrderRepository;

    public ItemOrderService(ItemOrderRepository itemOrderRepository) {
        this.itemOrderRepository = itemOrderRepository;
    }

    public List<ItemPedido> saveAll(final List<ItemPedido> itemOrders) {
        return itemOrderRepository.saveAll(itemOrders);
    }

}
