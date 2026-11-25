import { Link, useLocation } from 'react-router-dom'
import { useOrder } from '../context/OrderContext.jsx'
import Icon from './Icon.jsx'

const linkBase =
  'font-label-lg text-label-lg px-space-md py-space-sm rounded-full transition-all'

export default function Header() {
  const { pathname } = useLocation()
  const { itemCount } = useOrder()

  const navClass = (path) =>
    `${linkBase} ${
      pathname === path
        ? 'bg-surface-container text-primary font-bold'
        : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
    }`

  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="bg-primary text-on-primary py-space-xs px-margin">
        <div className="w-full flex items-center justify-between font-label-sm text-label-sm uppercase tracking-wider">
          <span>Wood-Fired • Sourdough Crust • NYC-Style Neo Diner</span>
          <div className="flex items-center gap-space-md">
            <span className="flex items-center gap-space-xs">
              <Icon name="call" className="text-label-sm" />
              (212) 555-PIZZA
            </span>
            <span className="hidden md:inline-block bg-tertiary-container text-on-tertiary-container px-space-sm py-0.5 rounded-full font-label-sm text-label-sm font-bold">
              Open for Delivery &amp; Pickup
            </span>
          </div>
        </div>
      </div>

      <div className="h-20 w-full px-margin flex items-center justify-between gap-gutter">
        <div className="flex items-center gap-gutter">
          <Link to="/" className="flex items-center gap-space-sm group" aria-label="Lizzie's Pizza home">
            <div className="bg-primary px-space-md py-space-xs rounded-full shadow-[2px_2px_0px_#261815] transition-transform group-hover:scale-105 flex items-center gap-space-xs">
              <Icon name="local_pizza" className="text-on-primary" />
              <span className="font-headline-sm text-headline-sm text-on-primary tracking-tight font-extrabold">
                Lizzie&apos;s
              </span>
            </div>
            <span className="font-headline-sm text-headline-sm text-primary tracking-tight uppercase font-bold hidden sm:inline-block">
              Pizza
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-space-xs" aria-label="Main navigation">
            <Link to="/" className={navClass('/')}>
              Menu &amp; Order
            </Link>
            <Link to="/checkout" className={navClass('/checkout')}>
              Checkout / Review Order
            </Link>
            <Link to="/#about" className={linkBase + ' text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}>
              About
            </Link>
            <Link to="/#contact" className={linkBase + ' text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}>
              Contact
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-space-md">
          <Link
            to="/checkout"
            className="relative flex items-center justify-center w-11 h-11 rounded-full bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors"
            aria-label={`View order, ${itemCount} items`}
          >
            <Icon name="shopping_bag" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-on-primary rounded-full font-label-sm text-label-sm flex items-center justify-center hard-shadow-sm">
              {itemCount}
            </span>
          </Link>
          <img
            src="/images/profile.svg"
            alt="Your profile"
            className="w-8 h-8 rounded-full object-cover hard-shadow-sm"
          />
        </div>
      </div>
    </header>
  )
}
