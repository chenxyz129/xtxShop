<script setup lang="ts">
import { reqGoodsById } from '@/services/goods'
import type { goods } from '@/types/goods.t'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'
import AddressPanel from './component/AddressPanel.vue'
import ServicePanel from './component/ServicePanel.vue'
import type {
  SkuPopupInstanceType,
  SkuPopupLocaldata,
} from '@/components/vk-data-goods-sku-popup/vk-data-goods-sku-popup'
import { reqAddToCart } from '@/services/cart'
import { useMemberStore } from '@/stores'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const props = defineProps<{
  id: number
}>()
//获取商品信息
let Goods = ref<goods>()
let userAddresses = ref()
const getGoodsById = async () => {
  const res = await reqGoodsById(props.id)
  Goods.value = res.result
  console.log(res.result)
  localdata.value = {
    _id: res.result.id,
    name: res.result.name,
    goods_thumb: res.result.mainPictures[0],
    sku_list: res.result.skus.map((item) => {
      return {
        _id: item.id,
        goods_id: res.result.id,
        goods_name: res.result.name,
        image: item.picture,
        price: item.price * 100,
        sku_name_arr: item.specs.map((item1) => item1.valueName),
        stock: item.inventory,
      }
    }),
    spec_list: res.result.specs.map((item) => {
      return {
        name: item.name,
        list: item.values,
      }
    }),
  }
  userAddresses.value = res.result.userAddresses
}
//查看主图
let currIndex = ref<number>(0)
const swiperChange: UniHelper.SwiperOnChange = (event) => {
  currIndex.value = event.detail.current!
}
const checkImg = () => {
  uni.previewImage({
    current: Goods.value?.mainPictures[currIndex.value],
    urls: Goods.value!.mainPictures,
  })
}

//地址和服务协议弹窗
const popup = ref()
const isService = ref<boolean>()
const tapService = () => {
  isService.value = true
  popup.value.open('bottom')
}
const memberStore = useMemberStore()
const tapAddress = () => {
  if (!memberStore.profile) {
    uni.showToast({ title: '请先登录！', icon: 'error' })
    setTimeout(() => {
      uni.navigateTo({ url: '/pages/login/login' })
    }, 500)
  }
  isService.value = false
  popup.value.open('bottom')
}

//加入购物车弹窗
const isShowSkuPopUp = ref(false)
enum modeType {
  both = 1,
  cart = 2,
  buyNow = 3,
}
const mode = ref<modeType>(modeType.both)
const localdata = ref<SkuPopupLocaldata>()
const selectSku = (m: modeType) => {
  isShowSkuPopUp.value = true
  mode.value = m
}
const skuPopup = ref<SkuPopupInstanceType>()
const selectedsku = computed(() => {
  return skuPopup.value?.selectArr?.join(' ').trim() || '请选择商品规格'
})
const addCart = async (event: any) => {
  const res = await reqAddToCart(event._id, event.buy_num)
  if (res.code == 1) {
    uni.showToast({ title: '加入购物车成功' })
    setTimeout(() => {
      isShowSkuPopUp.value = false
    }, 500)
  }
}
let addrId = ref<number | string>()
let seletedAddr = ref()
const getAddrId_Addr = (id: number | string, addr: string) => {
  addrId.value = id
  seletedAddr.value = addr
}
const buyNow = (event: any) => {
  console.log(event)
  if (!addrId.value) return uni.showToast({ title: '请先选择收货地址！', icon: 'error' })
  uni.navigateTo({
    url: `/pagesOrder/createOrder/createOrder?addrId=${addrId.value}&skuId=${event._id}&count=${event.buy_num}`,
  })
}
onLoad(() => {
  getGoodsById()
})
</script>

<template>
  <scroll-view scroll-y class="viewport">
    <!-- 基本信息 -->
    <view class="goods">
      <!-- 商品主图 -->
      <view class="preview">
        <swiper circular @change="swiperChange">
          <swiper-item v-for="(item, index) in Goods?.mainPictures" :key="index">
            <image mode="aspectFill" :src="item" @tap="checkImg" />
          </swiper-item>
        </swiper>
        <view class="indicator">
          <text class="current">{{ currIndex! + 1 }}</text>
          <text class="split">/</text>
          <text class="total">{{ Goods?.mainPictures.length }}</text>
        </view>
      </view>

      <!-- 商品简介 -->
      <view class="meta">
        <view class="price">
          <text class="symbol">¥</text>
          <text class="number">{{ Goods?.price }}</text>
        </view>
        <view class="name ellipsis">{{ Goods?.name }} </view>
        <view class="desc"> {{ Goods?.desc }} </view>
      </view>

      <!-- 操作面板 -->
      <view class="action">
        <view class="item arrow" @tap="selectSku(modeType.both)">
          <text class="label">选择</text>
          <text class="text ellipsis"> {{ selectedsku }} </text>
        </view>
        <view class="item arrow">
          <text class="label">送至</text>
          <text class="text ellipsis" @tap="tapAddress">
            {{ seletedAddr ? seletedAddr : '请选择收货地址' }}
          </text>
        </view>
        <view class="item arrow">
          <text class="label">服务</text>
          <text class="text ellipsis" @tap="tapService"> 无忧退 快速退款 免费包邮 </text>
        </view>
      </view>
    </view>

    <!-- 商品详情 -->
    <view class="detail panel">
      <view class="title">
        <text>详情</text>
      </view>
      <view class="content">
        <view class="properties">
          <!-- 属性详情 -->
          <view class="item" v-for="(item, index) in Goods?.details.properties" :key="index">
            <text class="label">{{ item.name }}</text>
            <text class="value">{{ item.value }}</text>
          </view>
        </view>
        <!-- 图片详情 -->
        <image
          mode="widthFix"
          v-for="(item, index) in Goods?.details.pictures"
          :key="index"
          :src="item"
        ></image>
      </view>
    </view>

    <!-- 同类推荐 -->
    <view class="similar panel">
      <view class="title">
        <text>同类推荐</text>
      </view>
      <view class="content">
        <navigator
          v-for="(item, index) in Goods?.similarProducts"
          :key="index"
          class="goods"
          hover-class="none"
          :url="`/pages/goods/goods?id=`"
        >
          <image class="image" mode="aspectFill" :src="item.picture"></image>
          <view class="name ellipsis">{{ item.name }}</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">{{ item.price }}</text>
          </view>
        </navigator>
      </view>
    </view>
  </scroll-view>

  <!-- 用户操作 -->
  <view class="toolbar" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
    <view class="icons">
      <button class="icons-button"><text class="icon-heart"></text>收藏</button>
      <button class="icons-button" open-type="contact">
        <text class="icon-handset"></text>客服
      </button>
      <navigator class="icons-button" url="/pages/cart/cart2">
        <text class="icon-cart"></text>购物车
      </navigator>
    </view>
    <view class="buttons">
      <view class="addcart" @tap="selectSku(modeType.cart)"> 加入购物车 </view>
      <view class="buynow" @tap="selectSku(modeType.buyNow)"> 立即购买 </view>
    </view>
  </view>
  <!-- 收货地址和服务信息弹窗 -->
  <uni-popup ref="popup" type="top">
    <ServicePanel @close="popup.close()" v-if="isService" />
    <AddressPanel
      @close="popup.close()"
      v-else
      :userAddresses="userAddresses"
      @sendId_Addr="getAddrId_Addr"
    />
  </uni-popup>
  <!-- 加入购物车、立即购买弹窗 -->
  <vk-data-goods-sku-popup
    ref="skuPopup"
    v-model="isShowSkuPopUp"
    :mode="mode"
    :localdata="localdata"
    @add-cart="addCart"
    @buy-now="buyNow"
  >
  </vk-data-goods-sku-popup>
</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.viewport {
  background-color: #f4f4f4;
}

.panel {
  margin-top: 20rpx;
  background-color: #fff;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90rpx;
    line-height: 1;
    padding: 30rpx 60rpx 30rpx 6rpx;
    position: relative;

    text {
      padding-left: 10rpx;
      font-size: 28rpx;
      color: #333;
      font-weight: 600;
      border-left: 4rpx solid #27ba9b;
    }

    navigator {
      font-size: 24rpx;
      color: #666;
    }
  }
}

.arrow {
  &::after {
    position: absolute;
    top: 50%;
    right: 30rpx;
    content: '\e6c2';
    color: #ccc;
    font-family: 'erabbit' !important;
    font-size: 32rpx;
    transform: translateY(-50%);
  }
}

/* 商品信息 */
.goods {
  background-color: #fff;

  .preview {
    height: 750rpx;
    position: relative;

    .image {
      width: 750rpx;
      height: 750rpx;
    }

    .indicator {
      height: 40rpx;
      padding: 0 24rpx;
      line-height: 40rpx;
      border-radius: 30rpx;
      color: #fff;
      font-family: Arial, Helvetica, sans-serif;
      background-color: rgba(0, 0, 0, 0.3);
      position: absolute;
      bottom: 30rpx;
      right: 30rpx;

      .current {
        font-size: 26rpx;
      }

      .split {
        font-size: 24rpx;
        margin: 0 1rpx 0 2rpx;
      }

      .total {
        font-size: 24rpx;
      }
    }
  }

  .meta {
    position: relative;
    border-bottom: 1rpx solid #eaeaea;

    .price {
      height: 130rpx;
      padding: 25rpx 30rpx 0;
      color: #fff;
      font-size: 34rpx;
      box-sizing: border-box;
      background-color: #35c8a9;
    }

    .number {
      font-size: 56rpx;
    }

    .brand {
      width: 160rpx;
      height: 80rpx;
      overflow: hidden;
      position: absolute;
      top: 26rpx;
      right: 30rpx;
    }

    .name {
      max-height: 88rpx;
      line-height: 1.4;
      margin: 20rpx;
      font-size: 32rpx;
      color: #333;
    }

    .desc {
      line-height: 1;
      padding: 0 20rpx 30rpx;
      font-size: 24rpx;
      color: #cf4444;
    }
  }

  .action {
    padding-left: 20rpx;

    .item {
      height: 90rpx;
      padding-right: 60rpx;
      border-bottom: 1rpx solid #eaeaea;
      font-size: 26rpx;
      color: #333;
      position: relative;
      display: flex;
      align-items: center;

      &:last-child {
        border-bottom: 0 none;
      }
    }

    .label {
      width: 60rpx;
      color: #898b94;
      margin: 0 16rpx 0 10rpx;
    }

    .text {
      flex: 1;
      -webkit-line-clamp: 1;
    }
  }
}

/* 商品详情 */
.detail {
  padding-left: 20rpx;

  .content {
    margin-left: -20rpx;

    .image {
      width: 100%;
    }
  }

  .properties {
    padding: 0 20rpx;
    margin-bottom: 30rpx;

    .item {
      display: flex;
      line-height: 2;
      padding: 10rpx;
      font-size: 26rpx;
      color: #333;
      border-bottom: 1rpx dashed #ccc;
    }

    .label {
      width: 200rpx;
    }

    .value {
      flex: 1;
    }
  }
}

/* 同类推荐 */
.similar {
  .content {
    padding: 0 20rpx 200rpx;
    background-color: #f4f4f4;
    display: flex;
    flex-wrap: wrap;

    .goods {
      width: 340rpx;
      padding: 24rpx 20rpx 20rpx;
      margin: 20rpx 7rpx;
      border-radius: 10rpx;
      background-color: #fff;
    }

    .image {
      width: 300rpx;
      height: 260rpx;
    }

    .name {
      height: 80rpx;
      margin: 10rpx 0;
      font-size: 26rpx;
      color: #262626;
    }

    .price {
      line-height: 1;
      font-size: 20rpx;
      color: #cf4444;
    }

    .number {
      font-size: 26rpx;
      margin-left: 2rpx;
    }
  }

  navigator {
    &:nth-child(even) {
      margin-right: 0;
    }
  }
}

/* 底部工具栏 */
.toolbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: #fff;
  height: 100rpx;
  padding: 0 20rpx var(--window-bottom);
  border-top: 1rpx solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: content-box;

  .buttons {
    display: flex;

    & > view {
      width: 220rpx;
      text-align: center;
      line-height: 72rpx;
      font-size: 26rpx;
      color: #fff;
      border-radius: 72rpx;
    }

    .addcart {
      background-color: #ffa868;
    }

    .buynow,
    .payment {
      background-color: #27ba9b;
      margin-left: 20rpx;
    }
  }

  .icons {
    padding-right: 10rpx;
    display: flex;
    align-items: center;
    flex: 1;

    .icons-button {
      flex: 1;
      text-align: center;
      line-height: 1.4;
      padding: 0;
      margin: 0;
      border-radius: 0;
      font-size: 20rpx;
      color: #333;
      background-color: #fff;

      &::after {
        border: none;
      }
    }

    text {
      display: block;
      font-size: 34rpx;
    }
  }
}
</style>
