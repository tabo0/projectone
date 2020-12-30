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
    <el-row>
        <el-button type="primary" @click="deleteShare">删除分享</el-button>
    </el-row>
</div>
  <div>
          <br>
    <el-table :data="list" border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column
                type="selection"
                width="55">
        </el-table-column>
        <el-table-column type="index" label="序号">
        </el-table-column>
        <el-table-column  prop="filename" label="文件名">
        </el-table-column>
        <el-table-column  prop="code" label="链接">

            <template slot-scope="scope">
                <a :href="'/#/getShareFileByCode/'+scope.row.code" target="_Blank">{{scope.row.code}}</a>
            </template>
        </el-table-column>
        <el-table-column  prop="sharetime" label="分享时间">
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
      activeIndex:"5",
      list:[],
      user:'123',
      selectArray:[]

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
      handleSelectionChange(val) {
          console.log(val);
          this.selectArray=val;
      },
      init(){
          var params = new URLSearchParams();
          params.append('username',this.user);
          this.$axios.post('getShareFileBeanByUsername',params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
          ).then(data => {
              console.log(data);
              this.list = data.data;
              }).catch(err => {
                  console.error(err)
                  this.$alert('请求超时，刷新重试！')
                  })
      },
      deleteShare(){
          var t=this;
          this.selectArray.forEach(function(value){
            var params = new URLSearchParams();
            params.append('id',value.id);
            t.myMethods.myPost(t,params,"deleteShareFileById","删除成功");
            
          })
      }
      
  },
   mounted() {
       if(!this.$cookie.get('user')){
            alert("请登录!")
            this.$router.push({path:'/login'})
        }
        this.user=this.$cookie.get('user');
        this.init();
    }
}
</script>