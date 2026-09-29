# SELENIVO — Tienda Web Oficial (Streetwear & High Fashion)

Sitio web moderno, premium y completamente responsive creado para **SELENIVO**, marca de moda urbana inspirada en la estética contemporánea, minimalista y vanguardista.

---

## 💎 Identidad de Marca y Concepto Visual
- **Colores**: Negro profundo (`#0a0a0a`), Gris industrial (`#1a1a1a`), Blanco puro/cálido (`#f5f5f7`) y detalles plateados.
- **Tipografías**: *Syne* (títulos de gran impacto y presencia editorial), *Space Grotesk* (detalles técnicos y navegación) e *Inter* (lectura optimizada).
- **Fotografía**: Selección editorial en alta resolución de modelos urbanos e iluminación cinematográfica.
- **Micro-interacciones**:
  - Ticker infinito superior con promociones y cuotas.
  - Header sticky con efecto desenfoque (*glassmorphism*).
  - Efecto de cambio a segunda fotografía al pasar el mouse por cada producto.
  - Carrito lateral deslizable con barra dinámica de envío gratis.
  - Lista de deseos / favoritos con almacenamiento local.
  - Vista interactiva de producto con selector de talles (XS a XXL), colores, selector de cantidad y acordeones informativos.
  - Guía de talles interactiva con tabla de medidas en centímetros.
  - Catálogo completo con buscador en tiempo real, filtros por categoría, género, talle, precio y ordenamiento.
  - Simulación de Checkout en 3 pasos con confirmación de compra y código de seguimiento.
  - Notificaciones flotantes (*toasts*) para cada interacción.

---

## 📁 Estructura del Proyecto

```
selenivo_store/
├── index.html              # Estructura principal, vistas (Home / Tienda), drawers y modales
├── css/
│   └── style.css           # Hoja de estilos con variables, diseño responsive y animaciones
├── js/
│   ├── products.js         # Catálogo de productos con imágenes en alta resolución, precios en ARS y detalles
│   ├── cart.js             # Módulo de lógica del carrito (persistente en localStorage)
│   ├── favorites.js        # Módulo de lista de deseos (persistente en localStorage)
│   └── app.js              # Enrutador, filtros dinámicos, control de modales y checkout
└── README.md               # Documentación del proyecto
```

---

## 🚀 Cómo Abrir y Usar la Web

1. **Abrir directamente en cualquier navegador**:
   - Hace doble clic en el archivo [index.html](file:///C:/Users/usuario/.gemini/antigravity/scratch/selenivo_store/index.html) o arrástralo a Google Chrome, Microsoft Edge, Firefox, Brave o Safari.

2. **O desde la terminal / PowerShell**:
   ```powershell
   cd C:\Users\usuario\.gemini\antigravity\scratch\selenivo_store
   Start-Process index.html
   ```

---

## 🏷️ Productos Incluidos (Precios en ARS)

1. **SELENIVO Oversized Tee** — $29.900 (Antes: $38.900 | SALE -25%)
2. **SELENIVO Essential Hoodie** — $59.900 (NUEVO)
3. **SELENIVO Baggy Cargo** — $64.900 (Antes: $79.900 | SALE -20%)
4. **SELENIVO Graphic Tee** — $34.900 (NUEVO)
5. **SELENIVO Oversized Crewneck** — $69.900 (Antes: $85.900 | SALE -18%)
6. **SELENIVO Baggy Jeans** — $74.900 (NUEVO)
7. **SELENIVO Street Jacket** — $89.900 (Antes: $119.900 | SALE -25%)
8. **SELENIVO Essential Shorts** — $39.900 (NUEVO)
9. *SELENIVO Cropped Boxy Hoodie* — $62.900
10. *SELENIVO Technical Vest* — $72.900
11. *SELENIVO Minimalist Longsleeve* — $37.900
12. *SELENIVO Parachute Pants* — $68.900
