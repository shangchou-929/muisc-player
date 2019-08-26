<template>
  <div>
    <div class="search_list" v-show="isFlag">
      <div class="title">
        <h3>热门搜索</h3>
      </div>
      <ul class="list">
        <li class="item" v-for="item in listItem" :key="item.name" @tap="gotoSearch(item.searchWord)">
          <span>{{item.searchWord}}</span>
        </li>
      </ul>
    </div>
    <div class="search_content" v-show="!isFlag">
      <h3>搜索“{{keyword}}”</h3>
      <ul>
        <li class="search_list" v-for="(word,index) in  matchItem" :key="index" @tap="gotoSearch(word.keyword)"> 
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
          <div class="search_word">
            <p>{{word.keyword}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    props:['list','str', 'matchList','flag'],
    data(){
        return{
          listItem: this.list,
          keyword: this.str,
          matchItem: this.matchList,
          isFlag: this.flag
        }
    },
    methods:{
      gotoSearch(keyword){
        this.$emit('sendKeyWords',keyword);
      }
    },
    watch:{
       str: {
           handler(newVal){
               this.keyword = newVal;
           }
       },
        list: {
           handler(newVal){
               this.listItem = newVal;
           }
       },
        matchList: {
           handler(newVal){
               this.matchItem = newVal;
           }
       },
        flag: {
           handler(newVal){
               this.isFlag = newVal;
           }
       },

    },
};
</script>

<style lang="scss" scoped>
.search_list {
  margin-left: 10px;
  .title {
    margin-top: 10px;
    h3 {
      font-size: 12px;
      line-height: 12px;
      color: #666;
      font-weight: 400;
    }
  }
  .list {
    .item {
      display: inline-block;
      color: #333;
      font-size: 14px;
      margin: 10px 0;
      span {
        padding: 5px 10px;
        display: inline-block;
        margin-right: 8px;
        border-radius: 20px;
        border: 1px solid #f0f0f0;
      }
    }
  }
}
.search_content {
  h3 {
    height: 50px;
    margin-left: 10px;
    padding-right: 10px;
    font-size: 15px;
    line-height: 50px;
    color: #507daf;
    border-bottom: 1px solid #f0f0f0;
  }
  .search_list {
    height: 45px;

    display: flex;
    .search_icon {
      width: 15px;
      height: 15px;
      margin-top: 16px;
    }
    .search_word {
      flex: 1;
      width: 287px;
      margin-left: 8px;
      border-bottom: 1px solid #f0f0f0;
      font-size: 15px;
      line-height: 45px;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>