<template>
  <div class="moreList">
    <h2 class="m_title">包含这首歌的歌单</h2>
    <ul>
      <li v-for="item in sheetlist" :key="item.id"  @tap=" handletoDetail(item.id)">
        <div class="img">
          <img class="sheet" :src="item.coverImgUrl" alt />
          <div class="playcount">
            <svg
              t="1565939541234"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4038"
              width="56"
              height="56"
            >
              <path
                d="M866.191434 514.846652h-51.124137c-1.907401-172.229676-137.780851-311.737303-304.606223-311.737303s-302.698822 139.507627-304.606223 311.737303h-49.758612c-69.006026 0-125.151542 56.145516-125.151541 125.151542v55.697566c0 68.998801 56.152741 125.151542 125.151541 125.151541h88.19564a39.773654 39.773654 0 0 0 39.289579-33.755225 39.824229 39.824229 0 0 0 1.748451-11.668383v-256.921188c0-130.04287 100.998349-235.831398 225.131165-235.831398 124.140041 0 225.131165 105.795752 225.131165 235.831398v256.921188c0 7.11663 1.892951 13.75641 5.151429 19.529189a39.759204 39.759204 0 0 0 37.237677 25.894419h88.210089c68.991576 0 125.137092-56.145516 125.137092-125.151541v-55.697566c0.007225-69.006026-56.145516-125.151542-125.137092-125.151542z"
                fill="#ffffff"
                p-id="4039"
              />
            </svg>
            <span>{{item.playCount}}</span>
          </div>
        </div>
        <h3 class="sheet_tl">{{item.name}}</h3>
        <p class="sub">
          <span class="author">by {{item.nickname}}</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    props:['sheetlist'],
    methods:{
        handletoDetail(sheetId) {
      this.$router.push("/music/sheetdetail/" + sheetId);
    },
    }
}
</script>

<style lang="scss" scoped>
.moreList {
  margin-top: 40px;
  padding-bottom: 30px;
  line-height: 1.6;
  ul {
    margin-top: 12px;
    display: flex;
    width: 100%;
    li {
      flex: 1;
      width: 33.33%;
      margin: 0 1px;
      .img {
        position: relative;
        height: 123px;
        overflow: hidden;
        > img {
          display: block;
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          z-index: 1;
        }
        .playcount {
          position: absolute;
          right: 5px;
          top: 2px;
          z-index: 3;
          color: #fff;
          font-size: 12px;
          .icon {
            width: 12px;
            height: 12px;
            margin-right: 3px;
          }
        }
      }
      .sheet_tl {
        margin: 2px 0 -1px;
        padding: 0 6px;
        color: #fff;
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: normal;
      }
      .sub {
        position: relative;
        padding: 0 19px 0 6px;
        color: hsla(0, 0%, 100%, 0.6);
        font-size: 12px;
        height: 20px;
        overflow: hidden;
        .author {
          position: relative;
          float: left;
        }
      }
    }
  }
}
.m_title {
  position: relative;
  padding-left: 10px;
  line-height: 18px;
  color: #fff;
  font-size: 16px;
  border-left: 2px solid #d43c33;
}
</style>