import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { useOrder } from '../context/OrderContext.jsx'
import {
  ORDER_NUMBER,
  customerDefaults,
  formatMoney,
  paymentMethods,
  tipOptions,
} from '../data/order.js'

export default function CheckoutPage() {
  const {
    cart,
    subtotal,
    tax,
    deliveryFee,
    fulfillment,
    setFulfillment,
  } = useOrder()

  const [tip, setTip] = useState(5)
  const [payment, setPayment] = useState('card')
  const [customer, setCustomer] = useState(customerDefaults)
  const [promo, setPromo] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [submitState, setSubmitState] = useState('idle')
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const total = subtotal + tax + deliveryFee + tip
  const itemCount = cart.reduce((sum, line) => sum + line.qty, 0)

  const updateCustomer = (field) => (event) =>
    setCustomer((current) => ({ ...current, [field]: event.target.value }))

  const handleCustomTip = () => {
    const answer = window.prompt('Enter custom tip amount ($):', '6.00')
    if (answer !== null && !Number.isNaN(parseFloat(answer))) {
      setTip(Math.max(0, parseFloat(answer)))
    }
  }

  const handleSubmit = () => {
    setSubmitState('sending')
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setSubmitState('done'), 1200)
  }

  const modeClass = (mode) =>
    `flex items-center justify-center gap-space-sm py-space-md px-space-md rounded-full font-headline-sm text-headline-sm tracking-tight transition-transform ${
      fulfillment === mode
        ? 'bg-primary text-on-primary hard-shadow-md active:translate-x-0.5 active:translate-y-0.5'
        : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-high'
    }`

  return (
    <>
      <div className="w-full bg-primary text-on-primary py-space-xs px-margin overflow-hidden hard-shadow-sm">
        <div className="flex items-center justify-between font-label-sm text-label-sm uppercase tracking-wider">
          <span className="flex items-center gap-space-xs font-bold">
            <Icon name="local_fire_department" className="text-base animate-pulse" />
            Fresh Out of the Wood Oven • Sourdough Batch No. 97 • Estimated Delivery: 25-35 Mins
          </span>
          <div className="hidden sm:flex items-center gap-space-md">
            <span className="bg-primary-container text-on-primary-container px-space-sm py-0.5 rounded-full text-label-sm font-bold">
              Neo-Diner NYC
            </span>
            <span className="font-bold">Table/Order Desk: Little Italy</span>
          </div>
        </div>
      </div>

      <div className="w-full bg-surface-container-low px-margin py-space-md hard-shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md">
            <div className="w-14 h-14 rounded-full bg-primary-container text-on-primary flex items-center justify-center hard-shadow-md">
              <Icon name="restaurant_menu" className="text-3xl" />
            </div>
            <div>
              <div className="flex items-center gap-space-sm">
                <span className="font-headline-md text-headline-md text-on-surface uppercase tracking-tight">
                  Checkout Counter
                </span>
                <span className="bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm px-space-sm py-0.5 rounded-full uppercase tracking-wider font-bold hard-shadow-sm">
                  Priority Prep
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Check your warm pies, pick diner drops, and lock in your order.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-space-xs bg-surface-container-lowest p-space-xs rounded-full hard-shadow-sm">
            <span className="px-space-md py-space-xs rounded-full font-label-md text-label-md bg-secondary-container text-on-secondary-container">
              1. Slice Basket
            </span>
            <Icon name="chevron_right" className="text-on-surface-variant text-sm" />
            <span className="px-space-md py-space-xs rounded-full font-label-md text-label-md bg-primary text-on-primary hard-shadow">
              2. Review &amp; Pay
            </span>
            <Icon name="chevron_right" className="text-on-surface-variant text-sm" />
            <span className="px-space-md py-space-xs rounded-full font-label-md text-label-md text-on-surface-variant opacity-60">
              3. Doorstep Crunch
            </span>
          </div>
        </div>
      </div>

      <div className="w-full px-margin py-space-xl">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          <div className="lg:col-span-7 flex flex-col gap-space-lg">
            <div className="bg-surface-container rounded-lg p-space-md hard-shadow-sm">
              <div className="flex items-center justify-between mb-space-sm">
                <span className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface">
                  Fulfillment Method
                </span>
                <span className="font-body-sm text-body-sm text-primary font-bold flex items-center gap-space-xs">
                  <Icon name="moped" className="text-sm" />
                  {fulfillment === 'delivery' ? 'Express Courier ($2.99)' : 'Counter Pickup (Free)'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-space-sm">
                <button type="button" onClick={() => setFulfillment('delivery')} className={modeClass('delivery')}>
                  <Icon name="two_wheeler" /> Hot Delivery
                </button>
                <button type="button" onClick={() => setFulfillment('pickup')} className={modeClass('pickup')}>
                  <Icon name="storefront" /> Diner Counter Pickup
                </button>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-space-lg hard-shadow-sm">
              <div className="flex items-center justify-between mb-space-md pb-space-sm">
                <div className="flex items-center gap-space-sm">
                  <span className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-label-md text-label-md hard-shadow-sm">
                    1
                  </span>
                  <h2 className="font-headline-md text-headline-md text-on-surface uppercase tracking-tight">
                    {fulfillment === 'delivery' ? 'Delivery Coordinates' : 'Pickup Details'}
                  </h2>
                </div>
                <span className="font-label-sm text-label-sm text-tertiary font-bold bg-tertiary-fixed px-space-sm py-0.5 rounded-full">
                  Saved Profile
                </span>
              </div>
              <div className="space-y-space-md">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  <label className="block space-y-space-xs">
                    <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider block">
                      Full Name
                    </span>
                    <input
                      type="text"
                      value={customer.name}
                      onChange={updateCustomer('name')}
                      placeholder="Patron name"
                      className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md px-space-md py-space-md rounded-full focus:outline-none focus:bg-surface-container font-semibold"
                    />
                  </label>
                  <label className="block space-y-space-xs">
                    <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider block">
                      Phone (For Buzzer / Dispatch)
                    </span>
                    <input
                      type="tel"
                      value={customer.phone}
                      onChange={updateCustomer('phone')}
                      placeholder="Your mobile phone"
                      className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md px-space-md py-space-md rounded-full focus:outline-none focus:bg-surface-container font-semibold"
                    />
                  </label>
                </div>
                <label className="block space-y-space-xs">
                  <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider block">
                    Street Address &amp; Apartment
                  </span>
                  <input
                    type="text"
                    value={customer.address}
                    onChange={updateCustomer('address')}
                    placeholder="Full delivery address"
                    disabled={fulfillment === 'pickup'}
                    className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md px-space-md py-space-md rounded-full focus:outline-none focus:bg-surface-container font-semibold disabled:opacity-50"
                  />
                </label>
                <label className="block space-y-space-xs">
                  <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider block">
                    Diner Driver Instructions
                  </span>
                  <input
                    type="text"
                    value={customer.instructions}
                    onChange={updateCustomer('instructions')}
                    placeholder="Gate code, door notes..."
                    className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md px-space-md py-space-md rounded-full focus:outline-none focus:bg-surface-container"
                  />
                </label>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-space-lg hard-shadow-sm">
              <div className="flex items-center justify-between mb-space-sm">
                <div className="flex items-center gap-space-sm">
                  <span className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-label-md text-label-md hard-shadow-sm">
                    2
                  </span>
                  <h2 className="font-headline-md text-headline-md text-on-surface uppercase tracking-tight">
                    Driver Love &amp; Tip
                  </h2>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  100% goes to your pizza courier
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                NYC winter roads are slick! Fuel our sourdough delivery crew with some high-octane diner appreciation.
              </p>
              <div className="grid grid-cols-4 gap-space-sm">
                {tipOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setTip(option.value)}
                    className={`py-space-md px-space-sm rounded-lg font-headline-sm text-headline-sm text-center transition-all ${
                      tip === option.value
                        ? 'bg-primary text-on-primary hard-shadow-md'
                        : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    <span className={`block ${tip === option.value ? 'text-on-primary' : 'text-primary'}`}>
                      {formatMoney(option.value)}
                    </span>
                    <span
                      className={`font-label-sm text-label-sm uppercase tracking-wide font-bold ${
                        tip === option.value ? 'text-primary-fixed' : 'text-on-surface-variant'
                      }`}
                    >
                      {option.label}
                    </span>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={handleCustomTip}
                  className={`py-space-md px-space-sm rounded-lg font-headline-sm text-headline-sm text-center transition-all ${
                    !tipOptions.some((option) => option.value === tip)
                      ? 'bg-primary text-on-primary hard-shadow-md'
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <span className="block text-lg font-bold">Custom</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Amount</span>
                </button>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-space-lg hard-shadow-sm">
              <div className="flex items-center justify-between mb-space-md">
                <div className="flex items-center gap-space-sm">
                  <span className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-label-md text-label-md hard-shadow-sm">
                    3
                  </span>
                  <h2 className="font-headline-md text-headline-md text-on-surface uppercase tracking-tight">
                    Payment Method
                  </h2>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-space-xs">
                  <Icon name="lock" className="text-sm text-primary" /> 256-Bit Encrypted
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm mb-space-md">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`cursor-pointer rounded-lg p-space-md flex flex-col justify-between transition-all ${
                      payment === method.id
                        ? 'bg-surface-container hard-shadow'
                        : 'bg-surface-container-low hover:bg-surface-container'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-space-sm">
                      <Icon
                        name={method.icon}
                        className={`text-2xl ${payment === method.id ? 'text-primary' : 'text-on-surface'}`}
                      />
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={payment === method.id}
                        onChange={() => setPayment(method.id)}
                        className="accent-primary w-4 h-4"
                      />
                    </div>
                    <div>
                      <span className="font-headline-sm text-headline-sm text-on-surface block">
                        {method.title}
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        {method.subtitle}
                      </span>
                    </div>
                  </label>
                ))}
              </div>

              {payment === 'card' ? (
                <div className="bg-surface-container-low p-space-md rounded-lg space-y-space-sm">
                  <label className="block space-y-space-xs">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      Card Number
                    </span>
                    <div className="relative">
                      <input
                        type="text"
                        defaultValue="•••• •••• •••• 4242"
                        placeholder="4532 0000 0000 0000"
                        className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md px-space-md py-space-sm rounded-full focus:outline-none font-mono"
                      />
                      <div className="absolute right-3 top-2 flex items-center gap-1">
                        <span className="bg-primary text-on-primary px-1.5 py-0.5 rounded font-label-sm text-[10px] font-bold">VISA</span>
                        <span className="bg-tertiary text-on-tertiary px-1.5 py-0.5 rounded font-label-sm text-[10px] font-bold">MC</span>
                      </div>
                    </div>
                  </label>
                  <div className="grid grid-cols-2 gap-space-sm">
                    <label className="block space-y-space-xs">
                      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                        Expiration
                      </span>
                      <input
                        type="text"
                        defaultValue="08/28"
                        className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md px-space-md py-space-sm rounded-full focus:outline-none font-mono text-center"
                      />
                    </label>
                    <label className="block space-y-space-xs">
                      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                        CVC / CVV
                      </span>
                      <input
                        type="password"
                        defaultValue="884"
                        className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md px-space-md py-space-sm rounded-full focus:outline-none font-mono text-center"
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <div className="bg-surface-container p-space-md rounded-lg font-body-sm text-body-sm text-on-surface-variant">
                  {payment === 'apple'
                    ? 'Apple Pay is ready — confirm with a tap when your pie arrives.'
                    : 'Please have exact bills ready for your courier.'}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-space-lg lg:sticky lg:top-[7rem]">
            <div className="bg-surface-container-lowest rounded-xl hard-shadow-md overflow-hidden relative">
              <div className="bg-primary-container text-on-primary-container p-space-md flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <Icon name="receipt_long" className="text-2xl" />
                  <div>
                    <h3 className="font-headline-sm text-headline-sm uppercase tracking-tight text-on-primary leading-none">
                      Review Your Order
                    </h3>
                    <span className="font-label-sm text-label-sm text-primary-fixed opacity-90 uppercase">
                      Sourdough Parlor Slip
                    </span>
                  </div>
                </div>
                <div className="bg-surface-container-lowest text-primary px-space-md py-1 rounded-full font-headline-sm text-headline-sm tracking-tight hard-shadow">
                  Order #{ORDER_NUMBER}
                </div>
              </div>

              <div className="bg-surface-container-high px-space-md py-space-xs flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                <span>Ticket: Table 4 / Delivery Hub</span>
                <span className="text-primary font-bold">
                  {itemCount} Items • 2 Guests
                </span>
              </div>

              <div className="p-space-md space-y-space-md">
                {cart.map((line, index) => (
                  <div key={line.key}>
                    <div className="flex items-start justify-between gap-space-sm group">
                      <div className="flex items-start gap-space-sm">
                        <div className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-md text-label-md font-bold flex-shrink-0 hard-shadow-sm">
                          {line.qty}x
                        </div>
                        <div>
                          <h4 className="font-headline-sm text-headline-sm text-on-surface leading-snug group-hover:text-primary transition-colors">
                            {line.name}
                          </h4>
                          <div className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
                            <span className="bg-surface-container px-space-xs py-0.5 rounded text-xs font-semibold">
                              {line.size}
                            </span>
                            <span>•</span>
                            <span>{formatMoney(line.unitPrice)} unit</span>
                          </div>
                          {line.note && (
                            <p className="font-label-sm text-label-sm text-tertiary mt-0.5">{line.note}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="font-headline-sm text-headline-sm text-on-surface block font-bold">
                          {formatMoney(line.unitPrice * line.qty)}
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          {line.qty} × {formatMoney(line.unitPrice)}
                        </span>
                      </div>
                    </div>
                    {index < cart.length - 1 && (
                      <div className="w-full pt-space-sm text-outline-variant opacity-40 text-xs">
                        ••••••••••••••••••••••••••••••••••••••••••••••••••
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="px-space-md py-space-sm bg-surface-container-low flex items-center gap-space-sm">
                <Icon name="local_offer" className="text-primary text-lg" />
                <input
                  type="text"
                  value={promo}
                  onChange={(event) => setPromo(event.target.value)}
                  placeholder="Promo code (e.g. SOURDOUGH76)"
                  className="w-full bg-surface-container-lowest text-on-surface px-space-md py-1.5 rounded-full font-body-sm text-body-sm focus:outline-none uppercase placeholder:normal-case"
                />
                <button
                  type="button"
                  onClick={() => promo.trim() && setPromoApplied(true)}
                  className="bg-secondary-container hover:bg-secondary text-on-secondary-container hover:text-on-secondary px-space-md py-1.5 rounded-full font-label-md text-label-md transition-colors font-bold"
                >
                  {promoApplied ? 'Applied' : 'Apply'}
                </button>
              </div>

              <div className="p-space-md bg-surface-container space-y-space-xs">
                <div className="flex items-center justify-between font-body-md text-body-md text-on-surface-variant">
                  <span>Food Subtotal</span>
                  <span className="font-bold text-on-surface">{formatMoney(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between font-body-md text-body-md text-on-surface-variant">
                  <span className="flex items-center gap-1">
                    NYC Sales Tax <span className="text-xs bg-surface-container-high px-1 rounded">(8.875%)</span>
                  </span>
                  <span className="font-bold text-on-surface">{formatMoney(tax)}</span>
                </div>
                <div className="flex items-center justify-between font-body-md text-body-md text-on-surface-variant">
                  <span>{fulfillment === 'delivery' ? 'Delivery Fee (Moto Courier)' : 'Pickup (Counter)'}</span>
                  <span className="font-bold text-on-surface">{formatMoney(deliveryFee)}</span>
                </div>
                <div className="flex items-center justify-between font-body-md text-body-md text-on-surface-variant">
                  <span className="flex items-center gap-1 text-primary font-semibold">
                    <Icon name="favorite" className="text-sm" filled /> Driver Tip
                  </span>
                  <span className="font-bold text-primary">{formatMoney(tip)}</span>
                </div>

                <div className="pt-space-sm mt-space-sm bg-surface-container-highest p-space-md rounded-lg hard-shadow-sm flex items-center justify-between">
                  <div>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold block">
                      Final Order Total
                    </span>
                    <span className="font-headline-md text-headline-md text-primary font-extrabold">
                      {formatMoney(total)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="bg-primary text-on-primary font-label-sm text-label-sm px-space-sm py-1 rounded-full uppercase tracking-wider hard-shadow-sm font-bold">
                      All Fees Included
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-space-md space-y-space-sm bg-surface-container-lowest">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitState !== 'idle'}
                  className={`w-full font-headline-md text-headline-md uppercase tracking-tight py-space-md px-space-lg rounded-full hard-shadow-lg hover:shadow-[2px_2px_0px_#261815] transition-all flex items-center justify-center gap-space-sm active:translate-x-0.5 active:translate-y-0.5 disabled:cursor-default ${
                    submitState === 'done'
                      ? 'bg-tertiary-container text-on-tertiary-container'
                      : 'bg-primary-container hover:bg-primary text-on-primary-container'
                  }`}
                >
                  {submitState === 'idle' && (
                    <>
                      <span>Submit Order</span>
                      <span>•</span>
                      <span>{formatMoney(total)}</span>
                      <Icon name="arrow_forward" className="text-2xl" />
                    </>
                  )}
                  {submitState === 'sending' && (
                    <>
                      <Icon name="rotate_right" className="animate-spin" />
                      Sending to Pizza Oven...
                    </>
                  )}
                  {submitState === 'done' && (
                    <>
                      <Icon name="check_circle" />
                      Order #{ORDER_NUMBER} Confirmed!
                    </>
                  )}
                </button>
                <Link
                  to="/"
                  className="w-full bg-secondary-container hover:bg-surface-container-high text-on-secondary-container font-headline-sm text-headline-sm py-space-sm px-space-md rounded-full text-center block transition-colors hard-shadow-sm"
                >
                  ← Back to Menu &amp; Edit Items
                </Link>

                <div className="pt-space-sm grid grid-cols-2 gap-space-xs text-center">
                  <div className="bg-surface-container-low p-space-xs rounded-lg flex items-center justify-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
                    <Icon name="verified" className="text-primary text-sm" />
                    100% Satisfaction
                  </div>
                  <div className="bg-surface-container-low p-space-xs rounded-lg flex items-center justify-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
                    <Icon name="whatshot" className="text-primary text-sm" />
                    Hot &amp; Fresh Guarantee
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-xl p-space-md text-center hard-shadow-sm">
              <div className="inline-block px-space-md py-1 bg-surface-container rounded-full mb-space-xs">
                <span className="font-headline-sm text-headline-sm text-primary uppercase">
                  love, Lizzie
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant italic">
                &quot;Every sourdough pie is hand-stretched when the ticket rings in. Thanks for keeping our Little Italy oven roaring since 1976.&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
