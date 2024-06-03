<script setup>
import {ref} from 'vue'
import mdEditorV3 from './components/editor/index.vue'

import {darkTheme, useOsTheme} from "naive-ui";
import {getCurrent} from "@tauri-apps/api/window";
import {ask} from '@tauri-apps/api/dialog';

const text = ref('\n\n\n\n')
const onSave = ({md, html}) => {
  console.log(md, html)
  text.value = md
}

onMounted(async () => {
  await getCurrent().onCloseRequested(async (event) => {
    const asked = await ask('是否关闭?',
        {
          cancelLabel: '等下，我还没保存',
          okLabel: '毁灭吧，我累了',
          type: 'warning'
        }
    );
    if (!asked) {
      event.preventDefault();
    }
  });
})

const osThemeRef = useOsTheme();
const theme = computed(() => osThemeRef.value === "dark" ? darkTheme : null)
</script>

<template>
  <n-config-provider :theme="theme" style="height: 100%;">
    <n-modal-provider>
      <n-dialog-provider>
        <n-message-provider>
          <div class="container">
            <md-editor-v3
                :text="text"
                style="height: 100%;"
                @onSave="onSave"
            />
          </div>
        </n-message-provider>
      </n-dialog-provider>
    </n-modal-provider>
  </n-config-provider>
</template>

<style>
html, body, #app,
.container {
  height: 100%;
}
</style>