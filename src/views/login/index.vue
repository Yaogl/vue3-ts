<!-- 活动入口主页面 -->
<template lang="html">
  <div class="register-container">
    <div class="form-container">
      <van-cell-group>
        <van-field v-model.trim="formData.username" placeholder="请输入用户名" />
        <van-field v-model.trim="formData.password" placeholder="请输入密码" />
      </van-cell-group>
      <van-button type="default" class="submit" :loading="loading" @click="submit">立即登录</van-button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';
import { Toast } from 'vant'
import { login } from '@/api/user'
import router from '@/router'
import { userStore } from '@/store/modules/user'

export default defineComponent({
    components: [ Toast ],
    setup() {
        const formData = reactive({
            username: "",
            password: "",
        })
        const loading = ref(false)
        const submit = () => {
            if (!formData.username) {
                Toast("请输入用户名");
                return;
            }
            if (!formData.password) {
                Toast("请输入密码");
                return;
            }
            loading.value = true;
            login(formData).then((res) => {
                console.log(res, 99);
                if (res.code === -1) {
                    Toast("登录失败");
                } else {
                    userStore.setUserInfo(res.data);
                    router.push("/");
                }
                loading.value = false;
            });
        }
        return {
            formData,
            loading,
            submit
        }
    }
})
</script>
<style lang="scss">
.register-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  .form-container {
    width: 7.5rem;
    padding: 2rem 0;
    margin: 3rem auto;
    border-radius: 0.2rem;
    padding: 0.5rem;
    background: #fff;
    z-index: 2;
    position: relative;
    box-shadow: 0 0 0.5rem #ccc;
    .van-cell {
      padding: 0.5rem 0;
    }
    .van-cell:not(:last-child)::after {
      left: 0;
    }
    .submit {
      background: linear-gradient(90deg, #ff8b54, #ff6b70);
      box-shadow: 0 0 0.3rem rgba(200, 45, 45, 0.24);
      color: #fff !important;
      width: 100%;
      border-radius: 0.12rem;
    }
  }
  .van-popup {
    background-color: transparent;
  }
}
</style>