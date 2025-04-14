<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#79BBFF] to-[#4a4aff]">
    <div class="w-[388px] bg-white rounded-2xl p-8 shadow-lg">
      <!-- 标题 -->
      <h2 class="text-2xl font-bold text-center mb-8 text-gray-800">
        {{ isLogin ? '欢迎登录' : '用户注册' }}
      </h2>

      <!-- 登录/注册切换 -->
      <div class="flex justify-center mb-8">
        <el-radio-group v-model="isLogin">
          <el-radio-button :label="true">登录</el-radio-button>
          <el-radio-button :label="false">注册</el-radio-button>
        </el-radio-group>
      </div>

      <!-- 表单 -->
      <el-form :model="form" :rules="rules" ref="formRef">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" prefix-icon="User" size="large" class="mb-6" />
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" prefix-icon="Lock" size="large"
            show-password class="mb-6" />
        </el-form-item>

        <!-- 确认密码（注册时显示） -->
        <el-form-item v-if="!isLogin" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" type="password" placeholder="请确认密码" prefix-icon="Lock" size="large"
            show-password class="mb-6" />
        </el-form-item>

        <!-- 提交按钮 -->
        <el-button type="primary" size="large" class="w-full mt-2" @click="handleSubmit">
          {{ isLogin ? '立即登录' : '立即注册' }}
        </el-button>
      </el-form>

      <!-- 辅助功能 -->
      <div class="mt-6 flex justify-between text-sm">
        <el-link type="info" :underline="false">忘记密码?</el-link>
        <div>
          <span class="text-gray-500">{{ isLogin ? '没有账号？' : '已有账号？' }}</span>
          <el-link type="primary" @click="isLogin = !isLogin">
            {{ isLogin ? '立即注册' : '立即登录' }}
          </el-link>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import userApi from '../api/UserApi';
import router from '../router';

export interface UserInfo {
  username: string
  password: string
  confirmPassword?: string
}

const isLogin = ref(true)
const formRef = ref<FormInstance>()
const form = reactive<UserInfo>({
  username: '',
  password: '',
  confirmPassword: ''
})

const validateConfirmPassword = (_: any, value: string, callback: any) => {
  if (!isLogin.value && value !== form.password) {
    callback(new Error('两次密码输入不一致'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<UserInfo>>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 4, max: 16, message: '长度在4到16个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 16, message: '长度在6到16个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ]
})

const handleSubmit = async () => {
  await formRef.value?.validate()
  // 这里处理提交逻辑
  if (isLogin.value) {

    let res: any = await userApi.login(form);
    if (res.code === 200 && res.data) {
      ElMessage.success('登录成功');
      router.push('/');
    }
  } else {

    let res: any = await userApi.register(form);
    if (res.code === 200 && res.data.data === 1) {
      ElMessage.success(res.data.message);
      isLogin.value = true;
      form.username = '';
      form.password = '';
      form.confirmPassword = '';
    }
    else {
      ElMessage.error(res.data.message);
    }
  }


}
</script>

<style scoped></style>
