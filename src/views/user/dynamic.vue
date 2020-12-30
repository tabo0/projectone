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
   
          </div>
          <br>

    <el-table :data="list" border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column label="动态">
            <template slot-scope="scope" >
                <el-row>
                  <el-col >{{scope.row.dynamic.username}}</el-col>
                </el-row>
                <el-row>
                  <el-col >
                      {{scope.row.dynamic.time}}
                  </el-col>
                </el-row>
                <el-row>
                  <el-col >{{scope.row.dynamic.content}}</el-col>
                </el-row>
                <el-row >
                  <el-col>
                      <div class="demo-image__preview">
                        <el-image 
                            style="width: 300px; height: 300px"
                            :src="'http://119.3.249.45:8090'+'/getDunamicImage?imageId='+scope.row.imageId" 
                            :preview-src-list="['http://119.3.249.45:8090'+'/getDunamicImage?imageId='+scope.row.imageId]"
                            >
                        </el-image>
                      </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="20">点赞数:{{scope.row.dynamic.likenum}}</el-col>
                  <el-col :span="2"><el-button type="primary" icon="el-icon-thumb" circle v-on:click="addLikeNum(scope.row.dynamic.id)"></el-button></el-col>
                  <el-col :span="2"><el-button type="primary" icon="el-icon-chat-line-round" circle  v-on:click="addComment(scope.row.dynamic.id)"></el-button></el-col>
                </el-row>
                <el-divider></el-divider>
                <div>
                    <p v-for="item in scope.row.comment" >{{item.username}}:{{item.content}} </p>
                </div>
            </template>
        </el-table-column>

    </el-table>
       <el-pagination background
                   layout="prev, pager, next, sizes, total, jumper"
                   :page-sizes="[3, 5, 10, 20]"
    :page-size="pagesize"
    :total="rowCount"
    @current-change="handleCurrentChange"  
    @size-change="handleSizeChange" 
    >
    </el-pagination>
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
      list:[],
      user:'123',
      selectArray:[],
      pagesize:3,
      rowCount:0,
      currpage:1,
      imgUrl:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2987801098,1858423351&fm=26&gp=0.jpg',
      activeIndex:'3'

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
      addLikeNum(id){
          var params = new URLSearchParams();
          params.append('dynamicid',id);
          params.append('username',this.user);
          this.$axios.post('addLike',params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
          ).then(data => {
              this.$message('点赞成功!');
              }).catch(err => {
                  console.error(err)
                  this.$alert('点赞失败！')
                  })
      },
      insertComment(id,content){
          var params = new URLSearchParams();
          params.append('dynamicid',id);
          params.append('username',this.user);
          params.append('content',content);
          this.$axios.post('addComment',params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
          ).then(data => {
              this.$message('评论成功!');
              }).catch(err => {
                  console.error(err)
                  this.$alert('评论失败！')
                  })
      },
      addComment(id){
          var t=this;
          this.$prompt('请输入评论内容', '回复', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          t.insertComment(id,value);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      },
      handleCurrentChange(cpage){
        this.currpage = cpage;
        this.init(this.currpage,this.pagesize);

      },
      handleSizeChange(psize){
        this.pagesize = psize;
        this.init(this.currpage,this.pagesize);
      },
      handleSelectionChange(val) {
          console.log(val);
          this.selectArray=val;
      },
      init(currpage,pagesize){
          var params = new URLSearchParams();
          params.append('currentPage',currpage);
          params.append('pageSize',pagesize);
          this.$axios.post('getDynamicBypage',params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
          ).then(data => {
              console.log(data);
              this.list = data.data;
              }).catch(err => {
                  console.error(err)
                  this.$alert('请求超时，刷新重试！')
                  })
      },
      setCount(){
        this.$axios.post('getDynamicCount'
          ).then(data => {
              console.log(data);
              this.rowCount = data.data;
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
        this.init(1,3);
        this.setCount();
    }
}
</script>