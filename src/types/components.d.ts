/**
 * declare module '@vue/runtime-core'
 *   现调整为
 * declare module 'vue'
 */
import type XtxGuessLike from '@/components/XtxSwiper/XtxGuessLike.vue'
import XtxSwiper from './XtxSwiper/XtxSwiper.vue'
import 'vue'
declare module 'vue' {
  export interface GlobalComponents {
    //
    XtxSwiper: typeof XtxSwiper
    XtxGuessLike: typeof XtxGuessLike
  }
}
