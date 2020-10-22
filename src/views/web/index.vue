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
    <audio id="audio" :src="audio" autoplay/>
    <!-- <van-cell icon="success" v-for="item in list" :key="item" :title="item" /> -->
  </div>
</template>

<script>
import { Toast } from 'vant'
import { getList } from '@/api/user'
export default {
  data() {
    return {
      questionList: [],
      curIndex: 0,
      loading: false,
      isBegin: false,
      answers: [],
      rightSong: [require('@/assets/right/right1.mp3'), require('@/assets/right/right2.mp3')],
      wrongSong: [require('@/assets/wrong/wrong1.mp3'), require('@/assets/wrong/wrong2.aac')],
      audio: ''
    }
  },
  methods: {
    getQuestionList() {
      this.loading = true
      getList({ page: 1, size: 1000 }).then(res => {
        this.loading = false
        console.log(res);
        if (res.code === 0) {
          this.questionList = res.data.data
          if (this.questionList.length) {
            this.questionList.map(item => {
              item.rightkeys = JSON.parse(item.rightkeys)
              item.answers = JSON.parse(item.answers)
            })
          }
          this.isBegin = true
          this.curIndex = 0
          if (!this.questionList.length) {
            this.isBegin = false
            Toast('题库中没有问题，请录入后再在作答')
          }
        }
      })
    },
    submit() {
      const cur = this.questionList[this.curIndex]
      if (JSON.stringify(this.answers) === JSON.stringify(cur.rightkeys)) {
        this.palyAudio(true) // 正确
        this.answers = []
        this.curIndex++ 
        if (this.curIndex === this.questionList.length) {
          this.curIndex = 0
        }
      } else {
        this.palyAudio(false) // 错误的
        Toast('请重新选择')
        this.answers = []
      }
    },
    palyAudio(right) {
      const list = right ? this.rightSong : this.wrongSong
      const ins = Math.floor(Math.random() * 2)
      this.audio = list[ins]
      const doc = document.getElementById('audio')
      doc.load()
    }
  }
}
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