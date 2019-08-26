<template>
  <div>
    <div class="playlist">
      <h3 class="pl_title">歌曲列表</h3>
      <ul>
        <li class="song_list" v-for="item in playsongs" :key="item.id" @tap="handletoSong(item.id)">
          <div class="list_fl">{{item.index}}</div>
          <div class="list_fr">
            <div class="song_fl">
              <div class="song_tl">{{item.name}}</div>
              <div class="song_auth">{{item.author_name}} - {{item.al.name}}</div>
            </div>
            <div class="song_fr">
              <span class="play_icon"></span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    props: ['songlist'],
  data() {
    return {
        playsongs: this.songlist
    };
  },
  mounted(){
      console.log(this.playsongs)
    
  },
  watch: {
      songlist: {
          handler(newValue, oldValue){
              this.playsongs = newValue;
          }
      }
  },
  methods:{
    handletoSong(songId) {
      console.log(songId)
      this.$router.push("/music/songdetail/" + songId);
    }
  }
};
</script>

<style lang="scss" scoped>
.playlist {
  .pl_title {
    height: 23px;
    line-height: 23px;
    padding: 0 10px;
    font-size: 12px;
    color: #666;
    background-color: #eeeff0;
    font-weight: 400;
  }

  .song_list {
    padding-left: 10px;
    display: flex;
    color: #333;

    .list_fl {
      justify-content: center;
      width: 40px;
      font-size: 17px;
      color: #999;
      margin-left: -10px;
      text-align: center;
      margin-top: 15px;
    }

    .list_fr {
      flex: 1 1 auto;
      display: flex;
        border-bottom: 1px solid #EBEBEB;
      .song_fl {
        padding: 7px 0;
        flex: 1 1 auto;
        width: 220px;
        .song_tl {
          font-size: 17px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-break: normal;
          margin-bottom: 6px;
          font-weight: 400;
        }

        .song_auth {
          font-size: 12px;
          height:14px;
          color: #888;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-break: normal;
        }
      }

      .song_fr {
        padding: 0 10px;
        margin-top: 13px;

        .play_icon {
          display: inline-block;
          width: 22px;
          height: 22px;
          background: url(//s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28…=)
            no-repeat;
          background-size: 166px 97px;
          background-position: -24px 0;
        }
      }
    }
  }
}
</style>