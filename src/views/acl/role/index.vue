<template>
  <el-card style="height: 80px">
    <el-form :inline="true" class="form">
      <el-form-item label="角色名称">
        <el-input placeholder="请输入角色关键字" v-model="keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="search"
          type="primary"
          size="default"
          :disabled="keyword ? false : true"
        >
          搜索
        </el-button>
        <el-button @click="reset" type="default" size="default">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0">
    <el-button @click="addRole" type="primary" size="default">
      添加角色
    </el-button>
    <el-table
      style="margin: 10px 0"
      border
      show-overflow-tooltip
      :data="allRole"
    >
      <el-table-column label="#" align="center" type="index"></el-table-column>
      <el-table-column label="id" align="center" prop="id"></el-table-column>
      <el-table-column
        label="角色名称"
        align="center"
        prop="roleName"
      ></el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
      ></el-table-column>
      <el-table-column
        label="更新时间"
        align="center"
        prop="updateTime"
      ></el-table-column>
      <el-table-column label="操作" width="300px" align="center">
        <template #="{ row }">
          <el-button
            @click="setPermisstion(row)"
            type="primary"
            size="small"
            icon="User"
          >
            分配权限
          </el-button>
          <el-button
            @click="updateRole(row)"
            type="primary"
            size="small"
            icon="Edit"
          >
            编辑
          </el-button>
          <el-popconfirm
            :title="`你确定删除${row.roleName}吗？`"
            width="260px"
            @confirm="removeRole(row.id)"
          >
            <template #reference>
              <el-button type="danger" size="small" icon="Delete">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器组件 -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :background="true"
      layout=" prev, pager, next, jumper, -> ,sizes, total"
      :total="total"
      @current-change="getHasRole"
      @size-change="handler"
    />
    <!-- 添加与更新已有角色：对话框 -->
    <el-dialog
      v-model="dialogVisite"
      :title="RoleParams.id ? '更新角色' : '添加角色'"
    >
      <el-form :model="RoleParams" :rules="rules" ref="form">
        <el-form-item label="角色名称" prop="roleName">
          <el-input
            placeholder="请输入角色名称"
            v-model="RoleParams.roleName"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisite = false" type="default" size="default">
          取消
        </el-button>
        <el-button @click="save" type="primary" size="default">确定</el-button>
      </template>
    </el-dialog>
    <!-- 抽屉结构：分配角色菜单与按钮权限 -->
    <el-drawer v-model="drawer">
      <template #header>
        <h4>分配权限</h4>
      </template>
      <template #default>
        <!-- 树形控件 -->
        <el-tree
          ref="tree"
          :data="menuArr"
          show-checkbox
          node-key="id"
          default-expand-all
          :default-checked-keys="selectArr"
          :props="defaultProps"
        />
      </template>
      <template #footer>
        <div style="display: flex:auto;">
          <el-button @click="drawer = false" type="default" size="default">
            取消
          </el-button>
          <el-button @click="confirm" type="primary" size="default">
            确定
          </el-button>
        </div>
      </template>
    </el-drawer>
  </el-card>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting'
import { ref, onMounted, reactive, nextTick } from 'vue'
//请求方法
import {
  reqAllRoleList,
  reqAddOrUpdateRole,
  reqAllMenuList,
  reqSetPermisstion,
  reqRemoveRole,
} from '@/api/acl/role'
import type {
  RoleResponseData,
  Records,
  RoleData,
  MenuResponseData,
  MenuList,
} from '@/api/acl/role/type'
import { ElMessage } from 'element-plus'
//分页器当前页码
let pageNo = ref<number>(1)
//每页展示几条数据
let pageSize = ref<number>(10)
//角色总个数
let total = ref<number>(0)
//定义响应式数据：收集用户输入进来的关键字
let keyword = ref<string>('')
//存储全部角色的数组
let allRole = ref<Records>([])
//获取模板setting仓库
let settingStore = useLayOutSettingStore()
//控制对话框的显示与隐藏
let dialogVisite = ref<boolean>(false)
//收集新增角色数据
let RoleParams = reactive<RoleData>({
  roleName: '',
})
//获取form组件实例
let form = ref<any>()
//控制抽屉显示与隐藏
let drawer = ref<boolean>(false)
//存储权限数据
let menuArr = ref<MenuList>([])
//准备一个数组：存储勾选节点的ID(四级)
let selectArr = ref<number[]>([])
//获取tree组件实例
let tree = ref<any>()
//获取全部角色信息
const getHasRole = async (pager = 1) => {
  //收集当前页码
  pageNo.value = pager
  let result: RoleResponseData = await reqAllRoleList(
    pageNo.value,
    pageSize.value,
    keyword.value,
  )
  if (result.code == 200) {
    total.value = result.data.total
    allRole.value = result.data.records
  }
}
//分页器下拉菜单自定义回调
const handler = () => {
  getHasRole()
}
//搜索按钮回调
const search = () => {
  //根据关键字获取相应的用户数据
  getHasRole()
  //清空关键字
  keyword.value = ''
}
//重置按钮回调
const reset = () => {
  settingStore.refsh = !settingStore.refsh
}
//添加角色按钮回调
const addRole = () => {
  //显示对话框
  dialogVisite.value = true
  //清空数据
  Object.assign(RoleParams, {
    roleName: '',
    id: 0,
  })
  //清空上次表单校验结果
  nextTick(() => {
    form.value.clearValidate('roleName')
  })
}
//更新角色按钮回调
const updateRole = (row: RoleData) => {
  //显示对话框
  dialogVisite.value = true
  //存储已有职位--带有ID
  Object.assign(RoleParams, row)
  //清空上次表单校验结果
  nextTick(() => {
    form.value.clearValidate('roleName')
  })
}
//角色名称校验规则
const validatorRoleName = (value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('角色名称至少两位'))
  }
}
//角色校验规则
const rules = {
  roleName: [
    {
      required: true,
      trigger: 'blur',
      validator: validatorRoleName,
    },
  ],
}
//添加角色对话框确定按钮回调
const save = async () => {
  //表单校验结果，通过再发请求
  await form.value.validate()
  //添加或更新角色请求
  let result: any = await reqAddOrUpdateRole(RoleParams)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: RoleParams.id ? '更新角色成功' : '添加角色成功',
    })
    dialogVisite.value = false
    getHasRole(RoleParams.id ? pageNo.value : 1)
  } else {
    ElMessage({
      type: 'error',
      message: RoleParams.id ? '更新角色失败' : '添加角色失败',
    })
  }
}
//分配权限按钮回调
const setPermisstion = async (row: RoleData) => {
  //显示抽屉
  drawer.value = true
  //收集当前要分配权限的角色数据
  Object.assign(RoleParams, row)
  //根据角色获取权限数据
  let result: MenuResponseData = await reqAllMenuList(RoleParams.id as number)
  if (result.code == 200) {
    menuArr.value = result.data
    selectArr.value = filterSelectArr(menuArr.value, [])
  }
}
//树形结构数据
const defaultProps = {
  children: 'children',
  label: 'name',
}

const filterSelectArr = (allData: any, initArr: any) => {
  allData.forEach((item: any) => {
    if (item.select && item.level == 4) {
      initArr.push(item.id)
    }
    if (item.children && item.children.length > 0) {
      filterSelectArr(item.children, initArr)
    }
  })
  return initArr
}
//抽屉确定按钮的回调
const confirm = async () => {
  //角色ID
  const roleId = RoleParams.id as number
  //选中节点的ID
  let arr = tree.value.getCheckedKeys()
  //半选的ID
  let arr1 = tree.value.getHalfCheckedKeys()
  let permisstionId = arr.concat(arr1)
  //下发权限
  let result: any = await reqSetPermisstion(roleId, permisstionId)
  if (result.code == 200) {
    drawer.value = false
    ElMessage({
      type: 'success',
      message: '分配权限成功',
    })
    window.location.reload()
  } else {
    ElMessage({
      type: 'error',
      message: '分配权限失败',
    })
  }
}
//删除角色按钮回调
const removeRole = async (id: number) => {
  let result: any = await reqRemoveRole(id)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getHasRole(allRole.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
//组件挂载发请求
onMounted(() => {
  getHasRole()
})
</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
