import { Fragment } from 'react'
import { promoItems } from '../data/menu.js'

export default function PromoRibbon() {
  return (
    <div className="w-full bg-primary-container text-on-primary py-space-sm px-margin flex items-center overflow-x-auto text-nowrap shadow-[0_2px_0px_#261815]">
      <div className="flex items-center gap-space-md mx-auto font-label-md text-label-md uppercase tracking-wider">
        {promoItems.map((item, index) => (
          <Fragment key={item}>
            <span className="flex items-center gap-1 font-bold">{item}</span>
            {index < promoItems.length - 1 && (
              <span className="opacity-40">•</span>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
