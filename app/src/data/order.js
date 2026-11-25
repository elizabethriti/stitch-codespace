// Starting ticket and checkout details from the Stitch screens.

export const TAX_RATE = 0.08875
export const EXPRESS_DELIVERY_FEE = 2.99
export const ORDER_NUMBER = 'LP-8429'

// The tray that is already filled in on the design. Students can edit these.
export const initialCart = [
  {
    key: 'pepperoni-large-16',
    id: 'pepperoni',
    name: 'Pepperoni Pizza',
    size: 'Large 16"',
    unitPrice: 22,
    qty: 1,
    note: 'Cupping pepperoni, fresh basil, garlic oil drizzle',
  },
  {
    key: 'fries-large',
    id: 'fries',
    name: 'Seasoned Crispy Fries',
    size: 'Large',
    unitPrice: 6.5,
    qty: 1,
    note: 'Oregano sea salt, hot honey garlic dip',
  },
  {
    key: 'coke-can-12oz',
    id: 'coke',
    name: 'Coca-Cola Classic',
    size: 'Can (12oz)',
    unitPrice: 2,
    qty: 2,
    note: 'Ice cold retro fountain cans',
  },
  {
    key: 'garlic-knots-6-pcs-standard',
    id: 'garlic-knots',
    name: 'Garlic Knots',
    size: '6 pcs (Standard)',
    unitPrice: 6,
    qty: 1,
    note: 'Parmesan snow, warm marinara cup',
  },
]

export const tipOptions = [
  { value: 3, label: 'Warm' },
  { value: 5, label: 'Standard' },
  { value: 7, label: 'Hero' },
]

export const customerDefaults = {
  name: 'Alex Morgan',
  phone: '(555) 234-8901',
  address: '428 Elmwood Ave, Apt 3B, Brooklyn, NY 11222',
  instructions: 'Buzz 3B or leave with doorman',
}

export const paymentMethods = [
  { id: 'card', icon: 'credit_card', title: 'Credit Card', subtitle: 'Visa / Master / Amex' },
  { id: 'apple', icon: 'phone_iphone', title: 'Apple Pay', subtitle: 'Instant 1-Tap Pay' },
  { id: 'cash', icon: 'payments', title: 'Cash on Door', subtitle: 'Pay driver exact bills' },
]

export const formatMoney = (value) => `$${Number(value).toFixed(2)}`
