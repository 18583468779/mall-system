<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div
      class="bg-white rounded-2xl shadow-xl overflow-hidden mx-auto max-w-sm lg:max-w-4xl w-full flex flex-col lg:flex-row relative"
    >
      <!-- 左侧图片 -->
      <div class="lg:block lg:w-1/2 bg-gray-50 relative">
        <router-link
          to="/"
          class="absolute top-4 left-4 z-10 flex items-center space-x-1 group transition-all"
        >
          <div
            class="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md group-hover:bg-red-50 transition-colors flex items-center"
          >
            <svg
              class="w-5 h-5 text-gray-600 group-hover:text-red-500 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </div>
          <span
            class="text-sm font-medium ml-2 text-gray-600 group-hover:text-red-500 hidden lg:inline-block transition-colors"
          >
            返回主页
          </span>
        </router-link>
        <img
          :src="loginBg"
          class="w-full h-48 lg:h-full object-center opacity-95"
          alt="登录背景图"
        />
      </div>

      <!-- 右侧表单 -->
      <div class="w-full p-8 lg:w-1/2">
        <div class="py-4">
          <h3 class="text-center text-2xl font-bold text-gray-800">用户登录</h3>
        </div>

        <!-- Tabs切换 -->
        <el-tabs v-model="activeTab" class="mb-8" @tab-click="handleTabClick">
          <el-tab-pane label="账号登录" name="account"></el-tab-pane>
          <el-tab-pane label="邮箱登录" name="email"></el-tab-pane>
          <!-- <el-tab-pane label="手机登录" name="phone"></el-tab-pane>
          <el-tab-pane label="微信登录" name="wechat"></el-tab-pane> -->
        </el-tabs>

        <!-- 微信登录 -->
        <div v-if="activeTab === 'wechat'" class="text-center space-y-8">
          <div class="text-gray-600 text-lg">微信扫码登录</div>
          <div
            class="inline-block p-4 bg-gray-100 rounded-xl transition-all hover:shadow-md"
          >
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
          <el-form
            ref="accountFormRef"
            :model="accountForm"
            :rules="accountRules"
            class="space-y-6 flex flex-col gap-2"
          >
            <el-form-item prop="username">
              <el-input
                v-model="accountForm.username"
                placeholder="请输入用户名"
                size="large"
                class="!rounded-lg"
              >
                <template #prefix>
                  <el-icon><User /></el-icon>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                v-model="accountForm.password"
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
            <!-- 新增用户协议 -->
            <el-form-item prop="agreed" class="!mt-4 flex items-center">
              <el-checkbox
                v-model="accountForm.agreed"
                label=""
                size="large"
                class="!items-start"
              >
                <div class="text-xs text-gray-600 ml-2 flex mt-1">
                  已阅读并同意
                  <el-link
                    type="primary"
                    :underline="false"
                    class="!text-xs"
                    @click="handleToPage('agreement')"
                  >
                    《用户协议》</el-link
                  >
                  和
                  <el-link
                    type="primary"
                    :underline="false"
                    class="!text-xs"
                    @click="handleToPage('privacy')"
                  >
                    《隐私政策》</el-link
                  >
                </div>
              </el-checkbox>
            </el-form-item>
            <div class="pt-8">
              <el-button
                type="primary"
                size="large"
                class="w-full !rounded-lg !py-4 !text-base login-btn"
                @click="login"
              >
                立即登录
              </el-button>
            </div>
          </el-form>
        </div>

        <!-- 表单登录 -->
        <template v-else-if="activeTab !== 'wechat'">
          <el-form
            ref="smsFormRef"
            :model="smsForm"
            :rules="smsRules"
            class="space-y-6 flex flex-col gap-2"
          >
            <el-form-item prop="account">
              <el-input
                v-model="smsForm.account"
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

            <el-form-item prop="code">
              <div class="flex gap-2">
                <el-input
                  v-model="smsForm.code"
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
                  class="!rounded-lg code-btn"
                  :disabled="!isValidAccount || isCounting"
                  @click="sendSmsCode"
                >
                  {{ countdown > 0 ? `${countdown}秒后重试` : "获取验证码" }}
                </el-button>
              </div>
            </el-form-item>
            <!-- 新增用户协议 -->
            <el-form-item prop="agreed" class="!mt-4 flex items-center">
              <el-checkbox
                v-model="smsForm.agreed"
                label=""
                size="large"
                class="!items-start"
              >
                <div class="text-xs text-gray-600 ml-2 flex mt-1">
                  已阅读并同意
                  <el-link
                    type="primary"
                    :underline="false"
                    class="!text-xs"
                    @click="handleToPage('agreement')"
                    >《用户协议》</el-link
                  >
                  和
                  <el-link
                    type="primary"
                    :underline="false"
                    class="!text-xs"
                    @click="handleToPage('privacy')"
                    >《隐私政策》</el-link
                  >
                </div>
              </el-checkbox>
            </el-form-item>
            <div class="pt-8">
              <el-button
                type="primary"
                size="large"
                class="w-full !rounded-lg !py-4 !text-base login-btn"
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
          <el-link
            type="primary"
            :underline="false"
            class="!font-medium hover:!text-red-600 transition-colors"
            @click="handleAutoRegister"
          >
            立即注册
          </el-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { User, Lock, Iphone, Message } from "@element-plus/icons-vue";
import userStore from "../../piniaStore/userInfo/index";
import storage from "../../utils/goodStorageUtil";
import { useRouter } from "vue-router";
import loginBg from "../../assets/image/loginBg.svg";
import VueQrcode from "vue-qrcode";
import { ElMessage } from "element-plus";

const router = useRouter();
const store = userStore();

// 二维码配置
const qrCodeValue = ref("https://example.com");
const qrCodeSize = ref(150);
const qrCodeDarkColor = ref("#000");
const qrCodeLightColor = ref("#FFF");

// 表单相关
const activeTab = ref("email");
const accountFormRef = ref<FormInstance>();
const smsFormRef = ref<FormInstance>();

// 表单数据
const accountForm = reactive({
  username: "",
  password: "",
  agreed: false, // 新增同意协议
});

const smsForm = reactive({
  account: "",
  code: "",
  agreed: false, // 新增同意协议
});

const handleTabClick = () => {
  if (activeTab.value === "account") {
    accountFormRef.value?.clearValidate();
    Object.assign(accountForm, { username: "", password: "" });
  } else {
    smsFormRef.value?.clearValidate();
    Object.assign(smsForm, { account: "", code: "" });
  }
};

const emailPhoneMsg = computed(() => {
  return activeTab.value === "email" ? "请输入邮箱" : "请输入手机号";
});
const agreeRule: any = [
  {
    validator: (_, value, callback) => {
      if (!value) {
        callback(new Error("请先阅读并同意协议"));
      } else {
        callback();
      }
    },
    trigger: "change",
  },
];
// 验证规则
const accountRules: FormRules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 16, message: "长度在3到16个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 20, message: "长度在6到20个字符", trigger: "blur" },
  ],
  agreed: agreeRule,
};

const smsRules: FormRules = {
  account: [
    { required: true, message: () => emailPhoneMsg.value, trigger: "blur" },
    {
      validator: (_, value, callback) => {
        if (
          activeTab.value === "email" &&
          !/^\w+@[a-z0-9]+\.[a-z]{2,4}$/.test(value)
        ) {
          callback(new Error("请输入正确的邮箱格式"));
        } else if (
          activeTab.value === "phone" &&
          !/^1[3-9]\d{9}$/.test(value)
        ) {
          callback(new Error("请输入正确的手机号格式"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
  code: [
    { required: true, message: "请输入验证码", trigger: "blur" },
    { pattern: /^\d{6}$/, message: "验证码为6位数字", trigger: "blur" },
  ],
  agreed: agreeRule,
};
// 新增自动注册提示
const handleAutoRegister = () => {
  ElMessage.info("首次使用邮箱登录将自动完成注册");
};
const isValidAccount = computed(() => {
  if (activeTab.value === "email") {
    return /^\w+@[a-z0-9]+\.[a-z]{2,4}$/.test(smsForm.account);
  }
  return /^1[3-9]\d{9}$/.test(smsForm.account);
});

const handleToPage = (pageName: string) => {
  router.push({ name: pageName });
};
// 验证码倒计时
const countdown = ref(0);
const isCounting = computed(() => countdown.value > 0);

const sendSmsCode = async () => {
  try {
    await smsFormRef.value?.validateField("account");
    const code = await store.sendCode(smsForm.account);
    if (code) {
      ElMessage.success("验证码发送成功，请查收");
      countdown.value = 60;
      const timer = setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) {
          clearInterval(timer);
        }
      }, 1000);
    }
  } catch (error) {
    // 验证失败自动处理
  }
};

const login = async () => {
  try {
    if (activeTab.value === "account") {
      await accountFormRef.value?.validate();
    } else if (["email", "phone"].includes(activeTab.value)) {
      await smsFormRef.value?.validate();
    }

    await store.login(
      activeTab.value,
      activeTab.value === "account" ? accountForm.username : smsForm.account,
      activeTab.value === "account" ? accountForm.password : "",
      activeTab.value !== "account" ? smsForm.code : ""
    );

    if (storage.get("token")) {
      ElMessage.success("登录成功");
      router.push({ name: "home" });
    }
  } catch (error) {
    // 验证失败自动处理
  }
};
</script>

<style scoped>
:deep(.el-tabs__nav-wrap::after) {
  background-color: transparent;
}

:deep(.el-tabs__active-bar) {
  background-color: rgb(239 68 68);
}

:deep(.el-tabs__item) {
  @apply px-4 text-gray-500 transition-colors;
  &:hover {
    color: rgb(239 68 68);
  }
}

:deep(.el-tabs__item.is-active) {
  color: rgb(239 68 68);
  font-weight: 500;
}

:deep(.el-input__wrapper) {
  @apply !rounded-lg shadow-sm transition-all;
  &:focus-within {
    box-shadow: 0 0 0 3px rgb(239 68 68 / 10%);
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
}

.login-btn {
  background-color: rgb(239 68 68);
  &:hover {
    background-color: rgb(220 38 38);
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px rgb(239 68 68 / 20%);
  }
  &:active {
    transform: translateY(0);
  }
}

.code-btn {
  &:hover {
    color: rgb(239 68 68);
    background-color: rgb(254 226 226);
  }
}

.el-tabs + * {
  min-height: 300px;
}

@media (max-width: 768px) {
  .min-h-screen {
    padding-top: 2rem;
    align-items: flex-start;
  }

  .bg-white {
    border-radius: 1rem;
  }

  :deep(.el-tabs__item) {
    padding: 0 0.5rem;
    font-size: 0.875rem;
  }
}
/* 新增样式 */
:deep(.el-checkbox__inner) {
  @apply mt-1;
}

.el-link {
  @apply !text-xs hover:!text-red-600 transition-colors;
}
</style>
