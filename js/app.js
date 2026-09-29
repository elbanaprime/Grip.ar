// ==========================================================================
// SELENIVO — Control Maestro de Aplicación y UI
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // Estado Global de UI
    // ----------------------------------------------------------------------
    const state = {
        currentView: 'home', // 'home' | 'shop'
        filters: {
            category: 'all',
            gender: 'all',
            badge: null,
            maxPrice: 120000,
            size: 'all',
            search: '',
            sort: 'featured'
        },
        selectedProduct: null,
        selectedColor: null,
        selectedSize: 'M',
        selectedQty: 1
    };

    // ----------------------------------------------------------------------
    // Elementos DOM Principales
    // ----------------------------------------------------------------------
    const siteHeader = document.getElementById('siteHeader');
    const homeView = document.getElementById('homeView');
    const shopView = document.getElementById('shopView');
    const featuredProductsGrid = document.getElementById('featuredProductsGrid');
    const shopProductsGrid = document.getElementById('shopProductsGrid');
    const drawerBackdrop = document.getElementById('drawerBackdrop');

    // Badges de contador
    const cartCountBadge = document.getElementById('cartCountBadge');
    const favCountBadge = document.getElementById('favCountBadge');

    // Drawers
    const cartDrawer = document.getElementById('cartDrawer');
    const cartDrawerCount = document.getElementById('cartDrawerCount');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartShippingCost = document.getElementById('cartShippingCost');
    const cartTotal = document.getElementById('cartTotal');
    const freeShippingMsg = document.getElementById('freeShippingMsg');
    const freeShippingBar = document.getElementById('freeShippingBar');
    const freeShippingPercentText = document.getElementById('freeShippingPercentText');

    const favoritesDrawer = document.getElementById('favoritesDrawer');
    const favDrawerCount = document.getElementById('favDrawerCount');
    const favItemsContainer = document.getElementById('favItemsContainer');

    const mobileDrawer = document.getElementById('mobileDrawer');

    // Modales
    const searchModal = document.getElementById('searchModal');
    const searchMainInput = document.getElementById('searchMainInput');
    const searchResultsGrid = document.getElementById('searchResultsGrid');
    const searchPlaceholderHint = document.getElementById('searchPlaceholderHint');

    const productModal = document.getElementById('productModal');
    const sizeGuideModal = document.getElementById('sizeGuideModal');
    const checkoutModal = document.getElementById('checkoutModal');
    const accountModal = document.getElementById('accountModal');

    // ----------------------------------------------------------------------
    // Utilidad: Sistema de Notificaciones Toast
    // ----------------------------------------------------------------------
    const toastContainer = document.getElementById('toastContainer');

    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = 'toast';
        
        let iconSvg = `
            <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
        `;

        if (type === 'heart') {
            iconSvg = `
                <svg class="toast-icon" style="color: #ff3333;" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
            `;
        }

        toast.innerHTML = `
            ${iconSvg}
            <span>${message}</span>
        `;

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('removing');
            setTimeout(() => toast.remove(), 350);
        }, 3000);
    }

    // ----------------------------------------------------------------------
    // Generador de Tarjeta de Producto HTML
    // ----------------------------------------------------------------------
    function createProductCardHTML(product) {
        const isFav = Favorites.has(product.id);
        const hasSecondaryImage = product.images.length > 1;

        // Swatches
        const swatchesHTML = product.colors.map(c => `
            <span class="swatch-dot" style="background-color: ${c.hex};" title="${c.name}"></span>
        `).join('');

        // Badges
        let badgeHTML = '';
        if (product.badge) {
            const badgeClass = product.badge.includes('SALE') ? 'badge-sale' : 'badge-new';
            badgeHTML = `<span class="product-badge ${badgeClass}">${product.badge}</span>`;
        }

        // Precios
        const priceHTML = `
            <span class="product-price">${formatARS(product.price)}</span>
            ${product.originalPrice > product.price ? `
                <span class="product-original-price">${formatARS(product.originalPrice)}</span>
                <span class="product-discount-tag">${product.badge || ''}</span>
            ` : ''}
        `;

        return `
            <article class="product-card" data-product-id="${product.id}">
                <div class="product-image-container" onclick="window.SELENIVO_APP.openProductModal('${product.id}')">
                    ${badgeHTML}
                    <button class="btn-fav ${isFav ? 'active' : ''}" 
                            data-action="toggle-fav" 
                            data-id="${product.id}"
                            title="${isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}"
                            onclick="event.stopPropagation(); window.SELENIVO_APP.toggleFavorite('${product.id}')">
                        <svg viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                    <img class="product-img" src="${product.images[0]}" alt="${product.name}" loading="lazy">
                    ${hasSecondaryImage ? `
                        <img class="product-img-secondary" src="${product.images[1]}" alt="${product.name} detalle" loading="lazy">
                    ` : ''}
                    <button class="quick-add-btn" onclick="event.stopPropagation(); window.SELENIVO_APP.quickAddToCart('${product.id}')">
                        + AGREGAR AL CARRITO
                    </button>
                </div>
                <div class="product-info">
                    <div class="product-swatches">${swatchesHTML}</div>
                    <h3 class="product-title" onclick="window.SELENIVO_APP.openProductModal('${product.id}')">${product.name}</h3>
                    <div class="product-prices">${priceHTML}</div>
                </div>
            </article>
        `;
    }

    // ----------------------------------------------------------------------
    // Renderizado de Productos Destacados (Home)
    // ----------------------------------------------------------------------
    function renderFeaturedProducts() {
        const featured = PRODUCTS.filter(p => p.featured);
        featuredProductsGrid.innerHTML = featured.map(createProductCardHTML).join('');
    }

    // ----------------------------------------------------------------------
    // Renderizado y Filtrado de Catálogo en Tienda
    // ----------------------------------------------------------------------
    function filterAndRenderShop() {
        let list = [...PRODUCTS];

        // Filtro por Búsqueda de texto
        if (state.filters.search.trim()) {
            const q = state.filters.search.toLowerCase().trim();
            list = list.filter(p => 
                p.name.toLowerCase().includes(q) || 
                p.description.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q)
            );
        }

        // Filtro por Categoría
        if (state.filters.category !== 'all') {
            list = list.filter(p => p.category === state.filters.category);
        }

        // Filtro por Género
        if (state.filters.gender !== 'all') {
            list = list.filter(p => p.gender === state.filters.gender || p.gender === 'unisex');
        }

        // Filtro por Badge / Novedades / Ofertas
        if (state.filters.badge === 'sale') {
            list = list.filter(p => p.isSale);
        } else if (state.filters.badge === 'nuevo') {
            list = list.filter(p => p.isNew);
        }

        // Filtro por Precio Máximo
        list = list.filter(p => p.price <= state.filters.maxPrice);

        // Filtro por Talle
        if (state.filters.size !== 'all') {
            list = list.filter(p => p.sizes.includes(state.filters.size));
        }

        // Ordenamiento
        switch (state.filters.sort) {
            case 'price-asc':
                list.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                list.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
                break;
            case 'bestseller':
                list.sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0));
                break;
            default: // featured
                list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
                break;
        }

        // Actualizar contador
        const countText = document.getElementById('shopItemsCount');
        countText.textContent = `${list.length} ${list.length === 1 ? 'producto encontrado' : 'productos encontrados'}`;

        // Renderizar grilla
        if (list.length === 0) {
            shopProductsGrid.innerHTML = `
                <div class="shop-empty">
                    <h3 class="font-display" style="font-size: 1.5rem; text-transform: uppercase;">No encontramos prendas con esos filtros</h3>
                    <p style="color: var(--text-secondary); max-width: 420px;">
                        Probá ajustando el rango de precio o cambiando los criterios seleccionados.
                    </p>
                    <button class="btn btn-secondary btn-sm" onclick="window.SELENIVO_APP.resetFilters()">
                        RESTAURAR FILTROS
                    </button>
                </div>
            `;
        } else {
            shopProductsGrid.innerHTML = list.map(createProductCardHTML).join('');
        }
    }

    // ----------------------------------------------------------------------
    // Navegación y Vistas (Home vs Tienda)
    // ----------------------------------------------------------------------
    function setView(viewName, filterParams = {}) {
        state.currentView = viewName;

        // Actualizar links activos en header
        document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
            link.classList.remove('active');
        });

        if (viewName === 'home') {
            homeView.style.display = 'block';
            shopView.classList.remove('active');
            document.querySelectorAll('[data-view="home"]').forEach(l => l.classList.add('active'));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (viewName === 'shop') {
            homeView.style.display = 'none';
            shopView.classList.add('active');
            document.querySelectorAll('[data-view="shop"]').forEach(l => l.classList.add('active'));

            // Aplicar parámetros si existen
            if (filterParams.gender) {
                state.filters.gender = filterParams.gender;
                state.filters.badge = null;
                updateGenderChips(filterParams.gender);
                document.getElementById('shopTitle').textContent = `COLECCIÓN ${filterParams.gender.toUpperCase()}`;
                document.getElementById('shopBreadcrumbCategory').textContent = filterParams.gender.toUpperCase();
            } else if (filterParams.badge) {
                state.filters.badge = filterParams.badge;
                state.filters.gender = 'all';
                updateGenderChips('all');
                const badgeTitle = filterParams.badge === 'sale' ? 'OFERTAS EXCLUSIVAS' : 'NEW DROP / NOVEDADES';
                document.getElementById('shopTitle').textContent = badgeTitle;
                document.getElementById('shopBreadcrumbCategory').textContent = badgeTitle;
            } else if (filterParams.category) {
                state.filters.category = filterParams.category;
                updateCategoryChips(filterParams.category);
                document.getElementById('shopTitle').textContent = `CATÁLOGO: ${filterParams.category.toUpperCase()}`;
                document.getElementById('shopBreadcrumbCategory').textContent = filterParams.category.toUpperCase();
            } else {
                document.getElementById('shopTitle').textContent = 'CATÁLOGO COMPLETO';
                document.getElementById('shopBreadcrumbCategory').textContent = 'Tienda';
            }

            filterAndRenderShop();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Cerrar menú móvil si estaba abierto
        closeMobileDrawer();
    }

    function updateCategoryChips(cat) {
        document.querySelectorAll('#categoryChips .filter-chip').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === cat);
        });
    }

    function updateGenderChips(gender) {
        document.querySelectorAll('#genderChips .filter-chip').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.gender === gender);
        });
    }

    function updateSizeChips(size) {
        document.querySelectorAll('#sizeChips .filter-chip').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.size === size);
        });
    }

    // ----------------------------------------------------------------------
    // Carrito: Actualización de UI y Eventos
    // ----------------------------------------------------------------------
    function updateCartUI(totals) {
        // Badges numéricos
        if (totals.totalItems > 0) {
            cartCountBadge.textContent = totals.totalItems;
            cartCountBadge.style.display = 'flex';
        } else {
            cartCountBadge.style.display = 'none';
        }
        cartDrawerCount.textContent = totals.totalItems;

        // Barra de Envío Gratis
        freeShippingBar.style.width = `${totals.freeShippingPercent}%`;
        freeShippingPercentText.textContent = `${totals.freeShippingPercent}%`;

        if (totals.totalItems === 0) {
            freeShippingMsg.textContent = 'Agregá productos para envío gratis ($80.000 ARS)';
        } else if (totals.isFreeShipping) {
            freeShippingMsg.innerHTML = '<strong style="color: #25d366;">¡TENÉS ENVÍO GRATIS A TODO EL PAÍS!</strong>';
        } else {
            freeShippingMsg.textContent = `Te faltan ${formatARS(totals.freeShippingDiff)} para ENVÍO GRATIS`;
        }

        // Lista de Productos en el Carrito
        if (totals.items.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="drawer-empty">
                    <svg class="drawer-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                    <p class="font-tech tracking-wide uppercase" style="font-size: 0.9rem;">Tu carrito está vacío</p>
                    <p style="font-size: 0.82rem; color: var(--text-muted);">Descubrí lo nuevo de la colección 2026</p>
                    <button class="btn btn-secondary btn-sm" onclick="window.SELENIVO_APP.openShopFromCart()">
                        EXPLORAR TIENDA
                    </button>
                </div>
            `;
            document.getElementById('cartDrawerFooter').style.display = 'none';
        } else {
            document.getElementById('cartDrawerFooter').style.display = 'flex';
            cartItemsContainer.innerHTML = totals.items.map(item => `
                <div class="cart-item">
                    <img class="cart-item-img" src="${item.product.images[0]}" alt="${item.product.name}">
                    <div class="cart-item-info">
                        <h4 class="cart-item-title">${item.product.name}</h4>
                        <div class="cart-item-meta">Talle: ${item.size} • Color: ${item.color}</div>
                        <div class="cart-item-price">${formatARS(item.lineTotal)}</div>
                        <div class="cart-item-stepper">
                            <button class="stepper-btn" onclick="Cart.updateQuantity('${item.cartItemId}', -1)">-</button>
                            <span class="stepper-qty">${item.quantity}</span>
                            <button class="stepper-btn" onclick="Cart.updateQuantity('${item.cartItemId}', 1)">+</button>
                        </div>
                    </div>
                    <button class="cart-item-remove" title="Eliminar" onclick="Cart.removeItem('${item.cartItemId}')">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            `).join('');
        }

        // Totales en Drawer
        cartSubtotal.textContent = formatARS(totals.subtotal);
        cartShippingCost.textContent = totals.shippingCost === 0 
            ? (totals.totalItems === 0 ? '$0' : '¡GRATIS!') 
            : formatARS(totals.shippingCost);
        cartTotal.textContent = formatARS(totals.total);
    }

    // ----------------------------------------------------------------------
    // Favoritos: Actualización de UI
    // ----------------------------------------------------------------------
    function updateFavoritesUI(detail) {
        if (detail.count > 0) {
            favCountBadge.textContent = detail.count;
            favCountBadge.style.display = 'flex';
        } else {
            favCountBadge.style.display = 'none';
        }
        favDrawerCount.textContent = detail.count;

        if (detail.items.length === 0) {
            favItemsContainer.innerHTML = `
                <div class="drawer-empty">
                    <svg class="drawer-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <p class="font-tech tracking-wide uppercase" style="font-size: 0.9rem;">No tenés favoritos guardados</p>
                    <p style="font-size: 0.82rem; color: var(--text-muted);">Guardá las prendas que más te gusten haciendo clic en el corazón.</p>
                </div>
            `;
        } else {
            favItemsContainer.innerHTML = detail.items.map(product => `
                <div class="cart-item">
                    <img class="cart-item-img" src="${product.images[0]}" alt="${product.name}">
                    <div class="cart-item-info">
                        <h4 class="cart-item-title">${product.name}</h4>
                        <div class="cart-item-price">${formatARS(product.price)}</div>
                        <button class="btn btn-secondary btn-sm" style="margin-top: 8px; width: fit-content;" 
                                onclick="window.SELENIVO_APP.quickAddToCart('${product.id}')">
                            + AL CARRITO
                        </button>
                    </div>
                    <button class="cart-item-remove" title="Quitar de favoritos" onclick="window.SELENIVO_APP.toggleFavorite('${product.id}')">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#ff3333" stroke="#ff3333" stroke-width="1.8">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                </div>
            `).join('');
        }

        // Actualizar corazones en grillas activas
        document.querySelectorAll('.btn-fav').forEach(btn => {
            const pId = btn.dataset.id;
            const active = Favorites.has(pId);
            btn.classList.toggle('active', active);
            const svg = btn.querySelector('svg');
            if (svg) {
                svg.setAttribute('fill', active ? 'currentColor' : 'none');
            }
        });
    }

    // ----------------------------------------------------------------------
    // Modal de Detalle de Producto
    // ----------------------------------------------------------------------
    function openProductModal(productId) {
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) return;

        state.selectedProduct = product;
        state.selectedColor = product.colors[0].name;
        state.selectedSize = 'M';
        state.selectedQty = 1;

        // Imágenes y galería
        const mainImg = document.getElementById('modalMainImage');
        mainImg.src = product.images[0];
        mainImg.alt = product.name;

        const thumbsContainer = document.getElementById('modalThumbsRow');
        thumbsContainer.innerHTML = product.images.map((imgUrl, index) => `
            <img class="modal-thumb ${index === 0 ? 'active' : ''}" src="${imgUrl}" alt="Miniatura ${index + 1}" 
                 onclick="window.SELENIVO_APP.setModalMainImage('${imgUrl}', this)">
        `).join('');

        // Info general
        document.getElementById('modalProductCategory').textContent = product.category.toUpperCase();
        document.getElementById('modalProductTitle').textContent = product.name;
        document.getElementById('modalProductPrice').textContent = formatARS(product.price);

        const origPriceElem = document.getElementById('modalProductOriginalPrice');
        const discountElem = document.getElementById('modalProductDiscountTag');
        if (product.originalPrice > product.price) {
            origPriceElem.style.display = 'inline';
            origPriceElem.textContent = formatARS(product.originalPrice);
            discountElem.style.display = 'inline';
            discountElem.textContent = product.badge || 'SALE';
        } else {
            origPriceElem.style.display = 'none';
            discountElem.style.display = 'none';
        }

        document.getElementById('modalProductDesc').textContent = product.description;

        // Colores
        document.getElementById('modalSelectedColorName').textContent = state.selectedColor;
        const colorOptionsContainer = document.getElementById('modalColorOptions');
        colorOptionsContainer.innerHTML = product.colors.map((c, idx) => `
            <button class="color-option-btn ${idx === 0 ? 'active' : ''}" 
                    onclick="window.SELENIVO_APP.selectModalColor('${c.name}', this)">
                <span class="color-dot" style="background-color: ${c.hex};"></span>
                <span>${c.name}</span>
            </button>
        `).join('');

        // Talles
        document.getElementById('modalSelectedSizeName').textContent = state.selectedSize;
        const sizeOptionsContainer = document.getElementById('modalSizeOptions');
        sizeOptionsContainer.innerHTML = ['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => {
            const isAvailable = product.sizes.includes(size);
            const isDefault = size === 'M';
            return `
                <button class="size-option-btn ${isDefault ? 'active' : ''} ${!isAvailable ? 'disabled' : ''}" 
                        ${!isAvailable ? 'disabled style="opacity: 0.3; cursor: not-allowed;"' : ''}
                        onclick="window.SELENIVO_APP.selectModalSize('${size}', this)">
                    ${size}
                </button>
            `;
        }).join('');

        // Cantidad
        document.getElementById('modalQtyVal').textContent = '1';

        // Detalles de lista
        const detailsList = document.getElementById('modalDetailsList');
        detailsList.innerHTML = product.details.map(d => `<li>${d}</li>`).join('');

        // Abrir modal
        productModal.classList.add('active');
        document.body.classList.add('modal-open');
    }

    function closeProductModal() {
        productModal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    // ----------------------------------------------------------------------
    // Modal de Búsqueda Rápida
    // ----------------------------------------------------------------------
    function openSearchModal() {
        searchModal.classList.add('active');
        document.body.classList.add('modal-open');
        setTimeout(() => searchMainInput.focus(), 100);
    }

    function closeSearchModal() {
        searchModal.classList.remove('active');
        document.body.classList.remove('modal-open');
        searchMainInput.value = '';
        searchResultsGrid.style.display = 'none';
        searchPlaceholderHint.style.display = 'block';
    }

    searchMainInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query.length < 2) {
            searchResultsGrid.style.display = 'none';
            searchPlaceholderHint.style.display = 'block';
            return;
        }

        const matches = PRODUCTS.filter(p => 
            p.name.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        );

        searchPlaceholderHint.style.display = 'none';
        searchResultsGrid.style.display = 'grid';

        if (matches.length === 0) {
            searchResultsGrid.innerHTML = `
                <p style="grid-column: 1 / -1; padding: 20px; text-align: center; color: var(--text-secondary);">
                    No se encontraron resultados para "${query}".
                </p>
            `;
        } else {
            searchResultsGrid.innerHTML = matches.map(p => `
                <div class="product-card" style="cursor: pointer;" onclick="window.SELENIVO_APP.openProductFromSearch('${p.id}')">
                    <div class="product-image-container" style="aspect-ratio: 1/1;">
                        <img class="product-img" src="${p.images[0]}" alt="${p.name}">
                    </div>
                    <div class="product-info">
                        <h4 class="product-title" style="font-size: 0.85rem;">${p.name}</h4>
                        <div class="product-price" style="font-size: 0.9rem;">${formatARS(p.price)}</div>
                    </div>
                </div>
            `).join('');
        }
    });

    // ----------------------------------------------------------------------
    // Manejo de Drawers (Apertura y Cierre)
    // ----------------------------------------------------------------------
    function openCartDrawer() {
        closeAllDrawers();
        cartDrawer.classList.add('active');
        drawerBackdrop.classList.add('active');
        document.body.classList.add('modal-open');
    }

    function closeCartDrawer() {
        cartDrawer.classList.remove('active');
        drawerBackdrop.classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    function openFavoritesDrawer() {
        closeAllDrawers();
        favoritesDrawer.classList.add('active');
        drawerBackdrop.classList.add('active');
        document.body.classList.add('modal-open');
    }

    function closeFavoritesDrawer() {
        favoritesDrawer.classList.remove('active');
        drawerBackdrop.classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    function openMobileDrawer() {
        closeAllDrawers();
        mobileDrawer.classList.add('active');
        document.body.classList.add('modal-open');
    }

    function closeMobileDrawer() {
        mobileDrawer.classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    function closeAllDrawers() {
        cartDrawer.classList.remove('active');
        favoritesDrawer.classList.remove('active');
        mobileDrawer.classList.remove('active');
        drawerBackdrop.classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    drawerBackdrop.addEventListener('click', closeAllDrawers);

    // ----------------------------------------------------------------------
    // Modal de Checkout y Flujo de Compra
    // ----------------------------------------------------------------------
    const checkoutShippingForm = document.getElementById('checkoutShippingForm');
    const checkoutPaymentView = document.getElementById('checkoutPaymentView');
    const checkoutSuccessView = document.getElementById('checkoutSuccessView');

    function openCheckoutModal() {
        closeCartDrawer();
        const totals = Cart.getTotals();
        if (totals.totalItems === 0) {
            showToast('Tu carrito está vacío para comprar', 'error');
            return;
        }

        // Reiniciar vistas de checkout
        checkoutShippingForm.style.display = 'block';
        checkoutPaymentView.style.display = 'none';
        checkoutSuccessView.style.display = 'none';

        document.getElementById('checkoutStepIndicator1').classList.add('active');
        document.getElementById('checkoutStepIndicator2').classList.remove('active');
        document.getElementById('checkoutStepIndicator3').classList.remove('active');

        document.getElementById('checkoutStep1Total').textContent = formatARS(totals.total);

        checkoutModal.classList.add('active');
        document.body.classList.add('modal-open');
    }

    function closeCheckoutModal() {
        checkoutModal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    checkoutShippingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Avanzar a paso 2: Pago
        checkoutShippingForm.style.display = 'none';
        checkoutPaymentView.style.display = 'block';

        document.getElementById('checkoutStepIndicator1').classList.remove('active');
        document.getElementById('checkoutStepIndicator2').classList.add('active');
    });

    document.getElementById('btnBackToShipping').addEventListener('click', () => {
        checkoutShippingForm.style.display = 'block';
        checkoutPaymentView.style.display = 'none';
        document.getElementById('checkoutStepIndicator1').classList.add('active');
        document.getElementById('checkoutStepIndicator2').classList.remove('active');
    });

    document.querySelectorAll('.payment-option').forEach(opt => {
        opt.addEventListener('click', () => {
            document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            const radio = opt.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
        });
    });

    document.getElementById('btnConfirmOrder').addEventListener('click', () => {
        // Generar código de seguimiento simulado
        const randCode = Math.floor(10000 + Math.random() * 90000);
        document.getElementById('orderTrackingCode').textContent = `#SLN-${randCode}`;

        // Vaciar carrito tras la compra exitosa
        Cart.clear();

        // Mostrar pantalla de éxito
        checkoutPaymentView.style.display = 'none';
        checkoutSuccessView.style.display = 'flex';

        document.getElementById('checkoutStepIndicator2').classList.remove('active');
        document.getElementById('checkoutStepIndicator3').classList.add('active');

        showToast('¡Compra realizada con éxito! Recibirás tu tracking en minutos.');
    });

    document.getElementById('btnFinishCheckout').addEventListener('click', () => {
        closeCheckoutModal();
        setView('home');
    });

    // ----------------------------------------------------------------------
    // Listeners de Eventos en Header & Scroll
    // ----------------------------------------------------------------------
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            siteHeader.classList.add('scrolled');
        } else {
            siteHeader.classList.remove('scrolled');
        }
    });

    // Enlaces de Navegación del Header & Drawer
    document.querySelectorAll('[data-view="home"]').forEach(elem => {
        elem.addEventListener('click', (e) => {
            e.preventDefault();
            setView('home');
        });
    });

    document.querySelectorAll('[data-view="shop"]').forEach(elem => {
        elem.addEventListener('click', (e) => {
            e.preventDefault();
            state.filters.gender = 'all';
            state.filters.badge = null;
            state.filters.category = 'all';
            updateGenderChips('all');
            updateCategoryChips('all');
            setView('shop');
        });
    });

    document.querySelectorAll('[data-filter-gender]').forEach(elem => {
        elem.addEventListener('click', (e) => {
            e.preventDefault();
            const gender = elem.dataset.filterGender;
            setView('shop', { gender });
        });
    });

    document.querySelectorAll('[data-filter-badge]').forEach(elem => {
        elem.addEventListener('click', (e) => {
            e.preventDefault();
            const badge = elem.dataset.filterBadge;
            setView('shop', { badge });
        });
    });

    // Logo click
    document.getElementById('logoHome').addEventListener('click', (e) => {
        e.preventDefault();
        setView('home');
    });

    // Botones Hero
    document.getElementById('heroBtnShop').addEventListener('click', () => {
        setView('shop');
    });

    document.getElementById('heroBtnCollection').addEventListener('click', () => {
        setView('shop');
    });

    // Botones de secciones Home
    document.getElementById('btnViewAllFeatured').addEventListener('click', () => {
        setView('shop');
    });

    document.getElementById('btnCampaignSale').addEventListener('click', () => {
        setView('shop', { badge: 'sale' });
    });

    document.getElementById('btnDiscoverBrand').addEventListener('click', () => {
        setView('shop');
    });

    document.getElementById('btnExploreNewDrop').addEventListener('click', () => {
        setView('shop', { badge: 'nuevo' });
    });

    // Tarjetas de categorías en Home
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const gender = card.dataset.filterGender;
            setView('shop', { gender });
        });
    });

    // Botones Header
    document.getElementById('btnOpenSearch').addEventListener('click', openSearchModal);
    document.getElementById('btnCloseSearchModal').addEventListener('click', closeSearchModal);

    document.getElementById('btnOpenCart').addEventListener('click', openCartDrawer);
    document.getElementById('btnCloseCartDrawer').addEventListener('click', closeCartDrawer);
    document.getElementById('btnContinueShopping').addEventListener('click', closeCartDrawer);
    document.getElementById('btnGoToCheckout').addEventListener('click', openCheckoutModal);

    document.getElementById('btnOpenFavorites').addEventListener('click', openFavoritesDrawer);
    document.getElementById('btnCloseFavDrawer').addEventListener('click', closeFavoritesDrawer);

    document.getElementById('btnMobileToggle').addEventListener('click', openMobileDrawer);
    document.getElementById('btnCloseMobileDrawer').addEventListener('click', closeMobileDrawer);

    // Botón Cuenta
    document.getElementById('btnOpenAccount').addEventListener('click', () => {
        accountModal.classList.add('active');
        document.body.classList.add('modal-open');
    });
    document.getElementById('btnCloseAccountModal').addEventListener('click', () => {
        accountModal.classList.remove('active');
        document.body.classList.remove('modal-open');
    });
    document.getElementById('accountLoginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Sesión iniciada correctamente');
        accountModal.classList.remove('active');
        document.body.classList.remove('modal-open');
    });
    document.getElementById('btnRegisterAccount').addEventListener('click', () => {
        showToast('Funcionalidad de registro activada');
    });

    // Botón Guía de Talles
    document.getElementById('btnOpenSizeGuideFromModal').addEventListener('click', () => {
        sizeGuideModal.classList.add('active');
    });
    document.getElementById('btnCloseSizeGuideModal').addEventListener('click', () => {
        sizeGuideModal.classList.remove('active');
    });
    document.getElementById('btnCloseSizeGuideBtn').addEventListener('click', () => {
        sizeGuideModal.classList.remove('active');
    });
    document.getElementById('footerSizeGuide').addEventListener('click', (e) => {
        e.preventDefault();
        sizeGuideModal.classList.add('active');
        document.body.classList.add('modal-open');
    });

    // Footer info links
    ['footerHelpContact', 'footerHelpFaq', 'footerHelpShipping', 'footerHelpReturns', 'footerAbout', 'footerTerms', 'footerPrivacy'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                showToast(`Sección de ${el.textContent} disponible en centro de ayuda.`);
            });
        }
    });

    // Cerrar modal de producto
    document.getElementById('btnCloseProductModal').addEventListener('click', closeProductModal);

    // Modal de producto: Botones Cantidad
    document.getElementById('modalQtyMinus').addEventListener('click', () => {
        if (state.selectedQty > 1) {
            state.selectedQty--;
            document.getElementById('modalQtyVal').textContent = state.selectedQty;
        }
    });

    document.getElementById('modalQtyPlus').addEventListener('click', () => {
        state.selectedQty++;
        document.getElementById('modalQtyVal').textContent = state.selectedQty;
    });

    // Modal de producto: Agregar al Carrito
    document.getElementById('modalBtnAddToCart').addEventListener('click', () => {
        if (!state.selectedProduct) return;
        Cart.addItem(
            state.selectedProduct.id,
            state.selectedSize,
            state.selectedColor,
            state.selectedQty
        );
        showToast(`Agregado al carrito: ${state.selectedProduct.name} (${state.selectedSize})`);
        closeProductModal();
        openCartDrawer();
    });

    // Modal de producto: Comprar Ahora
    document.getElementById('modalBtnBuyNow').addEventListener('click', () => {
        if (!state.selectedProduct) return;
        Cart.addItem(
            state.selectedProduct.id,
            state.selectedSize,
            state.selectedColor,
            state.selectedQty
        );
        closeProductModal();
        openCheckoutModal();
    });

    // Acordeones en Modal de Producto
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isOpen = content.classList.contains('active');
            content.classList.toggle('active', !isOpen);
            header.querySelector('span:last-child').textContent = isOpen ? '+' : '−';
        });
    });

    // Newsletter Form
    document.getElementById('newsletterForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const input = e.target.querySelector('input');
        showToast('¡Te uniste a SELENIVO! Te enviamos tu 15% OFF al email.');
        input.value = '';
    });

    // Filtros de Tienda: Chips Categoría
    document.querySelectorAll('#categoryChips .filter-chip').forEach(btn => {
        btn.addEventListener('click', () => {
            state.filters.category = btn.dataset.category;
            updateCategoryChips(btn.dataset.category);
            filterAndRenderShop();
        });
    });

    // Filtros de Tienda: Chips Género
    document.querySelectorAll('#genderChips .filter-chip').forEach(btn => {
        btn.addEventListener('click', () => {
            state.filters.gender = btn.dataset.gender;
            state.filters.badge = null;
            updateGenderChips(btn.dataset.gender);
            filterAndRenderShop();
        });
    });

    // Filtros de Tienda: Slider Precio
    const priceSlider = document.getElementById('priceSlider');
    const priceSliderValue = document.getElementById('priceSliderValue');
    priceSlider.addEventListener('input', (e) => {
        state.filters.maxPrice = parseInt(e.target.value, 10);
        priceSliderValue.textContent = formatARS(state.filters.maxPrice);
        filterAndRenderShop();
    });

    // Filtros de Tienda: Chips Talles
    document.querySelectorAll('#sizeChips .filter-chip').forEach(btn => {
        btn.addEventListener('click', () => {
            state.filters.size = btn.dataset.size;
            updateSizeChips(btn.dataset.size);
            filterAndRenderShop();
        });
    });

    // Filtros de Tienda: Input Búsqueda en Vivo
    document.getElementById('shopSearchInput').addEventListener('input', (e) => {
        state.filters.search = e.target.value;
        filterAndRenderShop();
    });

    // Ordenamiento de Tienda
    document.getElementById('sortSelect').addEventListener('change', (e) => {
        state.filters.sort = e.target.value;
        filterAndRenderShop();
    });

    // Botón Resetear Filtros
    document.getElementById('btnResetFilters').addEventListener('click', () => {
        window.SELENIVO_APP.resetFilters();
    });

    // Cerrar modales con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllDrawers();
            closeProductModal();
            closeSearchModal();
            closeCheckoutModal();
            accountModal.classList.remove('active');
            sizeGuideModal.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    });

    // ----------------------------------------------------------------------
    // Exponer API Pública en window.SELENIVO_APP
    // ----------------------------------------------------------------------
    window.SELENIVO_APP = {
        openProductModal(productId) {
            openProductModal(productId);
        },

        quickAddToCart(productId) {
            const product = PRODUCTS.find(p => p.id === productId);
            if (!product) return;
            const defaultColor = product.colors[0].name;
            const defaultSize = 'M';
            Cart.addItem(productId, defaultSize, defaultColor, 1);
            showToast(`Agregado al carrito: ${product.name}`);
        },

        toggleFavorite(productId) {
            const added = Favorites.toggle(productId);
            const product = PRODUCTS.find(p => p.id === productId);
            if (added) {
                showToast(`Agregado a tus favoritos: ${product.name}`, 'heart');
            } else {
                showToast(`Eliminado de tus favoritos: ${product.name}`);
            }
        },

        setModalMainImage(url, thumbElem) {
            document.getElementById('modalMainImage').src = url;
            document.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
            if (thumbElem) thumbElem.classList.add('active');
        },

        selectModalColor(colorName, btnElem) {
            state.selectedColor = colorName;
            document.getElementById('modalSelectedColorName').textContent = colorName;
            document.querySelectorAll('.color-option-btn').forEach(b => b.classList.remove('active'));
            if (btnElem) btnElem.classList.add('active');
        },

        selectModalSize(size, btnElem) {
            state.selectedSize = size;
            document.getElementById('modalSelectedSizeName').textContent = size;
            document.querySelectorAll('.size-option-btn').forEach(b => b.classList.remove('active'));
            if (btnElem) btnElem.classList.add('active');
        },

        openProductFromSearch(productId) {
            closeSearchModal();
            openProductModal(productId);
        },

        openShopFromCart() {
            closeCartDrawer();
            setView('shop');
        },

        resetFilters() {
            state.filters = {
                category: 'all',
                gender: 'all',
                badge: null,
                maxPrice: 120000,
                size: 'all',
                search: '',
                sort: 'featured'
            };
            priceSlider.value = 120000;
            priceSliderValue.textContent = formatARS(120000);
            document.getElementById('shopSearchInput').value = '';
            document.getElementById('sortSelect').value = 'featured';
            updateCategoryChips('all');
            updateGenderChips('all');
            updateSizeChips('all');
            filterAndRenderShop();
            showToast('Filtros restaurados');
        }
    };

    // ----------------------------------------------------------------------
    // Escuchar Eventos de Estado
    // ----------------------------------------------------------------------
    window.addEventListener('cart:updated', (e) => {
        updateCartUI(e.detail);
    });

    window.addEventListener('favorites:updated', (e) => {
        updateFavoritesUI(e.detail);
    });

    // ----------------------------------------------------------------------
    // Inicialización
    // ----------------------------------------------------------------------
    renderFeaturedProducts();
    updateCartUI(Cart.getTotals());
    updateFavoritesUI({
        count: Favorites.getItems().length,
        items: Favorites.getDetailedItems()
    });
});
