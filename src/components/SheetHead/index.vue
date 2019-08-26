<template>
    <div class="header">
      <div class="head_bg"></div>
      <div class="head_wrap">
        <div class="fl">
          <img class="head_img" :src="songsheet.coverImgUrl" alt />
          <span>歌单</span>
          <i class="playcount">{{countStr}}</i>
        </div>
        <div class="fr">
          <h2 class="head_title">{{songsheet.name}}</h2>
          <div class="author">
            <div class="avatar">
              <img :src="creator.avatarUrl" alt />
              <span></span>
            </div>
            {{creator.nickname}}
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    props: ['create','songst','coStr'],
    data(){
        return{
            creator: this.create,
            songsheet: this.songst,
            countStr: this.coStr
        }
    },
    watch: {
        create:{
            handler(newValue, oldValue){
                this.creator = newValue;
            }
        },
        songst:{
            handler(newValue, oldValue){
                this. songsheet = newValue;
            }
        },
        coStr:{
            handler(newValue, oldValue){
                this.countStr = newValue;
            }
        },
    }
}
</script>

<style lang="scss" scoped>
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
      width: 120px;
      height: 120px;
      background-color: #e2e2e3;

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

      .playcount {
        position: absolute;
        right: 2px;
        top: 0;
        z-index: 3;
        padding-left: 15px;
        color: #fff;
        font-size: 12px;
        background-position: 0;
        background-repeat: no-repeat;
        background-size: 11px 10px;
        text-shadow: 1px 0 0 rgba(0, 0, 0, 0.15);
      }
    }

    .fr {
      flex: 1 1 auto;
      width: 1%;
      margin-left: 16px;

      .head_title {
        padding-top: 1px;
        font-size: 17px;
        line-height: 1.3;
        color: #fefefe;
        height: 44px;
        -webkit-box-pack: center;
        font-weight: 400;
      }

      .author {
        width: 100%;
        display: block;
        position: relative;
        margin-top: 20px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: normal;
        color: hsla(0, 0%, 100%, 0.7);

        .avatar {
          position: relative;
          display: inline-block;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          vertical-align: middle;
          margin-right: 5px;

          img {
            width: 100%;
            vertical-align: middle;
            border-radius: 50%;
          }

          span {
            position: absolute;
            right: -5px;
            bottom: 0;
            width: 12px;
            height: 12px;
            background-image: url(//s3.music.126.net/mobile-new/img/usericn_2x.png?6423c06…=);
            background-repeat: no-repeat;
            background-size: 75px auto;
            background-position: -40px 0;
          }
        }
      }
    }
  }
}
</style>