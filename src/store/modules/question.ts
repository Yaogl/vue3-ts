import { Module, VuexModule, Mutation } from 'vuex-module-decorators';

interface QuestionItem {
    answers: string;
    author: string;
    content: string;
    createtime: number;
    id: number;
    rightkeys: string;
}
type ListQ = Array<QuestionItem>

@Module
export default class Question extends VuexModule {
  // state
  questionList: ListQ = []
  curIndex = 0
  get getQuestion(): ListQ {
    return this.questionList
  }

  @Mutation
  muSetQuestionList(list: ListQ): void {
    this.questionList = list
  }
  @Mutation
  muSetCurIndex(index: number): void {
    this.curIndex = index
  }
}