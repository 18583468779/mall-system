<template>
  <div class="min-h-screen bg-gray-200 flex items-center justify-center">
    <div
      class="bg-white rounded-xl shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl w-full flex flex-col lg:flex-row"
    >
      <!-- 左侧图片 -->
      <div class="lg:block lg:w-1/2 bg-cover">
        <img :src="loginBg" class="w-full h-full object-contain" />
      </div>

      <!-- 右侧表单 -->
      <div class="w-full p-8 lg:w-1/2">
        <!-- Tabs切换 -->
        <el-tabs v-model="activeTab" class="mb-8">
          <el-tab-pane label="账号登录" name="account"></el-tab-pane>
          <el-tab-pane label="邮箱登录" name="email"></el-tab-pane>
          <el-tab-pane label="手机登录" name="phone"></el-tab-pane>
          <el-tab-pane label="微信登录" name="wechat"></el-tab-pane>
        </el-tabs>

        <!-- 微信登录 -->
        <div v-if="activeTab === 'wechat'" class="text-center space-y-8">
          <div class="text-gray-600">微信扫码登录</div>
          <div class="inline-block p-4 bg-gray-100 rounded-xl">
            <vue-qrcode
              :value="qrCodeValue"
              :width="qrCodeSize"
              :color="{ dark: qrCodeDarkColor, light: qrCodeLightColor }"
              type="image/png"
            />
          </div>
          <div class="text-sm text-gray-500">使用微信扫一扫登录账号</div>
        </div>

        <!-- 账号登录 -->
        <div v-if="activeTab === 'account'" class="space-y-8">
          <el-form class="space-y-6 flex flex-col gap-2">
            <el-form-item>
              <el-input
                v-model="username"
                placeholder="请输入用户名"
                size="large"
                class="!rounded-lg"
              >
                <template #prefix>
                  <el-icon><User /></el-icon>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item>
              <el-input
                v-model="password"
                placeholder="请输入密码"
                size="large"
                class="!rounded-lg"
                show-password
              >
                <template #prefix>
                  <el-icon><Lock /></el-icon>
                </template>
              </el-input>
            </el-form-item>
          </el-form>

          <!-- 登录按钮 -->
          <div class="pt-8">
            <el-button
              type="primary"
              size="large"
              class="w-full !rounded-lg !py-4 !text-base"
              color="rgb(239 68 68)"
              @click="login"
            >
              立即登录
            </el-button>
          </div>
        </div>

        <!-- 表单登录 -->
        <template v-else-if="activeTab !== 'wechat'">
          <!-- 邮箱/手机表单 -->
          <el-form class="space-y-6 flex flex-col gap-2">
            <el-form-item>
              <el-input
                v-model="username"
                :placeholder="
                  activeTab === 'email' ? '请输入邮箱' : '请输入手机号'
                "
                size="large"
                class="!rounded-lg"
              >
                <template #prefix>
                  <el-icon>
                    <User v-if="activeTab === 'email'" />
                    <Iphone v-else />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item>
              <div class="flex gap-2">
                <el-input
                  v-model="smsCode"
                  placeholder="请输入验证码"
                  size="large"
                  class="!rounded-lg flex-1"
                >
                  <template #prefix>
                    <el-icon><Message /></el-icon>
                  </template>
                </el-input>
                <el-button
                  text
                  bg
                  size="large"
                  class="!rounded-lg"
                  @click="sendSmsCode"
                >
                  获取验证码
                </el-button>
              </div>
            </el-form-item>
            <!-- 登录按钮 -->
            <div class="pt-8">
              <el-button
                type="primary"
                size="large"
                class="w-full !rounded-lg !py-4 !text-base"
                color="rgb(239 68 68)"
                @click="login"
              >
                立即登录
              </el-button>
            </div>
          </el-form>
        </template>

        <!-- 底部链接 -->
        <div class="mt-8 text-center text-sm text-gray-500">
          <span>没有账号？</span>
          <el-link type="primary" :underline="false" class="!font-medium"
            >立即注册</el-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { User, Lock, Iphone, Message } from "@element-plus/icons-vue";
import userStore from "../../piniaStore/userInfo/index";
import storage from "../../utils/goodStorageUtil";
import { useRouter } from "vue-router";
import loginBg from "../../assets/image/loginBg.svg";
import VueQrcode from "vue-qrcode";
import { ElMessage } from "element-plus";
const qrCodeValue = ref("https://example.com");
const qrCodeSize = ref(150);
// 定义二维码的前景色和背景色
const qrCodeDarkColor = ref("#000");
const qrCodeLightColor = ref("#FFF");
const router = useRouter();
const activeTab = ref("email");
const username = ref("");
const password = ref("");
const smsCode = ref("");
const store = userStore();
const login = async () => {
  if (activeTab.value === "wechat") return;
  await store.login(
    activeTab.value,
    username.value,
    password.value,
    smsCode.value
  );

  if (storage.get("token")) {
    ElMessage({
      message: "登录成功",
      type: "success",
    });
    router.push({ name: "home" });
  }
};

const sendSmsCode = async () => {
  const code = await store.sendCode(username.value);
  if (code) {
    ElMessage({
      message: "验证码发送成功，请查收",
      type: "success",
    });
  }
};
</script>

<style scoped>
/* 自定义Tabs样式 */
:deep(.el-tabs__nav-wrap::after) {
  background-color: transparent;
}

:deep(.el-tabs__active-bar) {
  @apply bg-red-500;
}

:deep(.el-tabs__item) {
  @apply px-4 text-gray-500 hover:text-red-500;
}

:deep(.el-tabs__item.is-active) {
  @apply text-red-500 font-medium;
}

/* 美化输入框 */
:deep(.el-input__wrapper) {
  @apply !rounded-lg shadow-sm;
}

:deep(.el-input__inner::placeholder) {
  @apply text-gray-400;
}

/* 表单容器固定高度 */
.el-tabs + * {
  min-height: 300px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .el-button {
    @apply py-3;
  }
}
</style>
