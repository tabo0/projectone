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

<div style="margin-top: 15px;">
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
    <div>

    
  <el-input placeholder="请输入内容" v-model="input" class="input-with-select">

    <el-button  type="primary"  slot="append" icon="el-icon-search" @click="searchFile">搜索</el-button>
  </el-input>
</div>
  
  <div>
          <br>
    <el-table :data="list" border style="width: 100%" >
        <el-table-column
                type="selection"
                width="55">
        </el-table-column>
        <el-table-column type="index" label="序号">
        </el-table-column>
        <el-table-column  prop="fileName" label="文件名">
            <template slot-scope="scope">
                <svg  class="icon" aria-hidden="true">
                    <use  xlink:href="#icon-wenjian"></use>
                </svg>
                <el-link :underline="false" v-on:click="clickFile(scope.row.filename,scope.row.filepath)">{{scope.row.filename}}</el-link>
            </template>
        </el-table-column>
        <el-table-column label="文件路径">
            <template slot-scope="scope">
                <span>{{scope.row.filepath.substr(29)}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="len" label="大小">
            <template slot-scope="scope">
                <span>{{scope.row.len | filterType}}</span>
            </template>
        </el-table-column>
    </el-table>
  </div>
</div>


</template>
<style>
  .el-select .el-input {
    width: 130px;
  }

</style>
<script>
export default {
  data() {
    return {
      imgUrl:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2987801098,1858423351&fm=26&gp=0.jpg",
      activeIndex:'6',
      input: '',
      list:[],
      user:'123',

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
      searchFile(){
          console.log(this.input);
          var params = new URLSearchParams();
          params.append('searchContent',this.input);
          params.append('path',"/pan/"+this.user);
          this.$axios.post('selectFile',params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
          ).then(data => {
              console.log(data);
              this.list = data.data;
              }).catch(err => {
                  console.error(err)
                  this.$alert('请求超时，刷新重试！')
                  })
      },
      clickFile(fileName,filePath){

      },
  },
   mounted() {
       if(!this.$cookie.get('user')){
            alert("请登录!")
            this.$router.push({path:'/login'})
        }
        this.user=this.$cookie.get('user');
    }
}
</script>