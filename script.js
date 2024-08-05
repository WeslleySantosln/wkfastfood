$('.btn').click(function () {
    $(this).toggleClass('active');
  });


document.addEventListener('DOMContentLoaded', function() {
    let cart = [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.getElementById('cart-total');
    const clearCartButton = document.querySelector('.clear-cart');
    const checkoutButton = document.querySelector('.checkout');

    // Atualiza o total do carrinho
    function updateCartTotal() {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total.toFixed(2);
    }

    // Renderiza os itens do carrinho
    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <p>${item.name} - ${item.note}</p>
                <div class="quantity-control">
                    <button class="decrease-quantity" data-index="${index}">-</button>
                    <p>${item.quantity}</p>
                    <button class="increase-quantity" data-index="${index}">+</button>
                    <p>R$ ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        // Adiciona eventos para botões de quantidade
        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                cart[index].quantity += 1;
                renderCartItems();
                updateCartTotal();
            });
        });

        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                    renderCartItems();
                    updateCartTotal();
                }else if (cart[index].quantity = 1) {
                    cart[index].quantity -= 1;
                    cart.splice(index,1);
                    renderCartItems();
                    updateCartTotal();


                }
            });
        });
    }

    function addToCart(name, price, quantity, note) {
        // Verifica se o item já existe no carrinho com a mesma observação
        const existingItem = cart.find(item => item.name === name && item.note === note);
        
        if (existingItem) {
            // Se o item já existe com a mesma observação, apenas atualize a quantidade
            existingItem.quantity += quantity;
        } else {
            // Se o item não existe ou tem uma observação diferente, adicione um novo item
            cart.push({ name, price, quantity, note });
        }
        
        renderCartItems();
        updateCartTotal();
    }
    

    // Limpa o carrinho
    function clearCart() {
        cart = [];
        renderCartItems();
        updateCartTotal();
    }

    // Inicializa os botões de alternância
    document.querySelectorAll('.toggle-btn').forEach(button => {
        button.addEventListener('click', function() {
            const categoryItems = this.nextElementSibling;
            if (categoryItems.classList.contains('hidden')) {
                categoryItems.classList.remove('hidden');
                this.textContent = 'Ocultar Itens';
            } else {
                categoryItems.classList.add('hidden');
                this.textContent = 'Mostrar Itens';
            }
        });
    });

    // Adiciona itens ao carrinho a partir dos checkboxes
    /*document.querySelectorAll('.checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const menuItem = this.closest('.menu-item');
            const itemName = menuItem.querySelector('h3').textContent;
            const itemPrice = parseFloat(menuItem.querySelector('p').textContent.replace('R$ ', ''));
            const itemQuantity = parseInt(menuItem.querySelector('input[type="number"]').value);
            const itemNote = menuItem.querySelector('input[type="text"]').value;

            if (this.checked) {
                addToCart(itemName, itemPrice, itemQuantity, itemNote);
            } else {
                // Remover item do carrinho quando desmarcado (opcional)
                const itemIndex = cart.findIndex(item => item.name === itemName);
                if (itemIndex > -1) {
                    cart.splice(itemIndex, 1);
                    renderCartItems();
                    updateCartTotal();
                }
            }
        });
    });*/

    // Adiciona itens ao carrinho a partir dos botões "Adicionar ao carrinho"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const menuItem = this.closest('.menu-item');
            const itemName = menuItem.querySelector('h3').textContent;
            const itemPrice = parseFloat(menuItem.querySelector('p').textContent.replace('R$ ', ''));
            const itemQuantity = parseInt(menuItem.querySelector('input[type="number"]').value);
            const itemNote = menuItem.querySelector('input[type="text"]').value;

            addToCart(itemName, itemPrice, itemQuantity, itemNote);
        });
    });

    clearCartButton.addEventListener('click', clearCart);
    checkoutButton.addEventListener('click', function() {
        alert('Pedido finalizado!');
        clearCart();
    });
});


