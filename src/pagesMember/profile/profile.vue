<script setup lang="ts">
import { reqGetProfile, reqSaveProfile } from '@/services/member'
import { useMemberStore } from '@/stores'
import { onLoad } from '@dcloudio/uni-app'
const memberStore = useMemberStore()
const getProfile = async () => {
  const res = await reqGetProfile()

  if (res.code == 1) {
    memberStore.profile = { ...memberStore.profile!, ...res.result }
  }
}
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const editAvatar = async () => {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      const FilePath = res.tempFilePaths[0]
      console.log(FilePath)

      uni.uploadFile({
        url: '/member/profile/avatar',
        name: 'file',
        filePath: FilePath,
        success: (success) => {
          console.log(success)
          console.log(111)
        },
        fail: (err) => {
          // console.log(err);
        },
      })
    },
  })
}
const onRadioChange: UniHelper.RadioGroupOnChange = (event) => {
  memberStore.profile!.gender = event.detail.value
}
const onDateChange: UniHelper.DatePickerOnChange = (event) => {
  memberStore.profile!.birthday = event.detail.value
}
let regionCode: [string, string, string]
const onRegionChange: UniHelper.RegionPickerOnChange = (event) => {
  console.log(event.detail)
  regionCode = event.detail.code!
  const fullLocation = event.detail.value.join('')
  memberStore.profile!.fullLocation = fullLocation
}
const saveProfile = async () => {
  const { nickname, gender, birthday, profession } = memberStore.profile!
  const res = await reqSaveProfile({
    nickname,
    gender,
    birthday,
    profession,
    provinceCode: regionCode[0] || '',
    cityCode: regionCode[1] || '',
    countyCode: regionCode[2] || '',
  })
  if (res.code == 1) {
    uni.showToast({ title: '保存成功！', icon: 'success' })
    uni.navigateBack()
  }
}
onLoad(() => {
  getProfile()
})
</script>

<template>
  <view class="viewport">
    <!-- 导航栏 -->
    <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
      <navigator open-type="navigateBack" class="back icon-left" hover-class="none"></navigator>
      <view class="title">个人信息</view>
    </view>
    <!-- 头像 -->
    <view class="avatar">
      <view class="avatar-content" @tap="editAvatar">
        <image class="image" :src="memberStore.profile?.avatar" mode="aspectFill" />
        <text class="text">点击修改头像</text>
      </view>
    </view>
    <!-- 表单 -->
    <view class="form">
      <!-- 表单内容 -->
      <view class="form-content">
        <view class="form-item">
          <text class="label">账号</text>
          <text class="account">{{ memberStore.profile?.account }}</text>
        </view>
        <view class="form-item">
          <text class="label">昵称</text>
          <input
            class="input"
            type="text"
            placeholder="请填写昵称"
            v-model="memberStore.profile!.nickname"
          />
        </view>
        <view class="form-item">
          <text class="label">性别</text>
          <radio-group @change="onRadioChange">
            <label class="radio">
              <radio value="男" color="#27ba9b" :checked="memberStore.profile?.gender == '男'" />
              男
            </label>
            <label class="radio">
              <radio value="女" color="#27ba9b" :checked="memberStore.profile?.gender == '女'" />
              女
            </label>
          </radio-group>
        </view>
        <view class="form-item">
          <text class="label">生日</text>

          <picker
            class="picker"
            @change="onDateChange"
            mode="date"
            start="1900-01-01"
            :end="new Date()"
            value="2000-01-01"
          >
            <view v-if="memberStore.profile?.birthday">{{ memberStore.profile?.birthday }}</view>
            <view class="placeholder" v-else>请选择日期</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">城市</text>

          <picker
            class="picker"
            @change="onRegionChange"
            mode="region"
            :value="['广东省', '广州市', '天河区']"
          >
            <view v-if="memberStore.profile?.fullLocation">{{
              memberStore.profile?.fullLocation
            }}</view>
            <view class="placeholder" v-else>请选择城市</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">职业</text>
          <input
            class="input"
            type="text"
            placeholder="请填写职业"
            v-model="memberStore.profile!.profession"
          />
        </view>
      </view>
      <!-- 提交按钮 -->
      <button class="form-button" @tap="saveProfile">保 存</button>
    </view>
  </view>
</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/order_bg.png);
  background-size: auto 420rpx;
  background-repeat: no-repeat;
}

// 导航栏
.navbar {
  position: relative;

  .title {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
  }

  .back {
    position: absolute;
    height: 40px;
    width: 40px;
    left: 0;
    font-size: 20px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

// 头像
.avatar {
  text-align: center;
  width: 100%;
  height: 260rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .image {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    background-color: #eee;
  }

  .text {
    display: block;
    padding-top: 20rpx;
    line-height: 1;
    font-size: 26rpx;
    color: #fff;
  }
}

// 表单
.form {
  background-color: #f4f4f4;

  &-content {
    margin: 20rpx 20rpx 0;
    padding: 0 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }

  &-item {
    display: flex;
    height: 96rpx;
    line-height: 46rpx;
    padding: 25rpx 10rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;

    &:last-child {
      border: none;
    }

    .label {
      width: 180rpx;
      color: #333;
    }

    .account {
      color: #666;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .radio {
      margin-right: 20rpx;
    }

    .picker {
      flex: 1;
    }

    .placeholder {
      color: #808080;
    }
  }

  &-button {
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    margin: 30rpx 20rpx;
    color: #fff;
    border-radius: 80rpx;
    font-size: 30rpx;
    background-color: #27ba9b;
  }
}
</style>
