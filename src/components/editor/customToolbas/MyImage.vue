<script setup>
import { DropdownToolbar } from 'md-editor-v3'
import { ref } from 'vue'
import {Icon} from "@iconify/vue";

const visible = ref(false)
const onChange = () => {
  visible.value = !visible.value
}
let photo = ref({
  text: '图片',
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

// ![图片](https://imzbf.github.io/md-editor-rt/imgs/mark_emoji.gif)

const addPhoto = () => {
  props.insert(() => {
    return {
      targetValue: `\n![${photo.value.text}](${photo.value.url} "${photo.value.title}")\n`,
      select: true,
      deviationStart: 0,
      deviationEnd: 0
    }
  })
  resetPhoto()
}
const resetPhoto = () => {
  photo.value.text = '图片'
  photo.value.url = ''
  photo.value.title = ''
}

</script>

<template>
  <DropdownToolbar :onChange="onChange" :visible="visible" title="插入图片">
    <template #overlay>
      <n-card
          embedded
          size="small"
      >
        <n-form
            :model="photo"
            :show-feedback="false"
            label-placement="left"
            size="small"
        >
          <n-form-item label="显示内容:">
            <n-input v-model:value.trim="photo.text" clearable placeholder="画面上显示"
                     @change="photo.title = photo.text.trim()" />
          </n-form-item>
          <n-form-item label="提示内容:" style="margin: 5px 0 0;">
            <n-input v-model:value.trim="photo.title" placeholder="图片加载失败时显示" />
          </n-form-item>
          <n-form-item label="链接地址:" style="margin: 5px 0 8px;">
            <n-input v-model:value.trim="photo.url" clearable placeholder="图片地址" />
          </n-form-item>
          <n-form-item style="float: right;">
            <n-space>
              <n-button attr-type="button" type="primary" @click="addPhoto">
                添加
              </n-button>
              <n-button attr-type="button" @click="resetPhoto">
                重置
              </n-button>
            </n-space>
          </n-form-item>
        </n-form>
      </n-card>
    </template>
    <template #trigger>
      <Icon icon="tabler:photo-plus" class="md-editor-icon"></Icon>
      <div class="md-editor-toolbar-item-name">图片</div>
    </template>
  </DropdownToolbar>
</template>

<style scoped>

</style>