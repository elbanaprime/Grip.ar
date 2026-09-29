// Base de datos de productos de SELENIVO
// Fotografías de moda urbana / streetwear editorial en alta definición

const PRODUCTS = [
    {
        id: "sel-001",
        name: "COLAPINTO ALPINE",
        category: "remeras",
        gender: "unisex",
        price: 20000,
        originalPrice: 38900,
        badge: "SALE -25%",
        isSale: true,
        isNew: false,
        featured: true,
        bestSeller: true,
        rating: 4.9,
        reviewsCount: 142,
        images: [
            "https://lh3.googleusercontent.com/d/1FPaHCCH_P0dsGSjBd6tuwgYei_Yihd5P",
            
        ],
        colors: [
            { name: "BLACK", hex: "#111111" },
            
        ],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        description: "Remera boxy fit confeccionada en jersey pesado de 280 GSM. Caída estructurada, hombros caídos y cuello cerrado de 3 cm en ribb al tono. Lavado siliconado para suavidad superior y acabado mate.",
        details: [
            "100% Algodón Peinado Heavyweight 280 GSM",
            "Corte Boxy Fit con hombros caídos",
            "Cuello cerrado de 3 cm en ribb reforzado",
            "Tratamiento anti-pilling y teñido reactivo",
            "Diseñado y confeccionado en Argentina"
        ]
    },
    {
        id: "sel-002",
        name: "CORVETTE",
        category: "remeras",
        gender: "unisex",
        price: 59900,
        originalPrice: 74900,
        badge: "NUEVO",
        isSale: false,
        isNew: true,
        featured: true,
        bestSeller: true,
        rating: 5.0,
        reviewsCount: 98,
        images: [
            "https://lh3.googleusercontent.com/d/1C5GDI0AVEKbli4yzjD7ha7GThu6BVB1M",
            
        ],
        colors: [
            { name: "WHITE", hex: "#ffffff" },
           
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
        description: "Remera boxy fit confeccionada en jersey pesado de 280 GSM. Caída estructurada, hombros caídos y cuello cerrado de 3 cm en ribb al tono. Lavado siliconado para suavidad superior y acabado mate.",
        details: [
            "100% Algodón Peinado Heavyweight 280 GSM",
            "Corte Boxy Fit con hombros caídos",
            "Cuello cerrado de 3 cm en ribb reforzado",
            "Tratamiento anti-pilling y teñido reactivo",
            "Diseñado y confeccionado en Argentina"
        ]
    },
    {
     id: "sel-003",
        name: "SENNA",
        category: "remeras",
        gender: "unisex",
        price: 64900,
        originalPrice: 79900,
        badge: "SALE -20%",
        isSale: true,
        isNew: false,
        featured: true,
        bestSeller: true,
        rating: 4.8,
        reviewsCount: 76,
        images: [
            "https://lh3.googleusercontent.com/d/1aPnMEVy4yVMabVqGot4PWwBbaEPioUJd",
            
        ],
        colors: [
            { name: "BLACK", hex: "#141414" },
            
        ],
        sizes: ["XS", "S", "M", "L", "XL"],
        description: "Remera boxy fit confeccionada en jersey pesado de 280 GSM. Caída estructurada, hombros caídos y cuello cerrado de 3 cm en ribb al tono. Lavado siliconado para suavidad superior y acabado mate.",
        details: [
            "100% Algodón Peinado Heavyweight 280 GSM",
            "Corte Boxy Fit con hombros caídos",
            "Cuello cerrado de 3 cm en ribb reforzado",
            "Tratamiento anti-pilling y teñido reactivo",
            "Diseñado y confeccionado en Argentina"
        ]
    },
    {
        id: "sel-004",
        name: "FORD FALCON",
        category: "remeras",
        gender: "unisex",
        price: 34900,
        originalPrice: 34900,
        badge: "NUEVO",
        isSale: false,
        isNew: true,
        featured: true,
        bestSeller: false,
        rating: 4.9,
        reviewsCount: 52,
        images: [
            "https://lh3.googleusercontent.com/d/14wQVc5PwO2KDKQQxfwwR_JFexsAAsRsG",
            
        ],
        colors: [
            { name: "Vintage Black", hex: "#1a1a1a" },
            { name: "Optical White", hex: "#ffffff" }
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
        description: "Remera con serigrafía táctil de alta densidad inspirada en la arquitectura brutalista y el futurismo urbano. Confección en jersey 300 GSM con proceso de lavado ácido exclusivo.",
        details: [
            "100% Algodón Premium 300 GSM",
            "Gráfica serigráfica 'WEAR YOUR OWN WAY' con relieve táctil",
            "Lavado mineral que aporta tonalidades únicas a cada prenda",
            "Etiqueta tejida en el lateral inferior"
        ]
    },
    {
        id: "sel-005",
        name: "PORSCHE GT3 RS",
        category: "remeras",
        gender: "unisex",
        price: 69900,
        originalPrice: 85900,
        badge: "Pocas Unidades",
        isSale: true,
        isNew: false,
        featured: true,
        bestSeller: true,
        rating: 5.0,
        reviewsCount: 64,
        images: [
            "https://lh3.googleusercontent.com/d/13i72OzN6t1WQ6v4mzWOfVTG0DBv0P-w5",
            
        ],
        colors: [
            { name: "BLACK", hex: "#222222" },
       ],
        sizes: ["XS", "S", "M", "L", "XL"],
        description: "Remera con serigrafía táctil de alta densidad inspirada en la arquitectura brutalista y el futurismo urbano. Confección en jersey 300 GSM con proceso de lavado ácido exclusivo.",
        details: [
            "100% Algodón Premium 300 GSM",
            "Gráfica serigráfica 'WEAR YOUR OWN WAY' con relieve táctil",
            "Lavado mineral que aporta tonalidades únicas a cada prenda",
            "Etiqueta tejida en el lateral inferior"
        ]
    },
    
    
    /*
    
    { 
        id: "sel-006",
        name: "SELENIVO Baggy Jeans",
        category: "pantalones",
        gender: "unisex",
        price: 74900,
        originalPrice: 74900,
        badge: "NUEVO",
        isSale: false,
        isNew: true,
        featured: true,
        bestSeller: true,
        rating: 4.8,
        reviewsCount: 89,
        images: [
            "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1475178626620-a4d074967452?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1000&q=80"
        ],
        colors: [
            { name: "Acid Wash Denim", hex: "#6f7d8c" },
            { name: "Deep Ink Blue", hex: "#1f2937" },
            { name: "Faded Black", hex: "#2b2b2b" }
        ],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        description: "Denim rígido 100% algodón de 14.5 oz con corte skater baggy de los 90. Caída amplia desde la cadera hasta la botamanga. Lavado a la piedra con desgaste natural localizado.",
        details: [
            "100% Algodón Denim Rígido 14.5 oz",
            "Corte super baggy con tiro medio-bajo",
            "Botón metálico con relieve y cierre YKK reforzado",
            "Remaches en puntos de tensión",
            "Parche de cuero grabado SELENIVO en cintura trasera"
        ]
    },
    {
        id: "sel-007",
        name: "SELENIVO Street Jacket",
        category: "camperas",
        gender: "hombre",
        price: 89900,
        originalPrice: 119900,
        badge: "SALE -25%",
        isSale: true,
        isNew: false,
        featured: true,
        bestSeller: true,
        rating: 5.0,
        reviewsCount: 110,
        images: [
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1000&q=80"
        ],
        colors: [
            { name: "Matte Black", hex: "#0e0e0e" },
            { name: "Silver Gray", hex: "#9a9a9c" }
        ],
        sizes: ["S", "M", "L", "XL"],
        description: "Campera bomber impermeable con aislamiento térmico ligero y forrería interior de satén plateado. Cuello deportivo, bolsillos frontales con broches snap ocultos y bolsillo en manga izquierda.",
        details: [
            "Tejido técnico nylon hidrófugo con acabado mate",
            "Acolchado térmico ligero apto para media estación e invierno",
            "Cierres bidireccionales termosellados",
            "Tiracierre con cinta logotipada SELENIVO desmontable"
        ]
    },
    {
        id: "sel-008",
        name: "SELENIVO Essential Shorts",
        category: "shorts",
        gender: "unisex",
        price: 39900,
        originalPrice: 39900,
        badge: "NUEVO",
        isSale: false,
        isNew: true,
        featured: true,
        bestSeller: false,
        rating: 4.7,
        reviewsCount: 38,
        images: [
            "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80"
        ],
        colors: [
            { name: "True Black", hex: "#111111" },
            { name: "Ash Gray", hex: "#7d7e80" },
            { name: "Sandstone", hex: "#d8cebe" }
        ],
        sizes: ["XS", "S", "M", "L", "XL"],
        description: "Short relajado por encima de la rodilla en rústico de algodón pesado 320 GSM. Pretina elástica con cordón largo estilo streetwear de puntas metálicas y bolsillos laterales profundos.",
        details: [
            "Algodón Rústico Premium 320 GSM",
            "Largo 5.5 pulgadas por encima de la rodilla",
            "Bolsillo trasero ojal con botón oculto",
            "Cordón de ajuste extralargo con punteras de acero cromado"
        ]
    },
    {
        id: "sel-009",
        name: "SELENIVO Cropped Boxy Hoodie",
        category: "hoodies",
        gender: "mujer",
        price: 62900,
        originalPrice: 78900,
        badge: "SALE -20%",
        isSale: true,
        isNew: true,
        featured: false,
        bestSeller: true,
        rating: 4.9,
        reviewsCount: 45,
        images: [
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"
        ],
        colors: [
            { name: "Bone White", hex: "#f2efe9" },
            { name: "Obsidian Black", hex: "#111111" }
        ],
        sizes: ["XS", "S", "M", "L"],
        description: "Buzo cropped con hombros caídos y dobladillo al corte deshilachado con pespunte de seguridad. Diseño contemporáneo y estilizado que combina perfectamente con pantalones tiro alto.",
        details: [
            "Frisa invisible 340 GSM 100% algodón",
            "Corte cropped boxy a la altura de la cintura",
            "Capucha amplia estructurada"
        ]
    },
    {
        id: "sel-010",
        name: "SELENIVO Technical Vest",
        category: "camperas",
        gender: "unisex",
        price: 72900,
        originalPrice: 72900,
        badge: "NUEVO",
        isSale: false,
        isNew: true,
        featured: false,
        bestSeller: false,
        rating: 4.9,
        reviewsCount: 29,
        images: [
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80"
        ],
        colors: [
            { name: "Night Black", hex: "#0d0d0d" },
            { name: "Concrete Gray", hex: "#525252" }
        ],
        sizes: ["S", "M", "L", "XL"],
        description: "Chaleco utilitario técnico con múltiples compartimentos modulables y anclajes en cinta reflectiva. Ideal para layering vanguardista en cualquier temporada.",
        details: [
            "Cordura impermeable 500D",
            "4 bolsillos frontales con cierre y hebillas Duraflex",
            "Espalda con malla transpirable",
            "Calce regular ajustable en cintura"
        ]
    },
    {
        id: "sel-011",
        name: "SELENIVO Minimalist Longsleeve",
        category: "remeras",
        gender: "hombre",
        price: 37900,
        originalPrice: 44900,
        badge: "SALE -15%",
        isSale: true,
        isNew: false,
        featured: false,
        bestSeller: false,
        rating: 4.8,
        reviewsCount: 31,
        images: [
            "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=80"
        ],
        colors: [
            { name: "Jet Black", hex: "#121212" },
            { name: "Off White", hex: "#f0f0ee" }
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
        description: "Remera manga larga con puños ajustados en ribb fino y estampa minimalista en vertical sobre la columna vertebral. Suavidad extrema y caída relajada.",
        details: [
            "Jersey peinado 260 GSM",
            "Puños en ribb con elastano",
            "Estampa engomada al tono de alta durabilidad"
        ]
    },
    {
        id: "sel-012",
        name: "SELENIVO Parachute Pants",
        category: "pantalones",
        gender: "mujer",
        price: 68900,
        originalPrice: 68900,
        badge: "NUEVO",
        isSale: false,
        isNew: true,
        featured: false,
        bestSeller: true,
        rating: 5.0,
        reviewsCount: 67,
        images: [
            "https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"
        ],
        colors: [
            { name: "Liquid Silver", hex: "#b0b3b8" },
            { name: "Black Shadow", hex: "#151515" },
            { name: "Olive Tint", hex: "#4a4f44" }
        ],
        sizes: ["XS", "S", "M", "L"],
        description: "Pantalón paracaídas en poplín técnico ultraliviano con acabado sutilmente satinado. Tancas en cintura y botamangas para convertirlo de baggy a balloon según el calzado.",
        details: [
            "Nylon técnico ultraliviano repelente al agua",
            "Cintura con elástico y tancas ajustables a los costados",
            "Pinzas de rodilla para volumen 3D"
        ]
    }
        */
];

// Helper para dar formato a moneda en Pesos Argentinos (ARS)
function formatARS(amount) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0
    }).format(amount);
}
