<template>
  <div class="contentWrapper" ref="contentWrapper">
    <div class="content">
      <div class="remd_tl">
        <p>推荐歌单</p>
      </div>
      <div class="remd_songs">
        <ul class="remd_ul">
          <li
            class="remd_li"
            v-for="item in recommendList"
            :key="item.id"
            @tap=" handletoDetail(item.id)"
          >
            <div class="remd_img">
              <img :src="item.picUrl" alt />
              <span>{{item.playCount}}</span>
            </div>
            <p class="remd_text">{{item.name}}</p>
          </li>
        </ul>
      </div>
      <div class="remd_tl">
        <p>最新音乐</p>
      </div>
      <div class="remd_newsongs">
        <ul>
          <li class="song_list" v-for="(song, num) in newsongs" :key="num" @tap="handletoSong(song.id)">
            <div class="sg_fl">
              <div class="song_name">
                <p>{{song.name}}</p>
              </div>
              <div class="song_author">
                <i class="u-hmsprt sghot"></i>
                <span>{{song.author}}</span>
              </div>
            </div>
            <div class="sg_fr">
              <span class="play_icon"></span>
            </div>
          </li>
        </ul>
      </div>
      <Bottom></Bottom>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import Bottom from "@/components/Bottom";
import Loading from "@/components/Loading";

export default {
  data() {
    return {
      list: [],
      newsongs: [],
      isLoading: true,
      recommendList: [],
      array: [],
      test: []
    };
  },

  activated() {
    this.isLoading = true;
    this.$nextTick(() => {
      this._initScroll();
      this.axios.get("http://localhost:3000/personalized").then(res => {
        if (res.statusText === "OK") {
          let data = res.data.result;
          this.list = data;
          console.log(data);
          if (this.recommendList.length > 0) {
            this.isLoading = false;
            return;
          }
          this.formatPlayCount();
          this.formatSheet();
           this.isLoading = false;
        }
      });
      this.axios.get("http://localhost:3000/personalized/newsong").then(res => {
        if (res.statusText === "OK") {
          console.log(res.data.result)
          let data = res.data.result;
          this.newsongs = data;
          // console.log(data)
          this.formatAuthor();
          // // this.format();
         
        }
      });
    });
  },
  mounted() {},
  methods: {
    _initScroll() {
      this.contentWrapper = new BScroll(this.$refs.contentWrapper, {
        tap: true,
        probetype: 1
      });
    },
    formatPlayCount() {
      this.list = this.list.map(item => {
        if (item.playCount / 10000 >= 1) {
          let count = Math.floor(item.playCount / 10000);
          return { ...item, playCount: `${count}万` };
        }
      });
    },
    formatAuthor() {
      this.newsongs = this.newsongs.map(song => {
        let arr = [];
        for(let i = 0 ; i < song.song.artists.length; i++){
            let str = song.song.artists[i].name;
            arr.push(str);
        }
        let a = arr.join("/");
        return { ...song, author: a };
      });
    },
    formatSheet() {
      for (let i = 0; i < 6; i++) {
        this.recommendList.push(this.list[i]);
      }
    },
    handletoDetail(sheetId) {
      this.$router.push("/music/sheetdetail/" + sheetId);
    },
    handletoSong(songId) {
      console.log(songId)
      this.$router.push("/music/songdetail/" + songId);
    }
  },
  components: {
    Bottom,
    Loading
  }
};
</script>

<style lang="scss" scoped>
.contentWrapper {
  height: 680px;
  background-color: #fcfcfd;
}
.content {
  padding-top: 138px;
}
.remd_tl {
  height: 20px;
  line-height: 20px;
  margin-bottom: 14px;
  padding-left: 9px;
  font-size: 17px;
  border-left: 2px solid #d43c33;
  background-color: #fcfcfd;
}
.remd_songs {
  .remd_ul {
    overflow: hidden;
    padding-bottom: 20px;

    .remd_li {
      box-sizing: border-box;
      width: 33.33%;
      float: left;
      margin-bottom: 16px;
      margin: 0 0 16px 0;
      padding: 2px;
      .remd_img {
        // width: 105px;
        height: 120px;
        position: relative;

        img {
          width: 100%;
          height: 100%;
        }

        span {
          position: absolute;
          top: 2px;
          right: 5px;
          font-size: 12px;
          color: #fff;
        }
      }

      .remd_text {
        width: 100%;
        color: #333;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        padding: 4px 2px 0 4px;
        min-height: 30px;
        line-height: 1.2;
        font-size: 13px;
        box-sizing: border-box;
        margin-left: 1px;
      }
    }
  }
}
.remd_newsongs {
  background-color: white;
  ul {
    list-style: none;
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
  }
}
</style>