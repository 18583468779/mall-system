<template>
    <div class="login">
        <img class="pic" :src="ImgUtil.getImg('userinfo.png')" />
        <div class="username">
            <input type="text" v-model="username" class="username-input" name="username" placeholder="昵称、手机号、邮箱" />
        </div>
        <div class="psw">
            <input type="password" v-model="password" name="password" class="psw-input" placeholder="密码" />
        </div>
        <div class="loginbtn" @click="login">登录</div>
    </div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue';
import { ImgUtil } from '../../utils/imgUtil';
import userStore from '../../piniaStore/userInfo/index'
import storage from '../../utils/goodStorageUtil';
import { useRouter } from 'vue-router';
const router = useRouter()
const { username, password } = toRefs(reactive({
    username: '',
    password: ''
}));

const login = async () => {
    await userStore().login(username.value, password.value);
    if (storage.get('token')) {
        router.push({ name: 'ctgy' })
    }
}
</script>

<style scoped lang="scss">
.login {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.15rem;


    .username,
    .psw {
        width: 4.23rem;
        height: 0.94rem;
        line-height: 0.94rem;
        background-color: #f6f6f6;
        border-radius: 1rem;

        &-input {
            margin-left: 0.3rem;
            width: 85%;
            height: 60%;
            background: none;
            border: none;
        }
    }

    .loginbtn {
        background-color: rgb(206, 124, 124);
        border-radius: 1rem;
        width: 4.23rem;
        height: 0.94rem;
        line-height: 0.94rem;
        text-align: center;
        color: #fff;
        font-size: 0.25rem;
        box-sizing: 0rem 0rem 0.1rem rgb(206, 124, 124);
    }

}
</style>