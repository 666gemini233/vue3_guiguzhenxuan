<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类" size="normal">
        <el-select
          :disabled="scene == 0 ? false : true"
          v-model="categoryStore.c1Id"
          @change="handler"
        >
          <!-- option:label即为文字显示 value属性即为select菜单收集的数据 -->
          <el-option
            v-for="(c1, index) in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" size="normal">
        <el-select
          :disabled="scene == 0 ? false : true"
          v-model="categoryStore.c2Id"
          @change="handler1"
        >
          <el-option
            v-for="(c2, index) in categoryStore.c2Arr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类" size="normal">
        <el-select
          :disabled="scene == 0 ? false : true"
          v-model="categoryStore.c3Id"
        >
          <el-option
            v-for="(c3, index) in categoryStore.c3Arr"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
//引入组件挂载完毕方法
import { onMounted } from 'vue'
//引入分类相关仓库
import useCategoryStore from '@/store/modules/category'
let categoryStore = useCategoryStore()
//分类全局组件挂载完毕，通知仓库发请求获取一级分类数据
onMounted(() => {
  getC1()
})

//通知仓库获取一级分类的方法
const getC1 = () => {
  //通知分类仓库发请求获取一级分类数据
  categoryStore.getC1()
}

//一级分类下拉菜单的change事件（选中值的时候触发，保证c1Id有了）
const handler = () => {
  //需要将二级、三级分类数据清除
  categoryStore.c2Id = ''
  categoryStore.c3Arr = []
  categoryStore.c3Id = ''
  //通知仓库获取二级分类数据
  categoryStore.getC2()
}

//二级分类下拉菜单的change事件（选中值的时候触发，保证c2Id有了）
const handler1 = () => {
  //需要将三级分类数据清除
  categoryStore.c3Id = ''
  //通知仓库获取三级分类数据
  categoryStore.getC3()
}

//接收父级组件传递过来的scene
defineProps(['scene'])
</script>

<style scoped></style>
