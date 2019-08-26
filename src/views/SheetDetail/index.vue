<template>
  <div class="wrap" ref="wrap">
    <div class="sheet">
      <Loading v-if="isLoading"></Loading>
      <div class="song_sheet" ref="songsheet" v-else>
        <SheetHead :create="creator" :songst="songsheet" :coStr="countStr"></SheetHead>
        <span class="arrow_back" @tap="goback"></span>
        <div class="introduce">
          <div class="tags">
            <span>标签：</span>
            <li class="intro_tag" v-for="(tag, index) in tags" :key="index">{{tag}}</li>
          </div>
          <div class="intro">
            <div class="intro_words" ref="words">
              <span>
                <p ref="p">
                  <span class="in_tag">简介：</span>
                  {{songsheet.description}}
                </p>
              </span>
            </div>
            <span :class="  flag ? 'arrow_down' :'arrow_up'" @tap="showAll()"></span>
          </div>
        </div>
        <!-- 歌曲列表 -->
        <SongList :songlist="playsongs"></SongList>
        <!-- 精彩评论 -->
        <HotComments :comment="hotcomments"></HotComments>

        <div class="bottom">
          <span>查看全部{{songsheet.commentCount}}条评论</span>
          <i class="next_icon"></i>
        </div>
      </div>
    </div>
   
  </div>
</template>

<script>
import { format } from "url";
import HotComments from "@/components/HotComment";
import SongList from "@/components/SongList";
import SheetHead from "@/components/SheetHead";
import Loading from "@/components/Loading";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      creator: {},
      songsheet: {},
      countStr: "",
      playsongs: [],
      hotcomments: [],
      tags: [],
      sheetId: "",
      flag: true,
      isLoading: true
    };
  },
  activated() {
    this.sheetId = this.$route.params.sheetId;
    this.initData();
    this.axios
      .get("http://localhost:3000/comment/playlist?id=" + this.sheetId)
      .then(res => {
        console.log(res);
      });

    this.$nextTick(() => {
      this._initScroll();
    });
  },
  methods: {
    _initScroll() {
      this.wrap = new BScroll(this.$refs.wrap, {
        tap: true,
        probetype: 1
      });
    },
    formatPlayCount() {
      if (this.songsheet.playCount / 1000 >= 10) {
        let num = this.songsheet.playCount / 1000;
        let str = num.toString().substr(0, 2);
        this.countStr = str.substr(0, 1) + "." + str.substr(1, 1) + "万";
      } else {
        this.countStr = this.songsheet.playCount;
      }
    },
    formatIndex() {
      let count = 0;
      this.playsongs = this.playsongs.map(item => {
        count++;
        return { ...item, index: count };
      });
    },
    formatArtist() {
      this.playsongs = this.playsongs.map(item => {
        let author = item.ar;
        let art = [];
        for (let i = 0; i < author.length; i++) {
          art.push(author[i].name);
        }
        let str = art.join("/");
        return { ...item, author_name: str };
      });
    },
    initData() {
      this.isLoading = true;
      this.axios
        .get("http://localhost:3000/playlist/detail?id=" + this.sheetId)
        .then(res => {
          if (res.statusText === "OK") {
            let data = res.data.playlist;
            this.creator = data.creator;
            this.songsheet = data;
            this.tags = data.tags;
            this.playsongs = data.tracks;
            this.formatPlayCount();
            this.formatIndex();
            this.formatArtist();
            this.isLoading = false;
            console.log(this.songsheet);
          } else {
            console.log("获取数据失败");
          }
        });
      this.axios
        .get("http://localhost:3000/comment/playlist?id=" + this.sheetId)
        .then(res => {
          if (res.statusText === "OK") {
            this.hotcomments = res.data.hotComments;
          }
        });
    },
    showAll() {
      if (this.flag) {
        this.$refs.words.style = `height:100%;`;
        this.$refs.p.style = `height:100%;`;
      } else {
        this.$refs.p.style = `height: 37px;`;
        this.$refs.words.style = `height: 37px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;`;
      }
      this.flag = !this.flag;
      console.log(this.sheetId);
    },
    goback() {
      this.$router.back();
    }
  },
  components: {
    HotComments,
    SongList,
    SheetHead,
    Loading
  }
};
</script>


<style lang="scss" scoped>
.wrap {
  height: 690px;
  overflow: hidden;
  position: relative;
  z-index: 10;
  background: #fff;
}
.sheet {
  position: absolute;
  left: 0px;
  top: 0px;
}
.song_sheet {
  background-color: #f8f8f8;
  z-index: 10;
  padding-bottom: 70px;
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
      height: 37px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      .in_tag {
        font-size: 14px;
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
.bottom {
  width: 100%;
  padding-bottom: 54px;
  span {
    display: block;
    margin-right: 50px;
    margin-left: 50px;
    padding: 18px 0;
    font-size: 14px;
    color: #999;
    text-align: center;
    line-height: 1;
  }
  .next_icon {
    position: relative;
    top: -1px;
    display: inline-block;
    width: 6px;
    height: 11px;
    margin-left: 5px;
    background-size: 100%;
    vertical-align: middle;
  }
}
</style>