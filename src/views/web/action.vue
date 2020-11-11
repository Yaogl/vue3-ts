<!-- home -->
<template>
  <div class="index-container">
    <div class="warpper">
      <h1 class="demo-home__title"><img src="https://imgs.solui.cn/weapp/logo.png" /><span>题库1.0</span></h1>
      <h2 class="demo-home__desc">
        一个简单的做题软件
      </h2>
    </div>
    <div class="content" v-if="!isBegin">
      <van-button type="primary" :loading="loading" style="margin: 200px auto;" @click="getQuestionList">开始答题</van-button>
      <!-- <van-button type="primary" :loading="loading" style="margin: 200px auto;" @click="getQuestionList">随机出题</van-button> -->
      
    </div>
    <div class="question" v-if="isBegin">
      <p class="title">{{ curIndex + 1 }}、{{ questionList[curIndex].content }}</p>
      <van-checkbox-group v-model="answers">
        <van-checkbox v-for="(item, index) in questionList[curIndex].answers" :name="item.title" :key="index">{{ item.content }}</van-checkbox>
      </van-checkbox-group>
      <van-button type="primary" @click="submit">提交</van-button>
    </div>
    <audio id="audio" autoplay/>
    <!-- <van-cell icon="success" v-for="item in list" :key="item" :title="item" /> -->
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, computed } from 'vue'
import { Toast } from 'vant'
import { getList } from '@/api/user'
import { useStore } from 'vuex'

export default defineComponent({
    setup () {
        const store = useStore()
      // console.log(useStore().dispatch('setUserInfo', { name: 'zhangsan', realname: 'zhangsan' }));
        const curIndex = computed(() => {
          return store.getters.getCurIndex
        })
        const questionList = computed(() => {
          return store.getters.getQuestion
        })

        const isBegin = computed(() => {
          return store.getters.getIsBegin
        })

        const actionData = reactive({
            loading: false,
            answers: [],
            audio: ''
        })
        const getQuestionList = () => {
            actionData.loading = true
            getList({ page: 1, size: 1000 }).then(res => {
                actionData.loading = false
                if (res.code === 0) {
                store.commit('muSetQuestionList', res.data.data)
                if (res.data.data.length) {
                    questionList.value.map(item => {
                        item.rightkeys = JSON.parse(item.rightkeys)
                        item.answers = JSON.parse(item.answers)
                    })
                }
                store.commit('muSetIsBegin', true)
                store.commit('muSetCurIndex', 0)
                if (!questionList.value.length) {
                    store.commit('muSetIsBegin', false)
                    Toast('题库中没有问题，请录入后再在作答')
                }
                }
            })
        }
        const playAudio = (right) => {
            const num = right ? 15 : 4
            const publicLink = right ? 'right/right' : 'wrong/wrong'
            const ins = Math.floor(Math.random() * num) + 1
            actionData.audio = require('@/assets/' + publicLink + ins + '.mp3')
            const doc = document.getElementById('audio')
            doc.src = actionData.audio
            doc.load()
        }
        const submit = () => {
            const cur = questionList.value[curIndex.value]
            if (JSON.stringify(actionData.answers) === JSON.stringify(cur.rightkeys)) {
                playAudio(true) // 正确
                actionData.answers = []
                store.commit('muSetCurIndex', curIndex.value + 1)
                if (curIndex.value === questionList.value.length) {
                  store.commit('muSetCurIndex', 0)
                }
            } else {
                playAudio(false) // 错误的
                Toast('请重新选择')
                actionData.answers = []
            }
        }
        

        return {
            submit,
            playAudio,
            getQuestionList,
            curIndex,
            isBegin,
            questionList,
            ...toRefs(actionData)
        }
    }
})

</script>
<style lang="scss">
.index-container {
  .warpper {
    padding: 12px;
    background: #fff;
    .demo-home__title {
      margin: 0 0 6px;
      font-size: 32px;
      .demo-home__title img,
      .demo-home__title span {
        display: inline-block;
        vertical-align: middle;
      }
      img {
        width: 32px;
      }
      span {
        margin-left: 16px;
        font-weight: 500;
      }
    }
    .demo-home__desc {
      margin: 0 0 20px;
      color: rgba(69, 90, 100, 0.6);
      font-size: 14px;
    }
  }
  .content{
    text-align: center;
  }
  .question{
    .title{
      font-size: 0.5rem;
    }
    background: #fff;
    padding: 0.5rem;
    .van-checkbox{
      padding: 0.23rem 0;
     .van-checkbox__label{
       font-size: 0.5rem!important;
      }
    }
    
  }
}
</style>