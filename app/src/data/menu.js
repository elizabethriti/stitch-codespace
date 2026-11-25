// Menu content comes from the Stitch screen "Menu & Order | Lizzie's Pizza".
// Change prices or descriptions here and every page updates.

export const menuSections = [
  {
    id: 'section-pizzas',
    category: 'Category 01',
    title: 'Whole Hand-Stretched Pies',
    count: '5 Signature Pies',
    items: [
      {
        id: 'pepperoni',
        name: 'Pepperoni Crisp',
        description:
          'Cupping spicy pepperoni, whole milk mozzarella, pecorino romano, and house Jersey crushed tomato sauce.',
        image: '/images/pepperoni-crisp.jpg',
        alt: 'Wood-fired pepperoni pizza with charred pepperoni, mozzarella and basil',
        badge: 'Most Popular',
        badgeTone: 'primary',
        sizes: [
          { label: 'Small 10"', button: '10"', price: 14 },
          { label: 'Medium 14"', button: '14"', price: 18.5 },
          { label: 'Large 16"', button: '16"', price: 22 },
        ],
      },
      {
        id: 'cheese',
        name: "Lizzie's Cheese Pie",
        description:
          'Signature 3-cheese blend: low-moisture aged mozzarella, fresh curd, and 24-month parmigiano reggiano.',
        image: '/images/cheese-pie.jpg',
        alt: 'Classic New York cheese pizza with browned mozzarella and oregano',
        badge: 'Diner Favorite',
        badgeTone: 'gold',
        sizes: [
          { label: 'Small 10"', button: '10"', price: 12 },
          { label: 'Medium 14"', button: '14"', price: 16 },
          { label: 'Large 16"', button: '16"', price: 19.5 },
        ],
      },
      {
        id: 'eggplant',
        name: 'Eggplant Parm Pie',
        description:
          'Crispy breaded Japanese eggplant, whole milk ricotta clouds, garlic oil, and torn sweet basil.',
        image: '/images/eggplant-parm.jpg',
        alt: 'Eggplant parmesan pizza with ricotta dollops and fresh basil',
        badge: 'Vegetarian',
        badgeTone: 'neutral',
        sizes: [
          { label: 'Small 10"', button: '10"', price: 15 },
          { label: 'Medium 14"', button: '14"', price: 19.5 },
          { label: 'Large 16"', button: '16"', price: 23 },
        ],
      },
      {
        id: 'margherita',
        name: 'Margherita Classica',
        description:
          'San Marzano D.O.P. tomatoes, fresh fior di latte mozzarella, Sicilian extra virgin olive oil, and fresh garden basil.',
        image: '/images/margherita.jpg',
        alt: 'Margherita pizza with buffalo mozzarella, tomato and basil',
        badge: 'Fixed Classic 14"',
        badgeTone: 'surface',
        price: 17,
        subLabel: 'Single Size: 14" Classic',
        sizeNote: 'Standard 14" Hearth Baked Single Size',
        sizes: [],
      },
      {
        id: 'sausage-honey',
        name: "Sausage & Mike's Hot Honey",
        description:
          'Sweet fennel Italian sausage crumbles, pickled red chilis, smoked scamorza cheese, and a generous post-bake drizzle of spicy habanero wildflower honey.',
        image: '/images/sausage-honey.jpg',
        alt: 'Sausage pizza with hot honey drizzle and caramelized onions',
        badge: 'House Specialty',
        badgeTone: 'primary',
        price: 20,
        subLabel: 'Single Size: 14" Classic Hearth Pie',
        sizeNote: 'Authentic 14-inch Single Hearth Format',
        sizes: [],
        featured: true,
      },
    ],
  },
  {
    id: 'section-sides',
    category: 'Category 02',
    title: 'Diner Sides & Starters',
    count: 'Golden & Crunchy',
    items: [
      {
        id: 'fries',
        name: 'Seasoned Crispy Fries',
        description:
          'Double-fried Russet potatoes tossed in oregano, garlic salt, and cracked black pepper.',
        image: '/images/fries.jpg',
        alt: 'Basket of golden crinkle-cut fries with rosemary garlic salt',
        badge: 'Crispy Goodness',
        badgeTone: 'primary',
        sizes: [
          { label: 'Regular', button: 'Regular', price: 4.5 },
          { label: 'Large', button: 'Large', price: 6.5 },
        ],
      },
      {
        id: 'garlic-knots',
        name: 'Garlic Knots',
        description:
          'Fresh baked dough tied by hand, bathed in crushed garlic, melted butter, parmesan, and fresh parsley.',
        image: '/images/garlic-knots.jpg',
        alt: 'Warm garlic knots with parsley and a cup of marinara',
        badge: 'Crowd Favorite',
        badgeTone: 'gold',
        price: 6,
        subLabel: '6 pcs with warm marinara',
        sizeNote: 'Order of 6 freshly baked knots',
        sizes: [],
      },
      {
        id: 'mozz-sticks',
        name: 'Mozzarella Sticks',
        description:
          'Hand-cut whole milk mozzarella coated in seasoned Italian breadcrumbs. Served with warm marinara.',
        image: '/images/mozz-sticks.jpg',
        alt: 'Golden fried mozzarella sticks with marinara sauce',
        price: 8,
        subLabel: '6 pcs golden crusted',
        sizeNote: 'Standard portion of 6 cheese sticks',
        sizes: [],
      },
      {
        id: 'caesar',
        name: 'Little Italy Caesar',
        description:
          'Crisp chopped romaine, house-baked garlic croutons, cracked peppercorn, and creamy pecorino dressing.',
        image: '/images/caesar.jpg',
        alt: 'Caesar salad with parmesan and sourdough croutons',
        price: 9,
        subLabel: 'House croutons & shaved parm',
        sizeNote: 'Individual entree-size diner bowl',
        sizes: [],
      },
    ],
  },
  {
    id: 'section-drinks',
    category: 'Category 03',
    title: 'Cold Beverages & Sodas',
    count: 'Ice Cold',
    items: [
      {
        id: 'coke',
        name: 'Coca-Cola Classic',
        description: 'Original formula, served frosty cold with optional ice cup.',
        image: '/images/coke.jpg',
        alt: 'Chilled Coca-Cola can beside an ice-filled diner glass',
        sizes: [
          { label: 'Can 12oz', button: 'Can', price: 2 },
          { label: 'Bottle 20oz', button: '20oz', price: 3 },
          { label: '2-Liter', button: '2-Liter', price: 4.5 },
        ],
      },
      {
        id: 'sprite',
        name: 'Crisp Sprite',
        description: 'Clean, crisp lemon-lime refreshment.',
        image: '/images/sprite.jpg',
        alt: 'Chilled Sprite can with ice and citrus wedges',
        sizes: [
          { label: 'Can 12oz', button: 'Can', price: 2 },
          { label: 'Bottle 20oz', button: '20oz', price: 3 },
          { label: '2-Liter', button: '2-Liter', price: 4.5 },
        ],
      },
      {
        id: 'mexican-coke',
        name: 'Mexican Glass Bottle Coke',
        description: 'Imported vintage bottle sweetened exclusively with 100% pure cane sugar.',
        image: '/images/mexican-coke.jpg',
        alt: 'Glass bottle of Mexican Coca-Cola with condensation',
        badge: 'Real Cane Sugar',
        badgeTone: 'tertiary',
        price: 3.5,
        subLabel: 'Single Size: 355ml Glass Bottle',
        sizeNote: 'Single 355ml Glass Bottle',
        sizes: [],
      },
      {
        id: 'san-pellegrino',
        name: 'S.Pellegrino Sparkling',
        description:
          'Imported fine Italian sparkling natural mineral water with gentle mineral effervescence.',
        image: '/images/san-pellegrino.jpg',
        alt: 'San Pellegrino sparkling water bottle and glass',
        price: 3.5,
        subLabel: 'Single Size: 500ml Glass Bottle',
        sizeNote: 'Single 500ml Bottle',
        sizes: [],
      },
    ],
  },
]

export const menuTabs = [
  { label: 'Pizzas', target: '#section-pizzas' },
  { label: 'Diner Sides', target: '#section-sides' },
  { label: 'Sodas & Drinks', target: '#section-drinks' },
]

export const promoItems = [
  '✨ Handcrafted Daily',
  '🧀 Real Wisconsin Mozzarella',
  '🍅 Slow-Simmered Family Recipe Sauce',
  '🔥 850° Woodstone Hearth Oven',
]
