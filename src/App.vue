<script setup>
import {ref} from 'vue'
import mdEditorV3 from './components/editor/index.vue'

import {darkTheme, useOsTheme} from "naive-ui";
import {getCurrent} from "@tauri-apps/api/window";
import {confirm} from '@tauri-apps/api/dialog';

const text = ref('\n\n\n\n')
const onSave = ({md, html}) => {
  console.log(md, html)
  text.value = md
}

onMounted(async () => {
  await getCurrent().onCloseRequested(async (event) => {
    const confirmed = await confirm('是否关闭?',
        {
          cancelLabel: '等下，我还没保存',
          okLabel: '毁灭吧，我累了',
          type: 'warning'
        }
    );
    if (!confirmed) {
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
            <div class="titlebar" data-tauri-drag-region>
              <div id="titlebar-minimize" class="titlebar-button">
                <img
                    alt="minimize"
                    src="https://api.iconify.design/mdi:window-minimize.svg"
                />
              </div>
              <div id="titlebar-maximize" class="titlebar-button">
                <img
                    alt="maximize"
                    src="https://api.iconify.design/mdi:window-maximize.svg"
                />
              </div>
              <div id="titlebar-close" class="titlebar-button">
                <img alt="close" src="https://api.iconify.design/mdi:close.svg"/>
              </div>
            </div>
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

/*.titlebar {
  height: 30px;
  background: #329ea3;
  user-select: none;
  display: flex;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.titlebar-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  user-select: none;
  -webkit-user-select: none;
}

.titlebar-button:hover {
  background: #5bbec3;
}*/
</style>