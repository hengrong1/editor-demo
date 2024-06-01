<script setup>
import { DropdownToolbar } from 'md-editor-v3'
import { ref } from 'vue'
import {Icon} from "@iconify/vue";

const visible = ref(false)
const onChange = () => {
  visible.value = !visible.value
}

let media = ref({
  text: '视频',
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
// @[video](/test.mp4)
// @[audio](/test.mp3)

const addMedia = () => {
  props.insert(() => {
    return {
      targetValue: `\n@[${mediaType.value}](${media.value.url})\n`,
      select: true,
      deviationStart: 0,
      deviationEnd: 0
    }
  })
  resetMedia()
}

// Process @[youtube](youtubeVideoID)
// Process @[vimeo](vimeoVideoID)
// Process @[vine](vineVideoID)
// Process @[prezi](preziID)
// Process @[osf](guid)
// Process @[bilibili](bvid/avid)
// Process @[video](link to media file)
// Process @[audio](link to media file)
const mediaTypes = [
  // {
  //   label: '油管',
  //   value: 'youtube'
  // },
  {
    label: 'B站',
    value: 'bilibili'
  },
  {
    label: '视频',
    value: 'video'
  },
  {
    label: '音乐',
    value: 'audio'
  },
]
const mediaType = ref('video')
const resetMedia = () => {
  media.value.text = '视频'
  media.value.url = ''
  media.value.title = ''
  mediaType.value = 'video'
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
            :model="media"
            :show-feedback="false"
            label-placement="left"
            size="small"
        >
          <!--<n-form-item label="显示内容:">
            <n-input v-model:value.trim="media.text" clearable placeholder="画面上显示"
                     @change="media.title = media.text.trim()" />
          </n-form-item>-->
          <n-form-item label="媒体类型:" style="margin: 5px 0 0;">
            <n-radio-group v-model:value="mediaType" name="mediaType">
              <n-radio-button
                  v-for="mediaType in mediaTypes"
                  :key="mediaType.value"
                  :value="mediaType.value"
                  :label="mediaType.label"
                  size="small"
              />
            </n-radio-group>
          </n-form-item>
          <n-form-item label="链接地址:" style="margin: 5px 0 8px;">
            <n-input v-model:value.trim="media.url" clearable placeholder="链接地址" />
          </n-form-item>
          <n-form-item style="float: right;">
            <n-space>
              <n-button attr-type="button" type="primary" @click="addMedia">
                添加
              </n-button>
              <n-button attr-type="button" @click="resetMedia">
                重置
              </n-button>
            </n-space>
          </n-form-item>
        </n-form>
      </n-card>
    </template>
    <template #trigger>
      <Icon icon="tabler:video-plus" class="md-editor-icon"></Icon>
      <div class="md-editor-toolbar-item-name">媒体</div>
    </template>
  </DropdownToolbar>
</template>

<style scoped>

</style>