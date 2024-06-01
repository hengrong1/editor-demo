<script setup>
import { DropdownToolbar } from 'md-editor-v3'
import { ref } from 'vue'
import {Icon} from "@iconify/vue";

const visible = ref(false)
const onChange = () => {
  visible.value = !visible.value
}
let link = ref({
  text: '链接',
  url: '',
  title: ''
})
const props = defineProps({
  insert: {
    type: Function,
    default: () => {
    }
  }
})

const addLink = () => {
  console.log('添加链接')
  props.insert(() => {
    return {
      targetValue: `[${link.value.text}](${link.value.url} "${link.value.title}")`,
      select: true,
      deviationStart: 0,
      deviationEnd: 0
    }
  })
  resetLink()
}
const resetLink = () => {
  console.log('resetLink')
  link.value.text = '链接'
  link.value.url = ''
  link.value.title = ''
}

</script>

<template>
  <DropdownToolbar :onChange="onChange" :visible="visible" title="插入链接">
    <template #overlay>
      <n-card
        embedded
        size="small"
      >
        <n-form
          :model="link"
          :show-feedback="false"
          label-placement="left"
          size="small"
        >
          <n-form-item label="显示内容:">
            <n-input v-model:value.trim="link.text" clearable placeholder="画面上显示"
                     @change="link.title = link.text.trim()" />
          </n-form-item>
          <n-form-item label="提示内容:" style="margin: 5px 0 0;">
            <n-input v-model:value.trim="link.title" placeholder="鼠标悬停时显示" />
          </n-form-item>
          <n-form-item label="链接地址:" style="margin: 5px 0 8px;">
            <n-input v-model:value.trim="link.url" clearable placeholder="链接地址" />
          </n-form-item>
          <n-form-item style="float: right;">
            <n-space>
              <n-button attr-type="button" type="primary" @click="addLink">
                添加
              </n-button>
              <n-button attr-type="button" @click="resetLink">
                重置
              </n-button>
            </n-space>
          </n-form-item>
        </n-form>
      </n-card>
    </template>
    <template #trigger>
      <Icon icon="tabler:link-plus" class="md-editor-icon"></Icon>
      <div class="md-editor-toolbar-item-name">链接</div>
    </template>
  </DropdownToolbar>
</template>

<style scoped>

</style>