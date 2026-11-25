import { useState } from 'react'
import Icon from './Icon.jsx'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  const handleJoin = (event) => {
    event.preventDefault()
    if (email.trim()) setJoined(true)
  }

  return (
    <footer className="w-full bg-surface-container-low mt-space-xl">
      <div className="w-full px-margin py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-space-xl">
          <div id="about">
            <div className="inline-block bg-primary px-space-md py-space-xs rounded-full mb-space-sm">
              <span className="font-headline-sm text-headline-sm text-on-primary font-bold tracking-tight">
                Lizzie&apos;s Pizzeria
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm">
              The eccentric 1970s neo-diner pie parlor. Naturally leavened sourdough, slow-simmered Jersey plum sauce, and hand-pulled whole milk mozzarella.
            </p>
          </div>

          <div>
            <h4 className="font-headline-sm text-headline-sm text-on-surface mb-space-sm uppercase tracking-tight">
              Diner Hours
            </h4>
            <ul className="font-body-sm text-body-sm text-on-surface-variant space-y-space-xs">
              <li>Mon – Thu: 11:30 AM – 10:00 PM</li>
              <li>Fri – Sat: 11:30 AM – Midnight</li>
              <li>Sunday: 12:00 PM – 9:30 PM</li>
            </ul>
          </div>

          <div id="contact">
            <h4 className="font-headline-sm text-headline-sm text-on-surface mb-space-sm uppercase tracking-tight">
              Location &amp; Dial
            </h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              442 Grand Street, Corner of Mulberry
              <br />
              Little Italy, New York, NY 10002
            </p>
            <p className="font-label-md text-label-md text-primary mt-space-sm font-bold">
              Direct Line: (212) 555-PIZZA
            </p>
          </div>

          <div>
            <h4 className="font-headline-sm text-headline-sm text-on-surface mb-space-sm uppercase tracking-tight">
              Piezette Club
            </h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-sm">
              Join for secret daily slice drops, weekend disco hours, and fresh merch.
            </p>
            {joined ? (
              <p className="font-label-md text-label-md text-primary font-bold">
                You&apos;re on the list. See you at the oven!
              </p>
            ) : (
              <form onSubmit={handleJoin} className="flex items-center gap-space-xs">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Your email here..."
                  aria-label="Email for Piezette Club"
                  className="w-full bg-surface-container-lowest text-on-surface px-space-md py-space-sm rounded-full font-body-sm text-body-sm focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-primary text-on-primary px-space-md py-space-sm rounded-full font-label-md text-label-md uppercase font-bold hard-shadow"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-outline-variant/50 pt-space-md flex flex-col sm:flex-row items-center justify-between gap-space-sm font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
          <span className="flex items-center gap-space-xs">
            <Icon name="favorite" className="text-primary text-body-sm" filled />
            Hot &amp; Fresh Guarantee • Lizzie&apos;s Since 1976
          </span>
          <span>© 1974–2026 Lizzie&apos;s Pizza Co. All dough reserved.</span>
        </div>
      </div>
    </footer>
  )
}
