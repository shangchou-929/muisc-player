<template>
  <div class="wrap" ref="wrap">
    <div class="songDetail">
      <Loading v-if="isLoading"></Loading>
      <div class="song" v-else>
        <div class="news">
          <div class="song_bg"></div>
          <div class="scroll">
            <SongPlay :song="song" :songId="songId"></SongPlay>
            <MoreList :sheetlist="sheetlist"></MoreList>
            <MoreSongs :songlist="songlist" @changeSong="fromMoreSong"></MoreSongs>
            <SongComments :hotcomments="hotcomments"></SongComments>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from "path";
import SongComments from "@/components/SongComments";
import Loading from "@/components/Loading";
import MoreList from "@/components/MoreList";
import MoreSongs from "@/components/MoreSongs";
import SongPlay from "@/components/SongPlay";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      song: {},
      so: {},
      sheetlist: [],
      songlist: [],
      hotcomments: [],
      songId: "",
      isLoading: true
    };
  },
  activated() {
    this.songId = this.$route.params.songId;
    this.$nextTick(() => {
      this.initData();
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
    initData() {
      this.isLoading = true;
      this.axios
        .get("http://localhost:3000/song/detail?ids=" + this.songId)
        .then(res => {
          console.log(res);
          if (res.statusText === "OK") {
            let data = res.data.songs[0];
            let author = data.ar;
            let art = [];
            for (let i = 0; i < author.length; i++) {
              art.push(author[i].name);
            }
            let str = art.join("/")
            this.song = {
              name: data.name,
              url: data.al.picUrl,
              author: str
            };
          }
        })
        .catch(err => {
          console.log();
        });

      this.axios
        .get("http://localhost:3000/simi/playlist?id=" + this.songId)
        .then(res => {
          if (res.statusText === "OK") {
            let data = res.data.playlists;
            this.sheetlist = data;
            this.format();
            this.formatPlayCount();
          }
        });
      this.axios
        .get("http://localhost:3000/simi/song?id=" + this.songId)
        .then(res => {
          if (res.statusText === "OK") {
            let data = res.data.songs;
            this.songlist = data;
            this.formatAuthor();
            this.formatSonglist();
          }
        });
      this.axios
        .get(`http://localhost:3000/comment/hot?id=${this.songId}&type=0`)
        .then(res => {
          if (res.statusText === "OK") {
            let data = res.data.hotComments;
            this.hotcomments = data;
            this.isLoading = false;
          }
        });
    },
    format() {
      this.sheetlist = this.sheetlist.map(item => {
        let name = item.creator.nickname;
        return { ...item, nickname: name };
      });
    },
    formatSonglist() {
      this.songlist = this.songlist.map(item => {
        let str = item.album.picUrl;
        let a = item.album.name;
        return { ...item, url: str, album_name: a };
      });
    },
    formatPlayCount() {
      this.sheetlist = this.sheetlist.map(item => {
        if (item.playCount / 10000 >= 1) {
          let count = Math.floor(item.playCount / 10000);
          return { ...item, playCount: `${count}万` };
        }
      });
    },
    formatAuthor() {
      this.songlist = this.songlist.map(item => {
        let author = item.artists;
        let art = [];
        for (let i = 0; i < author.length; i++) {
          art.push(author[i].name);
        }
        let str = art.join("/");
        return { ...item, author_name: str };
      });
    },
    formatAlname() {
      this.songlist = this.sheetlist;
    },
    fromMoreSong(data) {
      this.songId = data;
      console.log(this.songId);
    }
  },
  components: {
    SongComments,
    Loading,
    MoreList,
    MoreSongs,
    SongPlay
  },
  watch: {
    songId(newVal) {
      this.initData();
    }
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  height: 690px;
  overflow: hidden;
  position: relative;
  background: #fff;
  z-index: 10;
}
.song {
  z-index: 10;
  position: relative;
  background-color: #f8f8f8;
  height: 100%;
  padding-bottom: 65px;
  .news{
    padding-bottom: 120px;
  }
  .song_bg {
    position: fixed;
    background-image: url(//music.163.com/api/img/blur/1410673427960641);
    opacity: 1;
    background-color: #161824;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    transform: scale(1.5);
    transform-origin: center top;
    left: 0;
    right: 0;
    top: 0;
    height: 100%;
    overflow: hidden;
    z-index: -1;
  }
}
</style>