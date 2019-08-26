<template>
  <div class="music">
    <Header></Header>
    <NavBar></NavBar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <keep-alive>
      <router-view name="sheetdetail"></router-view>
    </keep-alive>
    <keep-alive>
    <router-view name="songdetail"></router-view>
    </keep-alive>
    <router-view name="albumdetail"></router-view>
    <router-view name="singerdetail"></router-view>
  </div>
</template>

<script>
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";

export default {
  components: {
    Header,
    NavBar
  }
};
</script>

<style lang="scss" scoped>
.music {
  overflow: hidden;
  width: 100%;
}
</style>



