<script setup lang="ts">
import { reqAddAddressItem, reqAddressItem } from '@/services/address'
import type { addressItem } from '@/types/address'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import Address from '../address/address.vue'
const props = defineProps<{
  id?: string | number
}>()
if (props.id) {
  uni.setNavigationBarTitle({ title: '修改地址' })
} else {
  uni.setNavigationBarTitle({ title: '新增地址' })
}

// 表单数据
const form = ref<addressItem>({
  receiver: '', // 收货人
  contact: '', // 联系方式
  fullLocation: '', // 省市区(前端展示)
  provinceCode: '', // 省份编码(后端参数)
  cityCode: '', // 城市编码(后端参数)
  countyCode: '', // 区/县编码(后端参数)
  address: '', // 详细地址
  isDefault: 0, // 默认地址，1为是，0为否
})
const getAddressItem = async () => {
  const res = await reqAddressItem(props.id!)
  form.value = res.result
  console.log(res.result)
}

let regionCode: [string, string, string]
const onPickerChange: UniHelper.RegionPickerOnChange = (event) => {
  form.value.fullLocation = event.detail.value.join(' ')
  regionCode = event.detail.code!
}

const onSwitchChange: UniHelper.SwitchOnChange = (event) => {
  form.value.isDefault = event.detail.value ? 1 : 0
}

const formRef = ref()
const rules: UniHelper.UniFormsRules = {
  receiver: {
    rules: [
      {
        required: true,
        errorMessage: '请填写收货人姓名！',
      },
    ],
  },
  contact: {
    rules: [
      {
        required: true,
        errorMessage: '请填写收货人电话号码',
      },
      {
        pattern: /^1[3-9]\d{9}$/,
        errorMessage: '手机号格式错误！',
      },
    ],
  },
  fullLocation: {
    rules: [
      {
        required: true,
        errorMessage: '省市区地址不能为空！',
      },
    ],
  },
  address: {
    rules: [{ required: true, errorMessage: '详细地址不能为空！' }],
  },
}

const save = async () => {
  formRef.value.validate().then(async () => {
    const { receiver, contact, provinceCode, cityCode, countyCode, address, isDefault } = form.value
    const res = await reqAddAddressItem({
      receiver,
      contact,
      provinceCode: regionCode[0],
      cityCode: regionCode[1],
      countyCode: regionCode[2],
      address,
      isDefault,
    })
    if (res.code == 1) {
      uni.showToast({ title: '更新成功！', icon: 'success' })
      setTimeout(() => {
        uni.navigateBack()
      }, 500)
    }
  })
}
onLoad(() => {
  if (props.id) {
    getAddressItem()
  }
})
</script>

<template>
  <view class="content">
    <uni-forms :modelValue="form" :rules="rules" validate-trigger="bind" ref="formRef">
      <!-- 表单内容 -->
      <uni-forms-item class="form-item" name="receiver">
        <text class="label">收货人</text>
        <input class="input" placeholder="请填写收货人姓名" v-model="form.receiver" />
      </uni-forms-item>
      <uni-forms-item class="form-item" name="contact">
        <text class="label">手机号码</text>
        <input class="input" placeholder="请填写收货人手机号码" v-model="form.contact" />
      </uni-forms-item>
      <uni-forms-item class="form-item" name="fullLocation">
        <text class="label">所在地区</text>
        <picker class="picker" mode="region" value="" @change="onPickerChange">
          <view v-if="form.fullLocation">{{ form.fullLocation }}</view>
          <view v-else class="placeholder">请选择省/市/区(县)</view>
        </picker>
      </uni-forms-item>
      <uni-forms-item class="form-item" name="address">
        <text class="label">详细地址</text>
        <input class="input" placeholder="街道、楼牌号等信息" v-model="form.address" />
      </uni-forms-item>
      <view class="form-item">
        <label class="label">设为默认地址</label>
        <switch class="switch" color="#27ba9b" :checked="form.isDefault" @change="onSwitchChange" />
      </view>
    </uni-forms>
  </view>
  <!-- 提交按钮 -->
  <button class="button" @tap="save">保存并使用</button>
</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.content {
  margin: 20rpx 20rpx 0;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .form-item,
  .uni-forms-item {
    display: flex;
    align-items: center;
    min-height: 96rpx;
    padding: 25rpx 10rpx 40rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;
    position: relative;
    margin-bottom: 0;

    // 调整 uni-forms 样式
    .uni-forms-item__content {
      display: flex;
    }

    .uni-forms-item__error {
      margin-left: 200rpx;
    }

    &:last-child {
      border: none;
    }

    .label {
      width: 200rpx;
      color: #333;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .switch {
      position: absolute;
      right: -20rpx;
      transform: scale(0.8);
    }

    .picker {
      flex: 1;
    }

    .placeholder {
      color: #808080;
    }
  }
}

.button {
  height: 80rpx;
  margin: 30rpx 20rpx;
  color: #fff;
  border-radius: 80rpx;
  font-size: 30rpx;
  background-color: #27ba9b;
}
</style>
