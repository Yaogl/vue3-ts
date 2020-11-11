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
  isBegin = false
  get getQuestion(): ListQ {
    return this.questionList
  }
  get getCurIndex(): number {
    return this.curIndex
  }
  get getIsBegin(): boolean {
    return this.isBegin
  }
  @Mutation
  muSetQuestionList(list: ListQ): void {
    this.questionList = list
  }
  @Mutation
  muSetCurIndex(index: number): void {
    this.curIndex = index
  }
  @Mutation
  muSetIsBegin(boo: boolean): void {
    this.isBegin = boo
  }
}