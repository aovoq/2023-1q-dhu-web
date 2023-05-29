import localFont from 'next/font/local'

export const Satoshi = localFont({
   src: [{
      path: '../../fonts/Satoshi/Satoshi-Light.woff2',
      weight: '300'
   }, {
      path: '../../fonts/Satoshi/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal'
   }, {
      path: '../../fonts/Satoshi/Satoshi-Bold.woff2',
      weight: '700',
      style: 'bold'
   }, {
      path: '../../fonts/Satoshi/Satoshi-Black.woff2',
      weight: '900'
   }],
   variable: "--font-satoshi",
})

export const TTCommons = localFont({
   src: [{
      path: '../../fonts/TT-Commons/TT-Commons-Regular.otf',
      weight: '400',
      style: 'normal'
   }, {
      path: '../../fonts/TT-Commons/TT-Commons-Medium.otf',
      weight: '500',
   }, {
      path: '../../fonts/TT-Commons/TT-Commons-Bold.otf',
      weight: '700',
      style: 'bold'
   }, {
      path: '../../fonts/TT-Commons/TT-Commons-Black.otf',
      weight: '900'
   }],
   variable: "--font-ttcommons",
})
