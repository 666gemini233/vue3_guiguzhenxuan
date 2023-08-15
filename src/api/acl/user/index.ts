//用户管理模块接口
import request from '@/utils/request'
import type {
  UserResponseData,
  User,
  AllRoleResponseData,
  SetRoleData,
} from './type'
//枚举地址
enum API {
  //获取全部已有用户账号信息
  ALLUSER_URL = 'http://114.115.179.162:8022/prod-api/admin/acl/user/',
  //添加一个新用户的账号
  ADDUSER_URL = 'http://114.115.179.162:8022/prod-api/admin/acl/user/save/',
  //更新已有用户账号信息
  UPDATEUSER_URL = 'http://114.115.179.162:8022/prod-api/admin/acl/user/update/',
  //获取全部职位，当前账号拥有的职位接口
  ALLROLE_URL = 'http://114.115.179.162:8022/prod-api/admin/acl/user/toAssign/',
  //给已有用户分配角色接口
  SETROLE_URL = 'http://114.115.179.162:8022/prod-api/admin/acl/user/doAssignRole',
}
//获取用户账号信息的接口
export const reqUserInfo = (page: number, limit: number) =>
  request.get<any, UserResponseData>(API.ALLUSER_URL + `${page}/${limit}`)
//添加|更新用户信息接口
export const reqAddOrUpdateUser = (data: User) => {
  if (data.id) {
    //有id为更新
    return request.put<any, any>(API.UPDATEUSER_URL, data)
  } else {
    return request.post<any, any>(API.ADDUSER_URL, data)
  }
}
//获取全部职位以及包含当前账号拥有的职位接口
export const reqAllRole = (userId: number) =>
  request.get<any, AllRoleResponseData>(API.ALLROLE_URL + userId)
//给已有用户分配角色接口
export const reqSetUserRole = (data: SetRoleData) =>
  request.post<any, any>(API.SETROLE_URL, data)
