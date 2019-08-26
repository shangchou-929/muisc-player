<template>
<!-- 手指滑动组件 安装better-scroll实现 -->
    <div class="wrapper" ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
    name: 'Scroller',
    mounted(){
        var scroll = new BScroll(this.$refs.wrapper, {
            tap: true,
            probeType: 1
        });
        
    }
}
</script>

<style lang="scss" scoped>
.wrapper {height: 100%;}
</style>
