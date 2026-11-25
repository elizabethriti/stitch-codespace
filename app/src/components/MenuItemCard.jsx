import { useEffect, useRef, useState } from 'react'
import { useOrder } from '../context/OrderContext.jsx'
import { formatMoney } from '../data/order.js'
import Icon from './Icon.jsx'

const badgeStyles = {
  primary: 'bg-primary text-on-primary',
  gold: 'bg-tertiary-container text-on-tertiary-container',
  neutral: 'bg-surface-container-highest text-on-surface',
  surface: 'bg-surface text-on-surface',
  tertiary: 'bg-tertiary text-on-tertiary',
}

export default function MenuItemCard({ item, imageHeight }) {
  const { addItem } = useOrder()
  const [sizeIndex, setSizeIndex] = useState(0)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const hasSizes = item.sizes.length > 1
  const price = hasSizes ? item.sizes[sizeIndex].price : item.price
  const selectedSize = hasSizes
    ? item.sizes[sizeIndex].label
    : item.subLabel || 'Standard'

  const handleAdd = () => {
    addItem({
      id: item.id,
      name: item.name,
      size: selectedSize,
      unitPrice: price,
      qty: Math.max(1, qty),
    })
    setAdded(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setAdded(false), 900)
  }

  const imageBlock = (
    <div
      className={`relative ${
        item.featured ? 'w-full md:w-64 h-44 flex-shrink-0' : `w-full ${imageHeight}`
      } rounded bg-surface-container-high overflow-hidden ${item.featured ? '' : 'mb-space-sm'}`}
    >
      <img className="w-full h-full object-cover" src={item.image} alt={item.alt} />
      {item.badge && (
        <span
          className={`absolute top-2 left-2 px-space-sm py-0.5 rounded-full font-label-sm text-label-sm font-bold uppercase hard-shadow-sm ${
            badgeStyles[item.badgeTone] || badgeStyles.surface
          }`}
        >
          {item.badge}
        </span>
      )}
    </div>
  )

  const details = (
    <>
      <div className="flex items-start justify-between gap-space-sm mb-space-xs">
        <div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface leading-tight">
            {item.name}
          </h3>
          {item.subLabel && (
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              {item.subLabel}
            </span>
          )}
        </div>
        <span className="font-headline-sm text-headline-sm text-primary font-bold whitespace-nowrap">
          {formatMoney(price)}
        </span>
      </div>
      <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
        {item.description}
      </p>

      {hasSizes ? (
        <div className="mb-space-md">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant block mb-1">
            Select Size:
          </span>
          <div className="grid grid-cols-3 gap-space-xs">
            {item.sizes.map((size, index) => (
              <button
                key={size.label}
                type="button"
                onClick={() => setSizeIndex(index)}
                aria-pressed={sizeIndex === index}
                className={`py-1.5 px-2 rounded-full font-label-sm text-label-sm text-center transition-all ${
                  sizeIndex === index
                    ? 'bg-primary text-on-primary hard-shadow-sm'
                    : 'bg-surface-container-highest text-on-surface hover:bg-surface-container'
                }`}
              >
                {size.button} {formatMoney(size.price)}
              </button>
            ))}
          </div>
        </div>
      ) : (
        item.sizeNote && (
          <div className="p-space-xs rounded-full bg-surface-container-high/60 text-center mb-space-md">
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              {item.sizeNote}
            </span>
          </div>
        )
      )}
    </>
  )

  const controls = (
    <div className="flex items-center justify-between pt-space-sm bg-surface-container rounded px-space-sm py-space-xs">
      <div className="flex items-center bg-surface rounded-full hard-shadow-sm p-0.5">
        <button
          type="button"
          onClick={() => setQty((value) => Math.max(1, value - 1))}
          className="w-8 h-8 flex items-center justify-center text-on-surface hover:bg-surface-container-high rounded-full font-bold font-headline-sm"
          aria-label={`Decrease ${item.name} quantity`}
        >
          −
        </button>
        <span className="qty-display w-7 text-center font-label-md text-label-md font-bold text-on-surface">
          {qty}
        </span>
        <button
          type="button"
          onClick={() => setQty((value) => value + 1)}
          className="w-8 h-8 flex items-center justify-center text-on-surface hover:bg-surface-container-high rounded-full font-bold font-headline-sm"
          aria-label={`Increase ${item.name} quantity`}
        >
          +
        </button>
      </div>
      <button
        type="button"
        onClick={handleAdd}
        className="bg-primary text-on-primary px-space-md py-space-xs rounded-full font-label-md text-label-md uppercase font-bold hard-shadow hover:scale-105 active:scale-95 transition-transform flex items-center gap-1"
      >
        <span>{added ? 'Added! 🍕' : 'Add to Order'}</span>
        {!added && <Icon name="add_circle" className="text-label-md" />}
      </button>
    </div>
  )

  return (
    <article
      className={`bg-surface-container-low rounded-lg p-space-md flex flex-col justify-between hard-shadow hover:shadow-[4px_4px_0px_#261815] transition-all ${
        item.featured ? 'md:col-span-2' : ''
      }`}
    >
      {item.featured ? (
        <div className="flex flex-col md:flex-row gap-space-md">
          {imageBlock}
          <div className="flex flex-col justify-between w-full">
            <div>{details}</div>
            <div className="mt-space-sm">{controls}</div>
          </div>
        </div>
      ) : (
        <>
          <div>{imageBlock}</div>
          <div>{details}</div>
          {controls}
        </>
      )}
    </article>
  )
}
