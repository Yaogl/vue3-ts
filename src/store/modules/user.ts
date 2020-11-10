import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';

interface UserType {
  username: string;
  realname: string;
}

@Module
export default class User extends VuexModule {
  // state
  userInfo: UserType = {} as UserType
  get getUserInfo(): UserType {
    return this.userInfo
  }

  @Mutation
  muSetUserInfo(userInfo: UserType): void {
    this.userInfo = userInfo
  }
  @Mutation
  muLoginOut (): void {
    this.userInfo = {} as UserType
  }
  @Action
  setUserInfo(userInfo: UserType): void {
    this.muSetUserInfo(userInfo)
  }
}