<script lang="ts" setup>
import {DropdownToolbar} from "md-editor-v3";
import {Icon} from "@iconify/vue";
import {ref} from "vue";

const visible = ref(false)
const onChange = () => {
  visible.value = !visible.value
}
/*const props = defineProps({
  insert: {
    type: Function,
    default: () => {}
  }
});
const emojiList = [
  {
    name: 'emoji',
    icon: 'emoji-smile',
    items: [
      {
        name: 'smile',
        icon: 'emoji-smile',
        value: ':smile:'
      },
      {
        name: 'laugh',
        icon: 'emoji-laugh',
        value: ':laugh:'
      },
      {
        name: 'wink',
        icon: 'emoji-wink',
      }]
  }
]
const handler = (emoji) => {
  props.insert(() => {
    return {
      targetValue: `:${emoji}:`,
      select: true,
      deviationStart: 0,
      deviationEnd: 0
    };
  });
};*/

</script>

<template>
  <DropdownToolbar :onChange="onChange" :visible="visible" title="插入图片">
    <template #overlay>
      <div class="md-editor-emoji-list">

      </div>
    </template>
    <template #trigger>
      <Icon class="md-editor-icon" icon="tabler:mood-plus"></Icon>
      <div class="md-editor-toolbar-item-name">表情</div>
    </template>
  </DropdownToolbar>
</template>

<style scoped>

</style>