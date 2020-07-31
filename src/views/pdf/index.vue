<template>
  <div class="app-container">
    <aside style="margin-top:15px;">
      这里我们使用window.print()来实现下载PDF的特性.
    </aside>
    <router-link target="_blank" to="/pdf/download">
      <el-button type="primary">
        点击下载PDF
      </el-button>
    </router-link>
  </div>
</template>

