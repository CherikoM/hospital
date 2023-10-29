<template>
  <div class="client">
    <div class="top">
      <div class="left">
        <div class="free">
          {{ props.client.isInsure==1? "医保": "自费" }}
        </div>
        <div class="name">{{ props.client.name }}</div>
      </div>
      <div class="right">
        <el-button circle type="primary" :icon="Edit" @click="emits('edit')"></el-button>
        <el-popconfirm :title="`确定要删除${client.name}吗`" width="200" @confirm="removeUser(client.id as number)">
          <template #reference>
            <el-button v-if="canDelete" circle type="danger" :icon="Delete"></el-button>
          </template>
        </el-popconfirm>
      </div>
    </div>
    <div class="bottom">
      <p>证件类型：{{ client.param.certificatesTypeString }}</p>
      <p>证件号码：{{ client.certificatesNo }}</p>
      <p>用户姓别：{{ client.sex==0? "女": "男" }}</p>
      <p>出生日期：{{ client.birthdate }}</p>
      <p>手机号码：{{ client.phone }}</p>
      <p>婚姻状况：{{ client.isMarry==0? "未婚": "已婚" }}</p>
      <p>当前住址：{{ client.param.cityString }}</p>
      <p>详细住址：{{ client.param.fullAddress }}</p>

      <transition name="selected">
        <!-- “已选择”提示 -->
        <div v-show="choose" class="selected">
          已选择
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Client',
})

import { Edit, Delete } from "@element-plus/icons-vue"
import { ElMessage } from "element-plus"

import { reqDeleteUserClient } from "@/api/user"
import { UserClient } from "@/api/user/type"

const props = defineProps<{
  client: UserClient,
  canDelete?: boolean,
  choose?: boolean
}>()
const emits = defineEmits(['edit', "delete"])

// 删除用户
const removeUser = async (id: number)=> {
  const result = await reqDeleteUserClient(id)
  if(result.code === 200) {
    ElMessage.success("删除成功！")
    emits("delete")
  } else {
    ElMessage.error(result.message)
  }
}
</script>

<style scoped lang="scss">
.client {
  box-shadow: 0px 0px 12px rgba(0,0,0,.12);
  cursor: pointer;
  .top {
    height: 60px;
    background-color: #e5e5e5;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      font-size: 14px;
      .free {
        background-color: white;
        padding: 5px;
        font-size: 12px;
        margin-right: 5px;
        border-radius: 5px;
      }
    }
  }
  .bottom {
    padding: 10px 15px;
    font-size: 14px;
    line-height: 30px;
    position: relative;

    .selected {
      position: absolute;
      width: 200px;
      height: 200px;
      color: red;
      font-size: 20px;
      border-radius: 50%;
      border: 1px dashed red;
      text-align: center;
      line-height: 200px;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      opacity: 0.3;
      transform: rotate(30deg);
    }

    .selected-enter-from {
      transform: rotate(30deg) scale(1);
    }

    .selected-enter-active {
      transition: all .05s;
    }

    .selected-enter-to {
      transform: rotate(30deg) scale(1.1);
    }
  }
}
</style>