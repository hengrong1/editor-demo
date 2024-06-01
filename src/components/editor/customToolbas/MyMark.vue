<script setup>
import { NormalToolbar } from 'md-editor-v3'
import {Icon} from "@iconify/vue";
const props = defineProps({
  insert: {
    type: Function,
    default: () => {
      //
    }
  }
});
const addMark = () => {
  props.insert((selectedText) => {
    return {
      targetValue: `==${selectedText}==`,
      select: true,
      deviationStart: 0,
      deviationEnd: 0
    };
  });
};

</script>

<template>
  <NormalToolbar title="标记" @onClick="addMark">
    <template #trigger>
      <!--<svg aria-hidden="true" class="md-editor-icon">-->
      <!--  <use xlink:href="#icon-mark"></use>-->
      <!--</svg>-->
      <icon icon="tabler:ballpen" class=" md-editor-icon" ></icon>
      <div class="md-editor-toolbar-item-name">标记</div>
    </template>
  </NormalToolbar>
</template>

<style scoped>

</style>