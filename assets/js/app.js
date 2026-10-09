(() => {
    const order = new Map();
    const drawer = document.getElementById('order');
    const orderItems = document.getElementById('order-items');
    const total = document.getElementById('order-total');
    const toast = document.getElementById('toast');
    let toastTimer;

    const showToast = (message) => {
        toast.textContent = message;
        toast.classList.remove('is-hidden');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.add('is-hidden'), 2200);
    };

    const renderOrder = () => {
        if (!order.size) {
            orderItems.innerHTML = '<p class="font-body-md text-on-surface-variant">Your royal table is waiting.</p>';
            total.textContent = '₹0';
            return;
        }

        let sum = 0;
        orderItems.innerHTML = [...order].map(([name, item]) => {
            sum += item.price * item.quantity;
            return `<div class="flex justify-between gap-4 font-body-md"><span class="text-on-background">${name}<small class="block text-on-surface-variant">₹${item.price} x ${item.quantity}</small></span><button class="text-primary" data-remove="${name}" aria-label="Remove ${name}">Remove</button></div>`;
        }).join('');
        total.textContent = `₹${sum}`;
    };

    const openOrder = (event) => {
        event?.preventDefault();
        drawer.classList.remove('is-hidden');
        drawer.setAttribute('aria-hidden', 'false');
    };
    const closeOrder = () => {
        drawer.classList.add('is-hidden');
        drawer.setAttribute('aria-hidden', 'true');
    };

    document.querySelectorAll('[data-order]').forEach((button) => button.addEventListener('click', openOrder));
    document.querySelector('[data-scroll-to="menu"]').addEventListener('click', () => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' }));
    document.getElementById('close-order').addEventListener('click', closeOrder);
    document.getElementById('checkout').addEventListener('click', () => showToast(order.size ? 'Your order is ready to be confirmed.' : 'Add a royal creation first.'));
    document.querySelectorAll('[data-add]').forEach((button) => button.addEventListener('click', () => {
        const name = button.dataset.add;
        const item = order.get(name) || { price: Number(button.dataset.price), quantity: 0 };
        item.quantity += 1;
        order.set(name, item);
        renderOrder();
        showToast(`${name} added to your order.`);
    }));
    orderItems.addEventListener('click', (event) => {
        const button = event.target.closest('[data-remove]');
        if (!button) return;
        order.delete(button.dataset.remove);
        renderOrder();
    });

    const fullMenu = document.getElementById('full-menu');
    const extraMenu = document.getElementById('extra-menu');
    fullMenu.addEventListener('click', () => {
        const expanded = fullMenu.getAttribute('aria-expanded') === 'true';
        fullMenu.setAttribute('aria-expanded', String(!expanded));
        extraMenu.classList.toggle('is-hidden', expanded);
        extraMenu.classList.toggle('is-open', !expanded);
        fullMenu.textContent = expanded ? 'View Full Menu' : 'Hide Extra Creations';
        showToast(expanded ? 'Showing signature creations.' : 'Two more royal recipes revealed.');
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeOrder();
    });
})();
