import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useOrder } from '../context/OrderContext.jsx'
import { formatMoney } from '../data/order.js'
import Icon from './Icon.jsx'

export default function OrderSummary() {
  const { cart, removeItem, subtotal, tax, itemCount, fulfillment, setFulfillment } = useOrder()
  const [notes, setNotes] = useState('')
  const total = subtotal + tax // standard delivery is free on the menu screen

  return (
    <aside className="bg-surface-container-low rounded-lg p-space-md md:p-space-lg hard-shadow-md flex flex-col">
      <div className="flex items-center justify-between pb-space-sm">
        <div>
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
            Your Tray
          </span>
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-extrabold flex items-center gap-space-xs">
            Your Order <span className="text-primary text-body-sm font-bold">({itemCount} Items)</span>
          </h2>
        </div>
        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary hard-shadow-sm">
          <Icon name="restaurant_menu" filled />
        </div>
      </div>

      <div className="my-space-md bg-surface-container-highest p-1 rounded-full flex items-center hard-shadow-sm">
        <button
          type="button"
          onClick={() => setFulfillment('delivery')}
          className={`flex-1 py-space-xs rounded-full font-label-md text-label-md uppercase font-bold text-center transition-all ${
            fulfillment === 'delivery'
              ? 'bg-primary text-on-primary hard-shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Delivery
        </button>
        <button
          type="button"
          onClick={() => setFulfillment('pickup')}
          className={`flex-1 py-space-xs rounded-full font-label-md text-label-md uppercase font-bold text-center transition-all ${
            fulfillment === 'pickup'
              ? 'bg-primary text-on-primary hard-shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Pickup (15m)
        </button>
      </div>

      <div className="bg-surface-container px-space-md py-space-xs rounded-full flex items-center justify-between font-label-sm text-label-sm text-on-surface mb-space-md">
        <span className="flex items-center gap-1 font-bold">
          <Icon name="moped" className="text-primary text-body-md" />
          {fulfillment === 'delivery' ? 'Est. Delivery:' : 'Ready For Pickup:'}
        </span>
        <span className="font-bold text-primary">
          {fulfillment === 'delivery' ? '25 – 35 min' : '15 – 20 min'}
        </span>
      </div>

      <div className="flex flex-col gap-space-sm max-h-[380px] overflow-y-auto pr-1">
        {cart.length === 0 && (
          <p className="font-body-sm text-body-sm text-on-surface-variant text-center py-space-lg">
            Your tray is empty. Add a pie from the menu!
          </p>
        )}
        {cart.map((line) => (
          <div
            key={line.key}
            className="bg-surface p-space-sm rounded hard-shadow-sm flex items-start justify-between gap-space-xs"
          >
            <div className="flex items-start gap-space-xs">
              <span className="font-label-md text-label-md bg-primary-fixed text-on-primary-fixed-variant px-1.5 py-0.5 rounded font-bold">
                {line.qty}×
              </span>
              <div>
                <h4 className="font-label-lg text-label-lg font-bold text-on-surface leading-tight">
                  {line.name}
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{line.size}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="font-label-lg text-label-lg font-bold text-on-surface">
                {formatMoney(line.unitPrice * line.qty)}
              </span>
              <button
                type="button"
                onClick={() => removeItem(line.key)}
                className="block text-primary hover:underline font-label-sm text-label-sm"
              >
                remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="my-space-md">
        <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm uppercase mb-1">
          <Icon name="edit_note" className="text-label-md" />
          <span>Kitchen / Delivery Notes</span>
        </div>
        <input
          type="text"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="e.g. Extra crisp crust, leave at door..."
          className="w-full bg-surface-container-lowest text-on-surface text-body-sm font-body-sm px-space-md py-space-xs rounded-full hard-shadow-sm focus:outline-none"
        />
      </div>

      <div className="space-y-1 pt-space-sm bg-surface p-space-md rounded hard-shadow mb-space-md">
        <div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
          <span>Subtotal ({itemCount} items):</span>
          <span className="font-bold text-on-surface">{formatMoney(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
          <span>Tax (8.875% NYC):</span>
          <span className="font-bold text-on-surface">{formatMoney(tax)}</span>
        </div>
        <div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
          <span>Delivery Fee:</span>
          <span className="text-emerald-700 font-bold uppercase text-label-sm">FREE</span>
        </div>
        <div className="pt-space-xs flex items-center justify-between font-headline-sm text-headline-sm text-on-surface">
          <span className="font-extrabold">Estimated Total:</span>
          <span className="text-primary font-black">{formatMoney(total)}</span>
        </div>
      </div>

      <Link
        to="/checkout"
        className="w-full py-space-md px-space-md bg-primary hover:bg-primary-container text-on-primary rounded-full font-headline-sm text-headline-sm uppercase tracking-wider text-center hard-shadow-md hover:scale-[1.02] active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-between group"
      >
        <span className="font-extrabold">Ready to Pay →</span>
        <span className="bg-surface text-primary px-space-md py-1 rounded-full font-label-lg text-label-lg font-extrabold hard-shadow-sm group-hover:scale-105 transition-transform">
          {formatMoney(total)}
        </span>
      </Link>

      <div className="mt-space-md text-center flex items-center justify-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
        <Icon name="verified" className="text-primary text-body-md" />
        <span>Hot &amp; Fresh Guarantee • Lizzie&apos;s Since 1976</span>
      </div>
    </aside>
  )
}
