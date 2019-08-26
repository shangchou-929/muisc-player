<template>
  <div class="moresongs">
    <h2 class="m_title">喜欢这首歌的人也听</h2>
    <ul class="songlist">
      <li class="item" v-for="song in songlist" :key="song.id" @tap="handletoSong(song.id)">
        <div class="cover">
          <img :src="song.url" alt />
        </div>
        <div class="words">
          <h3 class="song_name">{{song.name}}</h3>
          <p>{{song.author_name}} - {{song.album_name}}</p>
        </div>
        <i class="play_icon"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["songlist"],
  data(){
      return{
          songId: ''
      }
  },
  mounted(){
      this.songId = this.$route.params.songId;
  },
  methods: {
     handletoSong(id) {
      this.$emit('changeSong', id);
    }
  },
 
};
</script>

<style lang="scss" scoped>
.moresongs {
  margin-top: 10px;
  padding-bottom: 30px;
  line-height: 1.6;
  width: 100%;
  box-sizing: border-box;
  .songlist {
    margin-top: 10px;
    .item {
      position: relative;
      overflow: hidden;
      padding: 7px 0 7px 10px;
      height: 40px;
      .cover {
        float: left;
        margin-right: 10px;
        width: 40px;
        height: 40px;
        img {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }
      .words {
        padding-bottom: 7px;
        padding-right: 40px;
        .song_name {
          line-height: 18px;
          font-size: 15px;
          color: #fff;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-break: normal;
        }
        p {
          margin-top: 2px;
          color: hsla(0, 0%, 100%, 0.6);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-break: normal;
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