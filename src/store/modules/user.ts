import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';
interface UserType {
  username: string;
  realname: string;
}

@Module({ name: 'user', dynamic: true, namespaced: true, store })
class User extends VuexModule {
  // state
  userInfo: UserType = {} as UserType
  get getUserInfo(): UserType {
    return this.userInfo
  }

  @Mutation
  muSetUserInfo(userInfo: UserType): void {
    this.userInfo = userInfo
  }

  @Action
  setUserInfo(userInfo: UserType): void {
    this.muSetUserInfo(userInfo)
  }
}
export { User };
export const userStore = getModule<User>(User);