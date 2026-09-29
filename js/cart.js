// Gestión de Carrito de Compras de GRIP

const CART_STORAGE_KEY = 'GRIP_cart_v1';
const FREE_SHIPPING_THRESHOLD = 80000; // $80.000 ARS para envío gratis
const STANDARD_SHIPPING_COST = 6500;  // $6.500 ARS costo estándar

const Cart = {
    getItems() {
        try {
            const data = localStorage.getItem(CART_STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Error leyendo carrito de localStorage', e);
            return [];
        }
    },

    saveItems(items) {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
            this.notify();
        } catch (e) {
            console.error('Error guardando carrito en localStorage', e);
        }
    },

    addItem(productId, size, color, quantity = 1) {
        const items = this.getItems();
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) return false;

        const existingIndex = items.findIndex(
            item => item.productId === productId && item.size === size && item.color === color
        );

        if (existingIndex > -1) {
            items[existingIndex].quantity += quantity;
        } else {
            const cartItemId = `${productId}-${size}-${color}-${Date.now()}`;
            items.push({
                cartItemId,
                productId,
                size,
                color,
                quantity
            });
        }

        this.saveItems(items);
        return true;
    },

    updateQuantity(cartItemId, delta) {
        let items = this.getItems();
        const item = items.find(i => i.cartItemId === cartItemId);
        if (!item) return;

        item.quantity += delta;
        if (item.quantity <= 0) {
            items = items.filter(i => i.cartItemId !== cartItemId);
        }
        this.saveItems(items);
    },

    removeItem(cartItemId) {
        const items = this.getItems().filter(i => i.cartItemId !== cartItemId);
        this.saveItems(items);
    },

    clear() {
        this.saveItems([]);
    },

    getTotals() {
        const items = this.getItems();
        let subtotal = 0;
        let totalItems = 0;

        const detailedItems = items.map(cartItem => {
            const product = PRODUCTS.find(p => p.id === cartItem.productId);
            if (!product) return null;
            const lineTotal = product.price * cartItem.quantity;
            subtotal += lineTotal;
            totalItems += cartItem.quantity;
            return {
                ...cartItem,
                product,
                lineTotal
            };
        }).filter(Boolean);

        const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || totalItems === 0;
        const shippingCost = totalItems === 0 ? 0 : (isFreeShipping ? 0 : STANDARD_SHIPPING_COST);
        const freeShippingDiff = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
        const freeShippingPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
        const total = subtotal + shippingCost;

        return {
            items: detailedItems,
            totalItems,
            subtotal,
            shippingCost,
            isFreeShipping,
            freeShippingDiff,
            freeShippingPercent,
            total
        };
    },

    notify() {
        window.dispatchEvent(new CustomEvent('cart:updated', { detail: this.getTotals() }));
    }
};
