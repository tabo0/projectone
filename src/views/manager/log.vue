<template>

<div>


    <div>
              <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1">日志记录</el-menu-item>
  <el-menu-item index="2">审核文件</el-menu-item>
  <el-menu-item index="3">查看审核通过的文件</el-menu-item>
  <el-menu-item index="10" style="float:right;margin-right:1cm"><img  class="userImage" :src="imgUrl" alt="头像">&nbsp;&nbsp;{{manager}} 
  </el-menu-item>
  <!-- <h3 style="float:right;margin-right:1cm">欢迎,{{user}} </h3> -->
</el-menu>
   <br>
    </div>
    
    
    <div>
        <el-table :data="list" border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column
                type="selection"
                width="55">
        </el-table-column>
        <el-table-column type="index" label="序号">
        </el-table-column>

        <el-table-column prop="createTime" label="请求时间">
        </el-table-column>
                <el-table-column prop="time" label="运行时间">
        </el-table-column>
                <el-table-column prop="operation" label="请求方法">
        </el-table-column>
        <el-table-column prop="ip" label="请求ip">
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
</div>
</template>
<style scoped>
.userImage{
    height: 40px;
    width: 40px;
    border-radius:50%;
    -webkit-border-radius:50%;
    -moz-border-radius:50%;
}
</style>
<script>
export default {
    data(){
        return{
            imgUrl:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1004454177,2389198999&fm=26&gp=0.jpg",
            manager:"",
            activeIndex:'1',
            list:[],
            pagesize:10,
            rowCount:0,
            currpage:1,
            selectArray:[],
        }
    },
    methods:{
            handleSelect(key, keyPath) {
                console.log(key);
                if(key==2){
                    this.$router.push({path:'/checkFile'})
                }else if(key==3){
                    this.$router.push({path:'/finishFile'})
                }else if(key==1){
                    this.$router.push({path:'/log'})
                }
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
          this.$axios.post('getLogByPage',params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
          ).then(data => {
              console.log(data);
              this.list = data.data;
              }).catch(err => {
                  console.error(err)
                  this.$alert('请求超时，刷新重试！')
                  })
      },
    setCount(){
        this.$axios.post('getLogCount'
          ).then(data => {
              console.log(data);
              this.rowCount = data.data;
              }).catch(err => {
                  console.error(err)
                  this.$alert('请求超时，刷新重试！')
                  })
      },
    },
    mounted(){
            if(!this.$cookie.get('manager')){
                alert("请登录!")
                this.$router.push({path:'/managerLogin'})
            }
            this.manager=this.$cookie.get('manager');
            this.init(1,this.pagesize);
            this.setCount();
    }
}
</script>