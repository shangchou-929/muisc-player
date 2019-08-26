<template>
  <div class="searchWrapper" ref="searchWrapper">
    <div class="wrap">
      <Loading v-if="isLoading"></Loading>
      <div class="content" v-else>
        <div class="search">
          <div class="inputcover">
            <div @tap="find">
              <svg
                t="1565319822881"
                class="search_icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2073"
                width="16"
                height="16"
              >
                <path
                  d="M978.649 984.802c-9.598 9.598-25.176 9.598-34.798 0l-279.218-279.218c-66.298 55.667-151.692 89.307-245.035 89.307-210.656 0-381.445-170.789-381.445-381.445 0-210.681 170.789-381.445 381.445-381.445 210.656 0 381.445 170.765 381.445 381.445 0 99.594-38.489 189.984-101.021 257.931l278.628 278.628c9.623 9.598 9.623 25.2 0 34.798zM751.825 413.445c0-183.488-148.739-332.227-332.227-332.227s-332.227 148.739-332.227 332.227c0 183.488 148.739 332.227 332.227 332.227 183.488 0 332.227-148.739 332.227-332.227z"
                  p-id="2074"
                  fill="#C9C9CA"
                />
              </svg>
            </div>
            <input class="input" type="search" placeholder="搜索歌曲、歌手、专辑" ref="input" v-model="str" />
            <figure class="close">
              <svg
                t="1565320722638"
                class="delete_icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4405"
                width="16"
                height="16"
              >
                <path
                  d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m192 768L512 576 320 768 256 704l192-192-192-192 64-64 192 192 192-192 64 64-192 192 192 192-64 64z"
                  fill="#BCBDBD"
                  p-id="4406"
                />
              </svg>
            </figure>
          </div>
        </div>
        <SearchKeyWords
          v-show="isShow"
          :list="list"
          :str="str"
          :matchList="matchList"
          :flag="flag"
          @sendKeyWords="findKeyWords"
        ></SearchKeyWords>
        <SearchResult v-show="!isShow" :resultList="resultList" :bestmatch="bestmatch" :str="str"></SearchResult>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import { format } from "path";
import SearchResult from "@/components/SearchResult";
import SearchKeyWords from "@/components/SearchKeyWords";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      list: [],
      str: "",
      flag: true,
      matchList: [],
      resultList: [],
      isLoading: false,
      isShow: true,
      bestmatch: {}
    };
  },
  activated() {
    if (this.list.length > 0) {
      return;
    }
    this.axios.get("http://localhost:3000/search/hot/detail").then(res => {
      if (res.statusText === "OK") {
        let data = res.data.data;
        this.formatList(data);
      }
    });
    this.$nextTick(() =>{
      this._initScroll();
    })
  },
  methods: {
    _initScroll() {
      this.searchWrapper = new BScroll(this.$refs.searchWrapper, {
        tap: true,
        probetype: 1
      });
    },
    search() {
      let word = this.str.trim();
      if (!word) {
        this.flag = true;
        return;
      }
      this.axios
        .get(
          `http://localhost:3000/search/suggest?keywords=${this.str}&type=mobile`
        )
        .then(res => {
          if (res.statusText === "OK") {
            let data = res.data.result.allMatch;
            this.matchList = data;
            console.log(this.matchList);
            this.flag = false;
          }
        });
    },
    formatList(data) {
      for (let i = 0; i < 10; i++) {
        this.list.push(data[i]);
      }
      console.log(this.list);
    },
    formatAuthor() {
      this.resultList = this.resultList.map(song => {
        let arr = [];
        for (let i = 0; i < song.artists.length; i++) {
          let str = song.artists[i].name;
          arr.push(str);
        }
        let a = arr.join("/");
        return { ...song, author: a };
      });
    },
    find() {
      this.isLoading = true;
      this.axios
        .get("http://localhost:3000/search/multimatch?keywords=" + this.str)
        .then(res => {
          if (res.statusText === "OK") {
            let data = res.data.result;
            this.bestmatch = data;
            this.formatBest();
          }
        });
      this.axios
        .get("http://localhost:3000/search?keywords=" + this.str)
        .then(res => {
          if (res.statusText === "OK") {
            let data = res.data.result.songs;
            this.resultList = data;
            console.log(this.resultList);
            this.formatAuthor();
            this.flag = false;
            this.isShow = false;
            this.$nextTick(() => {
              this.isLoading = false;
            });
          }
        });
    },
    formatBest() {
      let result = this.bestmatch;
      let album_name = "";
      let album_pic = "";
      let addtion = "";
      let author = "";
      let picUrl = "";
      if (result.album) {
        album_name = result.album[0].name;
        album_pic = result.album[0].picUrl;
        addtion = result.album[0].artist.name;
      }

      if (result.artist) {
        author = result.artist[0].name;
        picUrl = result.artist[0].picUrl;
      }
      this.bestmatch = {
        ...this.bestmatch,
        album_name: album_name,
        author: author,
        picUrl: picUrl,
        album_pic: album_pic,
        addtion: addtion
      };
    },
    findKeyWords(data) {
      this.str = data;
      console.log(data);
      this.find();
    }
  },
  watch: {
    str: {
      handler(newVale, oldValue) {
        this.search();
      }
    }
  },
  components: {
    Loading,
    SearchResult,
    SearchKeyWords
  }
};
</script>

<style lang="scss" scoped>
.searchWrapper{
  position: relative;
  height: 674px;
  overflow: hidden;
}
.wrap{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.content {
  margin-top: 120px;
  background: #fbfcfd;
  padding-bottom: 282px;
  .search {
    padding: 15px 10px;
    border-bottom: 1px solid #f0f0f0;
    .inputcover {
      position: relative;
      width: 100%;
      height: 30px;
      padding: 0 30px;
      box-sizing: border-box;
      background: #ebecec;
      border-radius: 30px;
      line-height: 30px;

      .search_icon {
        position: absolute;
        left: 0;
        top: 9px;
        margin: 0 8px;
        vertical-align: middle;
      }

      .input {
        width: 100%;
        height: 30px;
        line-height: 18px;
        background: transparent;
        font-size: 14px;
        color: #c9c9c9;
        border: none;
        &:focus {
          outline: none;
        }
      }

      .close {
        display: none;
        position: absolute;
        right: 0;
        top: 0;
        width: 30px;
        line-height: 30px;
        text-align: center;

        .delete_icon {
          width: 15px;
          height: 15px;
        }
      }
    }
  }
}
</style>

