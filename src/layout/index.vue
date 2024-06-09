<script setup>
import {ref} from 'vue'
import mdEditorV3 from '../components/editor/index.vue'
import {invoke} from '@tauri-apps/api/tauri'

import {appWindow, getCurrent} from "@tauri-apps/api/window";
import {Icon} from "@iconify/vue";
import {createDiscreteApi, NIcon} from 'naive-ui'

const {dialog} = createDiscreteApi(['dialog'])
const title = ref('')
const text = ref('\n\n\n\n')
const MdEditorRef = ref(null)
onMounted(async () => {
  title.value = await appWindow.title();
  await invoke('close_splashscreen')
  await getCurrent().onCloseRequested(async (event) => {
    event.preventDefault();
    onClose()

    /*const asked = await ask('要我走了?',
        {
          cancelLabel: '等下，我还没保存',
          okLabel: '毁灭吧，我累了',
          type: 'warning'
        }
    );
    if (!asked) {
      event.preventDefault();
    }*/
  });
  window.addEventListener('keydown', preventShortcuts);
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', preventShortcuts);
})

function preventShortcuts(event) {
  console.log(event);
  if (event.ctrlKey) {
    if (event.shiftKey) {
      if (
          event.key === 'r'
          || event.key === 'p'
          || event.key === 'j'
      ) {
        event.preventDefault();
      }
    }
    if (
        event.key === 'u'
        || event.key === 'f'
        || event.key === 'p'
        || event.key === 'j'
        || event.key === 'g'
        || event.key === '\\'
    )
      event.preventDefault();
  }
  if ((event.ctrlKey && !event.shiftKey && !event.altKey) && event.key === 's') {
    MdEditorRef.value.saveFn()
  }
}

const isNotTop = ref(true)
const isMaximize = ref(false)

const toggleOnTop = async () => {
  await appWindow.setAlwaysOnTop(isNotTop.value)
  isNotTop.value = !isNotTop.value
}
const toggleMin = () => {
  appWindow.minimize()
}
const toggleMax = async () => {
  await appWindow.toggleMaximize()
  isMaximize.value = await appWindow.isMaximized()
}
const onClose = () => {
  dialog.warning({
    title: "Wow",
    content: "我要走了",
    positiveText: "毁灭吧，我累了",
    negativeText: "等下，我还没保存",
    onPositiveClick: () => {
      appWindow.close()
    },
  });
}

</script>

<template>
  <div class="container">
    <header class="titleBar" @contextmenu.prevent>
      <n-space align="center" data-tauri-drag-region justify="space-between" style="width: 100%;">
        <div class="logo"><img alt="Logo" src="../assets/icon.png"></div>
        <div class="title" v-text="title"></div>
        <n-space>
          <n-button :type="isNotTop ?  'tertiary' :'primary'" secondary size="small" strong title="置顶"
                    @click="toggleOnTop">
            <template #icon>
              <n-icon>
                <Icon :icon="isNotTop?'tabler:pin':'tabler:pinned'"/>
              </n-icon>
            </template>
          </n-button>
          <n-button secondary size="small" strong title="最小化" type="tertiary" @click="toggleMin">
            <template #icon>
              <n-icon>
                <Icon icon="tabler:minus"/>
              </n-icon>
            </template>
          </n-button>
          <n-button :title="isMaximize? '还原':'最大化'" secondary size="small" strong type="tertiary"
                    @click="toggleMax">
            <template #icon>
              <n-icon>
                <Icon :icon="isMaximize?'tabler:minimize':'tabler:maximize'"/>
              </n-icon>
            </template>
          </n-button>
          <n-button secondary size="small" strong title="关闭" type="error" @click="onClose">
            <template #icon>
              <n-icon>
                <Icon icon="tabler:x"/>
              </n-icon>
            </template>
          </n-button>
        </n-space>
      </n-space>
    </header>
    <main class="main">
      <md-editor-v3
          id="mdEditor"
          ref="MdEditorRef"
          :text="text"
          style="height: 100%;"
      />
    </main>
  </div>
</template>

<style scoped>
.container {
  height: 100%;
  --title-height: 50px;
}

.titleBar {
  height: var(--title-height);
  background: #fff;
  user-select: none;
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  box-shadow: 0 0 5px rgba(0, 0, 0, .2);
  z-index: 20;
  padding: 0 10px;
}

.main {
  height: calc(100% - var(--title-height));
  /*margin-top: var(--title-height);*/
}

#mdEditor {
  --primary-color: 24, 160, 88;
}
</style>