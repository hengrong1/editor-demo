<template>
  <div class="editor-container h-full">
    <MdEditor
        ref="mdEditor"
        v-model="text"
        :customIcon="customIcon"
        :showCodeRowNumber="true"
        :showToolbarName="true"
        :theme="theme"
        :toolbars="toolbars"
        language="zh-CN"
        previewTheme="arknights"
        style="height: 100%;"
        @onHtmlChanged="onHtmlChanged"
        @onSave="saveFn"
    >
      <template #defToolbars>
        <MyMark/>
        <NormalToolbar title="导入" @onClick="importMDFile">
          <template #trigger>
            <icon class=" md-editor-icon" icon="tabler:file-import"></icon>
            <div class="md-editor-toolbar-item-name">导入</div>
          </template>
        </NormalToolbar>
        <NormalToolbar title="导出" @onClick="exportFile">
          <template #trigger>
            <icon class=" md-editor-icon" icon="tabler:file-export"></icon>
            <div class="md-editor-toolbar-item-name">导出</div>
          </template>
        </NormalToolbar>
        <NormalToolbar title="插入文件" @onClick="addResource">
          <template #trigger>
            <icon class=" md-editor-icon" icon="tabler:file-plus">视频</icon>
            <div class="md-editor-toolbar-item-name">文件</div>
          </template>
        </NormalToolbar>
        <my-media />
        <NormalToolbar title="选择模板" @onClick="addTemplates">
          <template #trigger>
            <icon class=" md-editor-icon" icon="tabler:layout-dashboard"></icon>
            <div class="md-editor-toolbar-item-name">模板</div>
          </template>
        </NormalToolbar>
        <my-image/>
        <MyLink/>
        <NormalToolbar title="语法帮助" @onClick="showModal=true">
          <template #trigger>
            <Icon class=" md-editor-icon" icon="tabler:help-square-rounded"></Icon>
            <div class="md-editor-toolbar-item-name">帮助</div>
          </template>
        </NormalToolbar>
        <NormalToolbar title="插入表情" @onClick="showModal=true">
          <template #trigger>
            <Icon class=" md-editor-icon" icon="tabler:mood-plus"></Icon>
            <div class="md-editor-toolbar-item-name">表情</div>
          </template>
        </NormalToolbar>
      </template>
    </MdEditor>
    <n-modal
        v-model:show="showModal"
        :content-style="{ width: '800px',height: '480px'}"
        :mask-closable="false"
        :tabs-padding="20"
        pane-style="padding: 20px;"
        preset="card"
        style="width: 800px;height: 600px;"
    >
      <template #header>
        title
      </template>
      <n-tabs
          animated type="line">
        <n-tab-pane name="imageTab1" tab="图片上传">


        </n-tab-pane>
        <n-tab-pane name="imageTab2" tab="资源库">


        </n-tab-pane>
      </n-tabs>
      <template #footer>
        <n-space>
          <n-button @click="showModal = false">取消</n-button>
          <n-button type="primary" @click="showModal = false">确定</n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {config, MdEditor, NormalToolbar} from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import './themes/preview-theme-arknights.css'
import {lineNumbers} from '@codemirror/view'
import MarkExtension from 'markdown-it-mark'
import {videoPlugin} from './plugins/media.js'
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'
import {Icon} from '@iconify/vue';
import {darkTheme, useDialog, useMessage, useOsTheme} from 'naive-ui'

import MyLink from './customToolbas/MyLink.vue'
import MyMark from './customToolbas/MyMark.vue'
import MyImage from "./customToolbas/MyImage.vue";
import MyMedia from "./customToolbas/MyMedia.vue";

config({
  editorConfig: {
    languageUserDefined: {
      'zh-CN': {
        toolbarTips: {
          bold: '加粗',
          underline: '下划线',
          italic: '斜体',
          strikeThrough: '删除线',
          title: '标题',
          sub: '下标',
          sup: '上标',
          quote: '引用',
          unorderedList: '无序',
          orderedList: '有序',
          task: '代办',
          codeRow: '行内代码',
          code: '代码块',
          link: '链接',
          image: '图片',
          table: '表格',
          revoke: '后退',
          next: '前进',
          save: '保存',
          prettier: '美化',
          pageFullscreen: '全屏',
          preview: '预览',
          catalog: '目录'
        },
        titleItem: {
          h1: '一级标题',
          h2: '二级标题',
          h3: '三级标题',
          h4: '四级标题',
          h5: '五级标题',
          h6: '六级标题'
        },
        copyCode: {
          text: '复制代码',
          successTips: '已复制！',
          failTips: '复制失败！'
        },
        footer: {
          markdownTotal: '字数',
          scrollAuto: '同步滚动'
        }
      }
    }
  },
  codeMirrorExtensions(_theme, extensions) {
    return [...extensions, lineNumbers()]
  },
  markdownItConfig(md) {
    md
        .use(MarkExtension)
        .use(videoPlugin)
  }
})
const props = defineProps({
  text: {
    type: String,
    default: ''
  }
})
const text = ref(props.text)
const mdEditor = ref()
const showModal = ref(false)
const dialog = useDialog()
const theme = useOsTheme()

import { createDiscreteApi } from "naive-ui";
import {fs} from "@tauri-apps/api";
import {save} from "@tauri-apps/api/dialog";
const {message} = createDiscreteApi(['message'])


/*
const onSave = (v, h) => {
  /!*h.then((html) => {
    console.log({v, html});
  })*!/
  saveFn(v)
}
*/

const toolbars = [
  'revoke',
  'next',
  // 'save',
  '-',
  'bold',
  'underline',
  'italic',
  0,//标记
  '-',
  'title',
  'strikeThrough',
  'sub',
  'sup',
  'quote',
  'unorderedList',
  'orderedList',
  'task',
  '-',
  // 'codeRow',
  'code',
  7, // 链接
  6,//图片
  // 3,
  4,// 插入视频
  'table',
  //,//插入文件
  '-',
  1,//导入
  'save',
  //2, //,导出
  '-',
  //5,//选择模板
  '=',
  'prettier',
  // 'pageFullscreen',
  'preview',
  // 'previewOnly',
  'catalog',
  // 8 // 语法帮助
]

const customIcon = {
  revoke: {
    component: Icon,
    props: {
      icon: 'tabler:arrow-back-up',
      class: 'md-editor-icon'
    }
  },
  next: {
    component: Icon,
    props: {
      icon: 'tabler:arrow-forward-up',
      class: 'md-editor-icon'
    }
  },
  bold: {
    component: Icon,
    props: {
      icon: 'tabler:bold',
      class: 'md-editor-icon'
    }
  },
  underline: {
    component: Icon,
    props: {
      icon: 'tabler:underline',
      class: 'md-editor-icon'
    }
  },
  italic: {
    component: Icon,
    props: {
      icon: 'tabler:italic',
      class: 'md-editor-icon'
    }
  },
  title: {
    component: Icon,
    props: {
      icon: 'tabler:heading',
      class: 'md-editor-icon'
    }
  },
  'strike-through': {
    component: Icon,
    props: {
      icon: 'tabler:strikethrough',
      class: 'md-editor-icon'
    }
  },
  sub: {
    component: Icon,
    props: {
      icon: 'tabler:subscript',
      class: 'md-editor-icon'
    }
  },
  sup: {
    component: Icon,
    props: {
      icon: 'tabler:superscript',
      class: 'md-editor-icon'
    }
  },
  quote: {
    component: Icon,
    props: {
      icon: 'tabler:quote',
      class: 'md-editor-icon'
    }
  },
  'unordered-list': {
    component: Icon,
    props: {
      icon: 'tabler:list',
      class: 'md-editor-icon'
    }
  },
  'ordered-list': {
    component: Icon,
    props: {
      icon: 'tabler:list-numbers',
      class: 'md-editor-icon'
    }
  },
  task: {
    component: Icon,
    props: {
      icon: 'tabler:square-rounded-check',
      class: 'md-editor-icon'
    }
  },
  code: {
    component: Icon,
    props: {
      icon: 'tabler:code-dots',
      class: 'md-editor-icon'
    }
  },
  table: {
    component: Icon,
    props: {
      icon: 'tabler:table-plus',
      class: 'md-editor-icon'
    }
  },
  prettier: {
    component: Icon,
    props: {
      icon: 'tabler:pencil-star',
      class: 'md-editor-icon'
    }
  },
  suoxiao: {
    component: Icon,
    props: {
      icon: 'tabler:minimize',
      class: 'md-editor-icon'
    }
  },
  fangda: {
    component: Icon,
    props: {
      icon: 'tabler:maximize',
      class: 'md-editor-icon'
    }
  },
  preview: {
    component: Icon,
    props: {
      icon: 'tabler:eye-search',
      class: 'md-editor-icon'
    }
  },
  catalog: {
    component: Icon,
    props: {
      icon: 'tabler:article',
      class: 'md-editor-icon'
    }
  },
  baocun: {
    component: Icon,
    props: {
      icon: 'akar-icons:save',
      class: 'md-editor-icon'
    }
  }
}

const addTemplates = () => {
  // 获取编辑器内容,如果有内容则提示是否覆盖,否则直接插入模板
  console.log('添加模版')
}

const addResource = () => {
  console.log('addResource')
}
const importMDFile = () => {
  if (text.value.trim() !== '') {
    dialog.warning({
      title: "警告",
      content: "当前内容不为空,是否继续导入文件?",
      positiveText: "继续",
      negativeText: "算了",
      onPositiveClick: () => {
        importMDFileFn()
      }
    })
  } else {
    importMDFileFn()
  }

  function importMDFileFn() {
    document.querySelector('#fileId')
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.md,text/markdown';
    fileInput.style.display = 'none'
    document.body.appendChild(fileInput);
    fileInput.click();

    fileInput.addEventListener('change', (event) => {
      const files = event.target.files;
      console.log(files);
      const reader = new FileReader();
      reader.onload = function (event) {
        console.log(event.target.result);
        text.value = event.target.result
        message.success('文件导入成功!!')
      };
      reader.onerror = function (event) {
        console.log('File could not be read: ' + event.target.error);
        message.success('文件解析失败, 具体原因请查看控制台!!')
      };
      reader.readAsText(files[0]);
    })
  }

}
const exportFile = () => {
  console.log('exportFile')
}

let players = [];
const playOptions = {
  i18n: {
    restart: '重新开始',
    rewind: '快退 {seektime} 秒',
    play: '播放',
    pause: '暂停',
    fastForward: '快进 {seektime} 秒',
    seek: '搜索',
    seekLabel: '{currentTime} / {duration}',
    played: '已播放',
    buffered: '已缓冲',
    currentTime: '当前时间',
    duration: '总时长',
    volume: '音量',
    mute: '静音',
    unmute: '取消静音',
    enableCaptions: '开启字幕',
    disableCaptions: '关闭字幕',
    download: '下载',
    enterFullscreen: '进入全屏',
    exitFullscreen: '退出全屏',
    frameTitle: '{title} 播放器',
    captions: '字幕',
    settings: '设置',
    pip: '画中画',
    menuBack: '返回上一级菜单',
    speed: '播放速度',
    normal: '正常',
    quality: '画质',
    loop: '循环',
    start: '开始',
    end: '结束',
    all: '全部',
    reset: '重置',
    disabled: '已禁用',
    enabled: '已启用',
    advertisement: '广告',
    qualityBadge: {
      2160: '4K',
      1440: '高清',
      1080: '高清',
      720: '高清',
      576: '标清',
      480: '标清',
    },
  },
  tooltips: {
    controls: true,
    seek: true
  },
  controls: [
    'play-large', // The large play button in the center
    //'rewind', // Rewind by the seek time (default 10 seconds)
    'play', // Play/pause playback
    //'fast-forward', // Fast forward by the seek time (default 10 seconds)
    'progress', // The progress bar and scrubber for playback and buffering
    'current-time', // The current time of playback
    'duration', // The full duration of the media
    'mute', // Toggle mute
    'volume', // Volume control
    'captions', // Toggle captions
    'settings', // Settings menu
    'pip', // Picture-in-picture (currently Safari only)
    'airplay', // Airplay (currently Safari only)
    'fullscreen', // Toggle fullscreen
  ],
}
const onHtmlChanged = (h) => {
  // console.log(h)
  if (h.includes('<video')) {
    nextTick(() => {
      const videos = document.querySelectorAll('.video-player')
      // 初始化新实例
      videos.forEach(video => {
        console.log(video)
        if (players.indexOf(video.id) < 0) {
          new Plyr(video, playOptions)
          players.push(video.id)
        }
      });
    });
  }
  if (h.includes('<audio')) {
    nextTick(() => {
      const audios = document.querySelectorAll('.audio-player')
      // 初始化新实例
      audios.forEach(audio => {
        if (players.indexOf(audio.id) < 0) {
          new Plyr(audio, playOptions)
          players.push(audio.id)
        }
      });
    });
  }
}

const saveFn = async (md, html) => {
  const filePath = await save({
    filters: [{
      name: 'MarkDown',
      extensions: ['md']
    }]
  });
  console.log(filePath);
  await saveTextToFile(filePath, md)
}
async function saveTextToFile(filePath, text) {
  try {
    await fs.writeTextFile(filePath, text);
    console.log("文件已保存");
    message.success('文件保存成功')
  } catch (error) {
    console.error("保存文件时出错:", error);
    message.success('文件保存成功', error)
  }
}


</script>
<style scoped>
.editor-container :deep(.md-editor-table-shape-col-default) {
  background: rgba(var(--primary-color, 220, 220, 220), .2);
  transition: background-color .25s;
}

.editor-container :deep(.md-editor-table-shape-col-include) {
  background: rgba(var(--primary-color, 220, 220, 220), .8);
  transition: background-color .25s;
}

:deep(.md-editor-toolbar-wrapper .md-editor-toolbar-item) {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>