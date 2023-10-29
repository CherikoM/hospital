<template>
  <el-skeleton v-if="loading" :rows="1" animated />
  <div v-else class="select">
    <h2>{{ props.title }}</h2>
    <div class="content">
      <div class="left">{{ props.name }}：</div>
      <ul class="tags">
        <li 
        :class="{ 'active': active === '' }"
          @click="all">全部</li>
        <li v-for="tag in tags" 
          :key="tag.value"
          @click="selectChange(tag.value)"
          :class="{ 'active': tag.value === active }"
          >
          {{ tag.name }}
        </li>
        <!-- :class="{ 'active': select.selected === tag }" -->
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Tag',
})

// import { ref, toRefs, onMounted } from 'vue'
import type { HospitalTags } from "@/api/home/type"

const props = defineProps<{
  // 组件v-model
  active: string,
  tags: HospitalTags,
  name: string,
  loading: boolean,
  title?: string,
}>()

const emit = defineEmits(["update:active", "onSelectChange"])


// 点击其他tag时
const selectChange = (value: string)=> {
  // props.active = tag.name
  emit("update:active", value)
  emit("onSelectChange", value)
}

// 点击全部时
const all = ()=> {
  emit("update:active", "")
  emit("onSelectChange", "")
}

</script>

<style lang="scss" scoped>
.select {
  color: #7f7f7f;
  font-size: 14px;
  h2 {
    font-weight: 900;
    margin: 10px 0;
    font-size: 14px;
  }
  .content {
    display: flex;
    .left {
      margin-right: 10px;
      flex: none;
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      li {
        margin-right: 15px;
        margin-bottom: 10px;
        cursor: pointer;
        &.active,
        &:hover {
          color: #55a6fe;
        }
      }
    }
  }
}
</style>