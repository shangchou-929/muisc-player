<template>
  <div>
        <div class="bestmatch">
          <h3>最佳匹配</h3>
          <ul>
            <li class="match_album" v-show="bestMatch.album" @tap="gotoAlbum()">
              <div class="link_cover">
                <div class="pic_cover">
                  <img :src="bestMatch.album_pic" alt />
                </div>
                <div class="describe" >
                  <h4>
                    <p class="hcover">专辑：{{bestMatch.album_name}}</p>
                  </h4>
                  <p class="additional">{{bestMatch.addtion}}</p>
                </div>
                <div class="next"></div>
              </div>
            </li>
            <li class="match_artists" v-show="bestMatch.artist"  @tap="gotoSinger()">
              <div class="link_cover">
                <div class="pic_cover">
                  <img :src="bestMatch.picUrl" alt />
                </div>
                <div class="describe">
                  <h4>歌手：{{bestMatch.author}}</h4>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="result_songs">
          <ul>
            <li class="song_list" v-for="song in searchResult" :key="song.id" @tap="gotoSong(song.id)">
              <div class="sg_fl">
                <div class="song_name">
                  <p v-html="changeColor(song.name,keyword)">{{song.name}}</p>
                </div>
                <div class="song_author">
                  <i class="u-hmsprt sghot"></i>
                  <span>
                    <span v-html="changeColor(song.author,keyword)">{{song.author}}</span> -
                    <span v-html="changeColor(song.album.name,keyword)">{{song.album.name}}</span>
                  </span>
                </div>
              </div>
              <div class="sg_fr">
                <span class="play_icon"></span>
              </div>
            </li>
          </ul>
        </div>
      </div>
</template>

<script>
export default {
  props: ['bestmatch','resultList','str'],
  data(){
    return{
      bestMatch: this.bestmatch,
      searchResult: this.resultList,
      keyword: this.str
    }
  },
  methods: {
    changeColor(val, keyword) {
      val = val + "";
      if (val.indexOf(keyword) !== -1 && keyword !== "") {
        return val.replace(
          keyword,
          '<font color="#507daf">' + keyword + "</font>"
        );
      } else {
        return val;
      }
    },
    gotoSong(songId){
      this.$router.push("/music/songdetail/" + songId);
    },
    gotoAlbum(){
      let albumId = this.bestMatch.album[0].id;
      this.$router.push("/music/albumdetail/" + albumId);
    },
    gotoSinger(){
      let singerId = this.bestMatch.artist[0].id;
      this.$router.push("/music/singerdetail/" + singerId);
    }
  },
  watch:{
    bestmatch:{
      handler(newVal){
        this.bestMatch = newVal;
      }
    },
    resultList:{
      handler(newVal){
        this.searchResult = newVal;
      }
    },
    str:{
      handler(newVal){
        this.keyword = newVal;
      }
    },
  }
};
</script>


<style lang="scss" scoped>
.bestmatch {
  padding: 8px 0 4px;
  h3 {
    margin-left: 10px;
    font-size: 12px;
    line-height: 16px;
    color: #666;
  }
  ul {
    list-style: none;
    .match_album {
      position: relative;
      height: 66px;
      width: 100%;
      .link_cover {
        display: flex;
        align-items: center;
        height: 66px;
        margin-left: 10px;
        padding: 8px 10px 8px 0;
        box-sizing: border-box;
        .pic_cover {
          position: relative;
          width: 50px;
          height: 50px;
          margin-right: 15px;
          line-height: 0;
          flex: 0 0 auto;
          display: inline-block;
          img {
            display: block;
            width: 100%;
          }
        }
        ::after {
          content: "";
          position: absolute;
          top: 2px;
          right: -10px;
          width: 10px;
          height: 46px;
          background-image: url(//s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28…=);
          background-repeat: no-repeat;
          background-size: 166px 97px;
          background-position: 0 -30px;
        }
        .describe {
          overflow: hidden;
          width: 264px;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-break: normal;
          font-size: 17px;
          line-height: 30px;
          color: #333;
          .additional {
            font-size: 12px;
            line-height: 15px;
            color: #999;
          }
        }
      }
    }
    .match_artists {
      position: relative;
      height: 66px;
      .link_cover {
        display: flex;
        align-items: center;
        height: 66px;
        margin-left: 10px;
        padding: 8px 10px 8px 0;
        box-sizing: border-box;
        .pic_cover {
          position: relative;
          width: 50px;
          height: 50px;
          margin-right: 15px;
          line-height: 0;
          flex: 0 0 auto;
          display: inline-block;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .describe {
          flex: 1;
          display: inline-block;
          width: 1%;
        }
      }
    }
  }
}
.song_list {
  margin-left: 10px;
  width: 100%;
  display: flex;
  border-bottom: 1px solid #f0f0f0;
  .sg_fl {
    padding: 7px 0;
    flex: 1 1 auto;
    width: 46px;
    .song_name p {
      // color: #507daf;
      font-size: 17px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: normal;
      margin-bottom: 4px;
    }

    .song_author {
      font-size: 12px;
      color: #888;
      .u-hmsprt {
        background: url(//s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28…=)
          no-repeat;
        background-size: 166px 97px;
      }
      .sghot {
        display: inline-block;
        width: 12px;
        height: 8px;
        margin-right: 4px;
      }
    }
  }

  .sg_fr {
    padding: 0 10px;
    margin-top: 13px;
    margin-right: 10px;
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
</style>