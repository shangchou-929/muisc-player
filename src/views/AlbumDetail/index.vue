<template>
  <div class="album" ref="album">
    <div class="wrap">
      <Loading v-if="isLoading"></Loading>
      <div v-else>
        <div class="header">
          <div class="head_bg"></div>
          <div class="head_wrap">
            <div class="fl">
              <span class="bg"></span>
              <img class="head_img" :src="album.picUrl" alt />
              <span>专辑</span>
            </div>
            <div class="fr">
              <h2 class="head_title">{{album.name}}</h2>
              <div class="author_tl">
                歌手：
                <span class="singer">{{album.singer}}</span>
              </div>
              <div class="time">发行时间：{{album.publishTime | timer}}</div>
            </div>
          </div>
        </div>
        <span class="arrow_back" @tap="goback"></span>
        <div class="introduce">
          <div class="intro">
            <div class="intro_words" ref="words">
              <span>
                <p ref="p">
                  <span class="in_tag">简介：</span>
                  {{album.description}}
                </p>
              </span>
            </div>
            <span :class="  flag ? 'arrow_down' :'arrow_up'" @tap="showAll()"></span>
          </div>
        </div>
        <div class="playlist">
          <h3 class="pl_title">歌曲列表</h3>
          <ul>
            <li class="song_list" v-for="item in songlist" :key="item.id">
              <div class="list_fl">{{item.index}}</div>
              <div class="list_fr">
                <div class="song_fl">
                  <div class="song_tl">{{item.name}}</div>
                  <div class="song_auth">{{item.author_name}} - {{item.al_name}}</div>
                </div>
                <div class="song_fr">
                  <span class="play_icon"></span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import Loading from "@/components/Loading";
export default {
  data() {
    return {
      album: {},
      songlist: [],
      flag: true,
      albumId: "",
      isLoading: true
    };
  },
  activated() {
      this.isLoading = true;
    this.albumId = this.$route.params.albumId;
    this.axios
      .get("http://localhost:3000/album?id=" + this.albumId)
      .then(res => {
        if (res.statusText === "OK") {
          let data = res.data.album;
          let songs = res.data.songs;
          this.album = data;
          this.songlist = songs;
          this.formatAlbum();
          this.formatIndex();
          this.formatArtist();
          this.isLoading = false;
          console.log(this.album);
          console.log(this.songlist);
        }
      });
    this.$nextTick(() => {
      this._initScroll();
    });
  },
  methods: {
    _initScroll() {
      this.album = new BScroll(this.$refs.album, {
        tap: true,
        probetype: 1
      });
    },
    formatAlbum() {
      let singer = this.album.artist.name;
      this.album = { ...this.album, singer: singer };
    },
    showAll() {
      if (this.flag) {
        this.$refs.words.style = `height:100%;`;
        this.$refs.p.style = `height:100%;`;
      } else {
        this.$refs.p.style = `height: 56px;`;
        this.$refs.words.style = `height: 56px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;`;
      }
      this.flag = !this.flag;
    },
    formatIndex() {
      let count = 0;
      this.songlist = this.songlist.map(item => {
        count++;
        return { ...item, index: count };
      });
    },
    formatArtist() {
      this.songlist = this.songlist.map(item => {
        let author = item.ar;
        let al_name = item.al.name;
        let art = [];
        for (let i = 0; i < author.length; i++) {
          art.push(author[i].name);
        }
        let str = art.join("/");
        return { ...item, author_name: str, al_name: al_name };
      });
    },
    goback() {
      this.$router.back();
    }
  },
  components: {
      Loading
  }
};
</script>

<style lang="scss" scoped>
.album {
  position: relative;
  z-index: 10;
  background: #f8f8f8;
  width: 100%;
  height: 674px;
  overflow: hidden;
  .header {
    position: relative;
    padding: 30px 10px 30px 15px;
    overflow: hidden;

    .head_bg {
      background-image: url(//music.163.com/api/img/blur/109951164210721889?param=170y170);
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 50%;
      filter: blur(20px);
      transform: scale(1.5);
    }

    .head_wrap {
      display: flex;
      position: relative;
      z-index: 2;

      .fl {
        position: relative;
        width: 126px;
        height: 126px;
        background-color: #e2e2e3;
        .bg {
          height: 126px;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 1;
          padding-left: 108%;
          background: url(//s3.music.126.net/m/s/img/album@2x.png?4d5d63f…) 100%
            no-repeat;
          background-size: contain;
        }
        .head_img {
          width: 100%;
          vertical-align: middle;
        }

        span {
          position: absolute;
          z-index: 3;
          top: 10px;
          left: 0;
          padding: 0 8px;
          height: 17px;
          color: #fff;
          font-size: 9px;
          text-align: center;
          line-height: 17px;
          background-color: rgba(217, 48, 48, 0.8);
          border-top-right-radius: 17px;
          border-bottom-right-radius: 17px;
        }
      }

      .fr {
        flex: 1 1 auto;
        width: 1%;
        margin-left: 29px;
        font-weight: 400;
        color: hsla(0, 0%, 100%, 0.5);
        .head_title {
          padding-top: 10px;
          font-size: 17px;
          line-height: 1.3;
          color: #fefefe;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .author_tl {
          margin-top: 22px;
          height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-break: normal;

          .singer {
            color: #fff;
          }
        }
        .time {
          margin-top: 5px;
          font-size: 12px;
        }
      }
    }
  }
}
.arrow_back {
  position: absolute;
  display: block;
  width: 10px;
  height: 10px;
  border-top: 1px solid white;
  border-right: 1px solid white;
  top: 10px;
  left: 5px;
  transform: rotate(-135deg);
  z-index: 1;
}
.arrow_down {
  position: absolute;
  display: block;
  width: 8px;
  height: 8px;
  border-top: 1px solid #b4b4b4;
  border-right: 1px solid #b4b4b4;
  bottom: 10px;
  right: 5px;
  transform: rotate(135deg);
}
.arrow_up {
  position: absolute;
  display: block;
  width: 8px;
  height: 8px;
  border-top: 1px solid #b4b4b4;
  border-right: 1px solid #b4b4b4;
  bottom: 3px;
  right: 5px;
  transform: rotate(-45deg);
}
.introduce {
  position: relative;
  margin: 0 10px 0 15px;
  padding-top: 10px;
  line-height: 19px;
  color: #666;

  .tags {
    margin-bottom: 10px;
    line-height: 20px;
    margin-right: -10px;

    span {
      font-size: 14px;
    }

    .intro_tag {
      display: inline-block;
      margin-right: 10px;
      padding: 1px 8px;
      font-size: 12px;
    }
  }

  .intro {
    position: relative;
    padding-bottom: 18px;
    line-height: 19px;
    color: #666;
    font-size: 14px;
    .intro_words {
      height: 56px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      .in_tag {
        font-size: 14px;
      }
    }
  }
}
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
      border-bottom: 1px solid #ebebeb;
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
          height: 14px;
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