<script setup>
import {darkTheme, useOsTheme} from "naive-ui";
import Layout from './layout/index.vue'
import {naiveUiThemeOverrides} from "./assets/naive-ui-theme-overrides.js";

const osThemeRef = useOsTheme();
const theme = computed(() => osThemeRef.value === "dark" ? darkTheme : null)
/*onMounted(() => {
  window.addEventListener('keydown', preventShortcuts);
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', preventShortcuts);
})
function preventShortcuts(event) {
  // 列出需要禁用的功能键和它们的组合
  const forbiddenKeys = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'];
  const isFnKey = forbiddenKeys.includes(event.key);
  const isBrowserShortcut = (
      (event.ctrlKey || event.metaKey) &&
      (event.key === 'r' || event.key === 'f' || event.key === 'n')
  );
  console.log(event);
  if (isFnKey || isBrowserShortcut) {
    event.preventDefault();
  }
}*/

</script>

<template>
  <n-config-provider :theme="theme" :theme-overrides="naiveUiThemeOverrides" style="height: 100%;">
    <n-modal-provider>
      <n-dialog-provider>
        <n-message-provider>
          <layout/>
        </n-message-provider>
      </n-dialog-provider>
    </n-modal-provider>
  </n-config-provider>
</template>

<style>
html, body, #app {
  height: 100%;
}
body {
  border: 1px solid #aaa;
  box-sizing: border-box;
}
</style>