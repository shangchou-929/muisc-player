<template>
  <div class="hotplaying" ref="hotcont">
   
    <div class="wrapper" >
      <div class="hottop">
        <div class="hotopct">
          <div class="hoticon u-hmsprt"></div>
          <div class="hottime">
            <span>更新日期：08月08日</span>
          </div>
        </div>
      </div>
      <div class="hotcont">
        <ul>
          <li class="song_list" :class="i < 5? 'top' : ''" v-for="(item,i) in hotsong" :key="i"  @tap="handletoSong(item.id)">
            <div class="sort_num" :class="i < 3? 'active' : ''">
              <span>{{item.index}}</span>
            </div>
            <div class="song_info">
              <div class="sg_fl">
                <div class="song_name">
                  <p>{{item.name}}</p>
                </div>
                <div class="song_author">
                  <i class="u-hmsprt sghot"></i>
                  <span>{{item.singer}}</span>
                </div>
              </div>
              <div class="sg_fr">
                <span class="play_icon"></span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="hotdn">
        <span>查看完整榜单</span>
        <div class="goto"></div>
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
      hotsong: [],
    };
  },
  activated() {
    this.$nextTick(() => {
      this._initScroll();
      this.axios
        .get(
          "http://localhost:3000/top/list?idx=1"
        )
        .then(res => {
          if (res.statusText === "OK") {
            let data = res.data.playlist.tracks;
            if(this.hotsong.length > 0){
              return
            }
            this.format(data);
          }
        });
    });
  },
  methods: {
    _initScroll() {
      this.hotcont = new BScroll(this.$refs.hotcont, {
        tap: true,
        probetype: 1
      });
    },
    format(data){
      for (let i = 0; i < 20; i++) {
        this.hotsong.push(data[i]);
      }
    
      let num = 0;
      this.hotsong = this.hotsong.map(item => {
        num++;
        if (num < 10) {
          num = `0${num}`;
        } else {
          num = `${num}`;
        }
        let arr = [];
        for(let i = 0 ; i < item.ar.length; i++){
            let str = item.ar[i].name;
            arr.push(str);
        }
        let a = arr.join("/");
        return{...item, index: num, singer: a }
      })
    },
    formatIndex(data) {
      for (let i = 0; i < 20; i++) {
        this.hotsong.push(data[i]);
      }
      let num = 0;
      this.hotsong = this.hotsong.map(item => {
        num++;
        if (num < 10) {
          num = `0${num}`;
        } else {
          num = `${num}`;
        }
        return { ...item, index: num };
      });
    },
    handletoSong(songId) {
     
      this.$router.push("/music/songdetail/" + songId);
    }
  },
  components: {
    Loading
  }
};
</script>

<style lang="scss" scoped>
.hotplaying {
  margin-top: 124px;
  height: 500px;
  box-sizing: border-box;
  overflow: hidden;
}

.hottop {
  position: relative;
  padding-top: 38.9%;
  overflow: hidden;
  background: url(//s3.music.126.net/mobile-new/img/hot_music_bg_2x.jpg?f01a252…=)
    no-repeat;
  background-size: contain;
  .hotopct {
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 2;
    padding-left: 20px;
    box-sizing: border-box;
    .hoticon {
      width: 142px;
      height: 67px;
      background: url(http://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28%E2%80%A6=)
        no-repeat;
      background-position: -20px -45px;
      background-size: 166px 97px;
    }
    .hottime {
      margin-top: 10px;
      color: hsla(0, 0%, 100%, 0.8);
      font-size: 12px;
    }
  }
}
.hotcont {
  height: 100%;
  ul {
    list-style: none;
    .top {
      background-color: #fcfcfd;
    }
    .song_list {
      width: 100%;
      display: flex;
      .sort_num {
        text-align: center;
        line-height: 50px;
        font-size: 17px;
        color: #999;
        padding: 0 10px;
      }
      .active {
        color: #d43c33;
      }
      .song_info {
        display: flex;
        width: 100%;
        border-bottom: 1px solid #f0f0f0;
        .sg_fl {
          padding: 7px 0;
          flex: 1 1 auto;
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
}
.hotdn {
  height: 55px;
  line-height: 55px;
  text-align: center;
  color: #999;
  padding-bottom: 55px;
  .goto {
    display: inline-block;
    width: 7px;
    height: 7px;
    border-top: 1px solid #999;
    border-right: 1px solid #999;
    transform: rotate(45deg);
    margin-bottom: 1px;
  }
}
</style>

