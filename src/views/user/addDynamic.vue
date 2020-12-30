
<style scoped>
.userImage{
    height: 40px;
    width: 40px;
    border-radius:50%;
    -webkit-border-radius:50%;
    -moz-border-radius:50%;
}
</style>
<template>
<div>
  <div>

          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1">首页</el-menu-item>
  <el-menu-item index="2">好友</el-menu-item>
  <el-menu-item index="3">动态</el-menu-item>
  <el-menu-item index="4">发动态</el-menu-item>
  <el-menu-item index="5">我的分享</el-menu-item>
  <el-menu-item index="6">搜索文件</el-menu-item>
  <el-menu-item index="10" style="float:right;margin-right:1cm"><img  class="userImage" :src="imgUrl" alt="头像">&nbsp;&nbsp;{{user}} 
  </el-menu-item>
  <!-- <h3 style="float:right;margin-right:1cm">欢迎,{{user}} </h3> -->
</el-menu>
   <br>

  </div>
  <form id=“form” name=“form” method=“post” enctype=“multipart/form-data”>
  <el-row>
    <h1>写动态</h1>
  </el-row>
    <el-input
  type="textarea"
  :rows="2"
  placeholder="请输入动态内容"
  v-model="textarea">
</el-input>

    <div>
        <h1>添加图片后自动上传动态</h1>
        <el-upload
            :action="this.baseURL+'/addDynamicContent'"
            list-type="picture-card"
            :on-change="handlePictureCardChange"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :data="{content:textarea,username:user}"
            :auto-upload="true">
            
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
    <div>
          <!-- <h1>添加视频</h1> -->
<!-- <el-upload
  class="upload-demo"
  drag
  :action="this.baseURL+'/addDynamic'"
  multiple
  :auto-upload="false"
  :data="{content:textarea,username:user,imageFile:imageFile}"
  :on-change="handleVideoPreview">
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">只能上传视频文件</div>
</el-upload> -->
    </div>
    <!-- <el-row>
      <el-button type="primary" @click="add">发表</el-button>
    </el-row> -->

  </form>
</div>

</template>

<script>
import $ from 'jquery'
export default {
  data() {
    return {
      imgUrl:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2987801098,1858423351&fm=26&gp=0.jpg",
      activeIndex:"4",
      textarea: '',
      user:"",
      dialogImageUrl: '',
      dialogVisible: false,
      url:"",
      imageFile:'',
      videoFile:'',
      id:0,
      file:[]
    }
  },
  methods:{
                handleSelect(key, keyPath) {
                console.log(key);
                if(key==2){
                    this.$router.push({path:'/test'})
                }else if(key==10){
                    var routeUrl=this.$router.resolve({path:'/userDetail'})
                    window.open(routeUrl .href, '_blank');
                }else if(key==3){
                    this.$router.push({path:'/dynamic'})
                }else if(key==1){
                    this.$router.push({path:'/list'})
                }else if(key==4){
                    this.$router.push({path:'/addDynamic'})
                }else if(key==5){
                    this.$router.push({path:'/myShare'})
                }else if(key==6){
                    this.$router.push({path:'/select'})
                }
            },
    add(){
         var params = new  FormData();
         this.file=[];
         this.file.push(this.imageFile);
         this.file.push(this.videoFile);
          params.append('content',this.textarea);
          params.append('file',this.file);
          params.append('likenum',0);
          params.append('username',this.user);
          //params.append('videoList',this.videoFile);
          // this.$axios.post('addDynamicTest',params, {headers: {'Content-Type': 'multipart/form-data'}}
          // ).then(data => {
          //     console.log(data);
          //     }).catch(err => {
          //         console.error(err)
          //         this.$alert('请求超时，刷新重试！')
          //         })
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        this.imageFile=file;
        console.log(file);
      },
      handlePictureCardChange(file){
        this.imageFile=file;
      },
      handleVideoPreview(file){
        this.videoFile=file;
        console.log(file);
      }
  },
  mounted(){
    if(this.imageFile==''){
      console.log("Kong")
    }
    if(!this.$cookie.get('user')){
        alert("请登录!")
        this.$router.push({path:'/login'})
    }
    this.user=this.$cookie.get('user');
  }
}
</script>