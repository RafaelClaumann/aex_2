INSERT INTO cliente (nome, telefone)
VALUES ('Cliente 01', '48900000001'),
       ('Cliente 02', '48900000002'),
       ('Cliente 03', '48900000003');

INSERT INTO categoria (nome)
VALUES ('LANCHE'),
       ('ACOMPANHAMENTO'),
       ('BEBIDA'),
       ('SOBREMESA'),
       ('COMBO'),
       ('ESPECIAL');

INSERT INTO produto (preco_venda, categoria_id, descricao, nome)
VALUES (28.90, 1, 'Pão brioche, hambúrguer artesanal 180g, queijo, alface, tomate e maionese da casa.',
        'Clássico da Casa'),
       (31.90, 1, 'Hambúrguer 180g, cheddar cremoso, bacon crocante e pão australiano.', 'Cheddar Bacon'),
       (27.50, 1, 'Hambúrguer vegetal, queijo prato, alface, tomate e maionese verde.', 'Veggie Burger'),
       (12.00, 2, 'Porção de batatas fritas crocantes com sal e toque da casa.', 'Batata Tradicional'),
       (15.00, 2, 'Anéis de cebola empanados e crocantes, acompanhados de molho barbecue.', 'Onion Rings'),
       (6.00, 3, 'Coca-Cola, Guaraná ou Sprite 350ml.', 'Refrigerante Lata'),
       (8.00, 3, 'Suco natural de laranja, limão ou maracujá.', 'Suco Natural'),
       (16.90, 4, 'Brownie de chocolate artesanal servido com bola de sorvete.', 'Brownie com Sorvete'),
       (14.00, 4, 'Churros recheado com doce de leite e açúcar com canela.', 'Churros Gourmet'),
       (42.00, 5, 'Hambúrguer Clássico + Batata + Refrigerante.', 'Combo Clássico');

INSERT INTO pagamento (valor_pago, forma_pagamento, status_pagamento)
VALUES (76.80, 'CARTAO_CREDITO', 'PAGO'),
       (70.00, 'PIX', 'PAGO'),
       (39.50, 'DINHEIRO', 'PAGO');

-- Essa informação de valor precisa ser calculada no backend antes de ser salva
-- Ele será a soma de dos ItemPedidos associados ao ID do pedido
-- PEDIDOS (valor = soma dos item_pedido correspondentes)
INSERT INTO pedido (valor, cliente_id, pagamento_id, data_criacao, status)
VALUES (76.80, 1, 1, NOW(), 'FINALIZADO'),   -- pedido 1 - 28.90 + 31.90 + (6*2) = 76.80
       (70.00, 1, 2, NOW(), 'EM_ANDAMENTO'), -- pedido 2 - 42.00 + (14*2) = 70.00
       (39.50, 2, 3, NOW(), 'FINALIZADO');
-- pedido 3 - 27.50 + 12.00 = 39.50

-- A ideia é que preço unitário seja fornecido no momento da compra
-- Esse valor pode ser diferente do preço da tabela Produto, pois podem ocorrer descontos
INSERT INTO item_pedido (preco_unitario, quantidade, pedido_id, produto_id)
VALUES (28.90, 1, 1, 1),  -- 1x Clássico da Casa no pedido 1
       (31.90, 1, 1, 2),  -- 1x Cheddar Bacon no pedido 1
       (6.00, 2, 1, 6),   -- 2x Refrigerante Lata no pedido 1

       (42.00, 1, 2, 10), -- 1x Combo Clássico no pedido 2
       (14.00, 2, 2, 9),  -- 2x Churros Gourmet no pedido 2

       (27.50, 1, 3, 3),  -- 1x Veggie Burger no pedido 3
       (12.00, 1, 3, 4); -- 1x Batata Tradicional no pedido 3
