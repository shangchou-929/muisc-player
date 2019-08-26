<template>
  <div class="tabbar">
    <div class="tab_text">
      <router-link to="/music/recommend" tag="div">
        <span>推荐音乐</span>
      </router-link>
    </div>

    <div class="tab_text">
      <router-link to="/music/hotplaying" tag="div">
        <span>热歌榜</span>
      </router-link>
    </div>

    <div class="tab_text">
      <router-link to="/music/search" tag="div">
        <span>搜索</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.tabbar {
  border: 1px solid #f0f0f0;
  background-color: white;
  position: fixed;
  width: 100%;
  top: 79px;
  left: 0;
  z-index: 5;
  display: flex;

  .tab_text {
    width: 33.33%;
    height: 40px;
    line-height: 40px;
    margin: 1px 0;
    text-align: center;
    box-sizing: border-box;
    margin: 0 20px;
    .span {
      display: block;
      margin: 0 auto;
      padding: 0 2px;
      width: 70px;
     
    }
    .router-link-active {
      border-bottom: 2px solid #d43c33;
      color: #d43c33;
      
    }
    
  }
}
</style>

