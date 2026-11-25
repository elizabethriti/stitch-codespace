import Icon from '../components/Icon.jsx'
import MenuItemCard from '../components/MenuItemCard.jsx'
import OrderSummary from '../components/OrderSummary.jsx'
import PromoRibbon from '../components/PromoRibbon.jsx'
import { menuSections, menuTabs } from '../data/menu.js'

const imageHeightBySection = {
  'section-pizzas': 'h-44',
  'section-sides': 'h-40',
  'section-drinks': 'h-36',
}

export default function MenuOrderPage() {
  return (
    <>
      <PromoRibbon />

      <div className="w-full px-margin-mobile md:px-margin pt-space-lg pb-space-md">
        <div className="w-full bg-surface-container-low rounded-lg p-space-md md:p-space-xl relative overflow-hidden hard-shadow-md">
          <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-surface-container-high opacity-40 pointer-events-none" />
          <div className="absolute -bottom-16 -left-10 w-48 h-48 rounded-full bg-primary-fixed opacity-30 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-space-lg">
            <div className="max-w-2xl text-center md:text-left">
              <div className="inline-flex items-center gap-space-xs bg-surface px-space-md py-space-xs rounded-full hard-shadow mb-space-sm">
                <Icon name="local_fire_department" className="text-primary text-body-sm" filled />
                <span className="font-label-md text-label-md uppercase tracking-widest text-primary font-bold">
                  Order Online • Fresh • Fast
                </span>
              </div>
              <h1 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl text-on-surface tracking-tight leading-none mb-space-sm font-extrabold">
                Lizzie&apos;s Fresh Hand-Tossed Pizza &amp; Diner Eats
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                Sourdough naturally proofed for 72 hours, crushed Jersey tomatoes, hand-stretched daily with love, warmth, and retro cheer.
              </p>
            </div>

            <div className="flex-shrink-0 flex flex-col items-center justify-center p-space-md bg-surface rounded-full hard-shadow-md w-44 h-28 md:w-56 md:h-36 text-center transform hover:rotate-1 transition-transform">
              <span
                className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-extrabold tracking-tight italic"
                style={{ fontFamily: "'Bricolage Grotesque', cursive" }}
              >
                Lizzie&apos;s
              </span>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-tertiary font-bold -mt-1">
                Pie Parlor • NYC
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-margin-mobile md:px-margin pb-space-xl">
        <div className="flex flex-col lg:flex-row gap-gutter items-start">
          <div className="w-full lg:w-[68%] flex flex-col gap-space-xl">
            <div className="sticky top-[6.5rem] z-30 bg-surface/95 backdrop-blur-md py-space-sm flex items-center gap-space-sm overflow-x-auto text-nowrap">
              {menuTabs.map((tab, index) => (
                <a
                  key={tab.label}
                  href={tab.target}
                  className={
                    index === 0
                      ? 'px-space-lg py-space-xs bg-primary text-on-primary rounded-full font-label-lg text-label-lg uppercase tracking-wider hard-shadow transition-all hover:-translate-y-0.5'
                      : 'px-space-lg py-space-xs bg-surface-container-high text-on-surface hover:bg-surface-container-highest rounded-full font-label-lg text-label-lg uppercase tracking-wider transition-colors'
                  }
                >
                  {tab.label}
                </a>
              ))}
              <div className="ml-auto hidden sm:flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                Oven Temp: 850°F Ready
              </div>
            </div>

            {menuSections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-[9rem]"
              >
                <div className="flex items-center justify-between mb-space-md">
                  <div>
                    <div className="flex items-center gap-space-xs">
                      <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
                        {section.category}
                      </span>
                      <span className="h-1 w-6 bg-primary rounded-full" />
                    </div>
                    <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight">
                      {section.title}
                    </h2>
                  </div>
                  <span className="bg-surface-container px-space-md py-space-xs rounded-full font-label-md text-label-md text-on-surface-variant font-bold hidden sm:inline-block">
                    {section.count}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  {section.items.map((item) => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      imageHeight={imageHeightBySection[section.id]}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="w-full lg:w-[32%] lg:sticky lg:top-[7.5rem] flex-shrink-0">
            <OrderSummary />
          </div>
        </div>
      </div>
    </>
  )
}
