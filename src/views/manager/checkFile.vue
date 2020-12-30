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
 
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1">日志记录</el-menu-item>
  <el-menu-item index="2">审核文件</el-menu-item>
  <el-menu-item index="3">查看审核通过的文件</el-menu-item>
  <el-menu-item index="10" style="float:right;margin-right:1cm"><img  class="userImage" :src="imgUrl" alt="头像">&nbsp;&nbsp;{{manager}} 
  </el-menu-item>
  <!-- <h3 style="float:right;margin-right:1cm">欢迎,{{user}} </h3> -->
</el-menu>
   <br>

    <el-row >
        <span>{{ path }}</span>
        <el-button type="primary" @click="accept">审核通过</el-button>
         <el-button type="primary" @click="downLoadFile">下载</el-button>
          <el-button type="primary" @click="deleteFile">删除</el-button>
          





    </el-row>
    <br>
    <el-table :data="list" border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column
                type="selection"
                width="55">
        </el-table-column>
        <el-table-column type="index" label="序号">
        </el-table-column>
        <el-table-column  prop="filename" label="文件名">
            <template slot-scope="scope">
                <svg  class="icon" aria-hidden="true">
                    <use v-if="false" xlink:href="#icon-wenjianjia2"></use>
                    <use v-else xlink:href="#icon-wenjian"></use>
                </svg>
                <el-link :underline="false" v-on:click="clickFile(scope.row.filename,scope.row.filepath)">{{scope.row.filename}}</el-link>
            </template>
        </el-table-column>
        <el-table-column prop="len" label="大小">
            <template slot-scope="scope">
                <span>{{scope.row.len | filterType}}</span>
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
<style >
.taboo{
    display: inline;
    width: 50px
}
</style>
<script>
export default {
    data(){
        return {
            imgUrl:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1004454177,2389198999&fm=26&gp=0.jpg',
showViewer: false, 
manager:"",
            list: [],
            pagesize: 10,
            currpage: 1,
            rowCount:0,
            path:"",
            user:"taboo",
            pathArray:[],
            fileList: [],
            selectFileArray:[],
            activeIndex: '2'
        }
    },
    methods: {
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
        accept(){
            var t=this;
                this.selectFileArray.forEach(function(value){
                    t.setState(value.id,1);
                })
            },
        setState(id,state){
          var params = new URLSearchParams();
          params.append('id',id);
          params.append('state',state);
          this.$axios.post('updateFileState',params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
          ).then(data => {
                          this.currpage=1;
            this.findByPage(this.currpage,this.pagesize);
              }).catch(err => {
                  console.error(err)
                  this.$alert('请求超时，刷新重试！')
                  })
        },
        myShare(){
            var routeUrl=this.$router.resolve({path:'/myShare'})
            window.open(routeUrl .href, '_blank');
        },
        shareFile(){
            if(this.selectFileArray.length!=1){
                this.$message.error('只能选择一个文件!');
                return ;
            }
            if(this.selectFileArray[0].isDir=="true"){
                this.$message.error('不可以选择文件夹!');
                return ;
            }
            this.myMethods.shareFile(this.selectFileArray[0].filePath,this.selectFileArray[0].fileName,this.user,this);
        },
            handleCommand(command) {
                this.$message('开始' + command);
                var t=this;
                this.selectFileArray.forEach(function(value){
                    if(value.isDir=="false"){
                        t.myMethods.wordCount(value.filePath,t.user,value.fileName,t);
                    }
                })
            },
            closeViewer() {
                this.showViewer = false
             },
            downLoadFile(){
                var temp=[];
                var t=this;
                this.selectFileArray.forEach(function(value){
                        temp.push(value);
                        t.fileStream(value.filename,value.filepath);
                })
            },
            fileStream(fileName,filePath){
                var params = new URLSearchParams();
                params.append("filePath",filePath)
                this.$axios.post('downLoad',params, {responseType: 'blob'}
                ).then(res => {
                    console.log("response: ", res);
                    // new Blob([data])用来创建URL的file对象或者blob对象
                    let url = window.URL.createObjectURL(new Blob([res.data])); 
                    // 生成一个a标签
                    let link = document.createElement("a");
                    link.style.display = "none";
                    link.href = url;
                    // 生成时间戳
                    let timestamp=new Date().getTime();   
                    link.download = fileName;   
                    document.body.appendChild(link);
                    link.click();
                }).catch(err => {
                    console.error(err)
                    this.$alert('请求超时，刷新重试！')
                })
            },
            deleteFile(){
                var params = new URLSearchParams();
                var list=[];
                var t=this;
                 this.selectFileArray.forEach(function(value){
                     list.push(value.filepath);
                     t.setState(value.id,-1);
                })
                params.append('list',list);
                this.$axios.post('deleteFile',params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
                ).then(data => {
                    //console.log(data);
                    this.currpage=1;
                    this.findByPage(this.currpage,this.pagesize);
                }).catch(err => {
                    console.error(err)
                    this.$alert('请求超时，刷新重试！')
                })
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);

            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            findByPage(pageCode, pageSize) {
                var params = new URLSearchParams();
                params.append('currentPage',pageCode);
                params.append('pageSize',pageSize);
                this.$axios.post('getCheckFileBypage',params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
                ).then(data => {
                    console.log(data);
                    this.list = data.data;
                }).catch(err => {
                    console.error(err)
                    this.$alert('请求超时，刷新重试！')
                })
            },
            setRowCount(){
                this.$axios.post('getCheckFileCount'
                ).then(data => {
                    this.rowCount=data.data;
                }).catch(err => {
                    console.error(err)
                    this.$alert('请求超时，刷新重试！')
                })
            },
            upLoadSuccess(response, file, fileList){
                this.currpage=1;
                this.findByPage(this.currpage,this.pagesize);
            },
            handleCurrentChange(cpage) {
                this.currpage = cpage;
                this.findByPage(this.currpage,this.pagesize);

            },
            handleSizeChange(psize) {
                this.pagesize = psize;
                this.findByPage(this.currpage,this.pagesize);
            },
            handleSelectionChange(val) {
                console.log(val);
                console.log("val");
                this.selectFileArray=val;
            },
            clickFile(name,filePath){
                console.log(name);
                this.handlePreview(name,filePath)
            },
            mkdir(fileName){
                var params = new URLSearchParams();
                params.append('path',"/pan/"+this.user+"/"+this.path+"/"+fileName);
                this.$axios.post('mkdir',params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
                ).then(data => {
                    console.log(data);
                    if(data.data.state=="1"){
                        this.currpage=1;
                        this.findByPage(this.currpage,this.pagesize);
                        this.$message({
                            type: 'success',
                            message: '文件创建成功!'
                        });
                    }
                }).catch(err => {
                    console.error(err)
                    this.$alert('请求超时，刷新重试！')
                })  
            },
            inputFileName() {
                this.$prompt('请输入文件夹名', '新建文件夹', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/,
                inputErrorMessage: '文件夹格式不正确'
                }).then(({ value }) => {
                    this.mkdir(value);
                    this.$message({
                    type: 'success',
                    message: '开始创建文件夹: ' + value
                });
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });       
                });
            },
            returnLastPath(){
                if(this.pathArray.length>0){
                    this.pathArray.pop();
                    this.path=this.getpath();
                    this.findByPage(this.currpage,this.pagesize);
                }
            },
            getpath(){
                var ans="";
                this.pathArray.forEach(function(value,key,arr){
                    ans+=value+"/";
                })
                return ans;
            },
            handlePreview: function(fileName,filePath){
				//截取文件后缀名
				var index = fileName.lastIndexOf(".");
                var suffix = fileName.substr(index+1);
                var t=this
//  			console.log(suffix);
                if(this.compareImg(suffix)){//判断类型为图片
                    var params = new URLSearchParams();
                    params.append("filePath",filePath)
                    this.$axios.post('downLoad',params, {responseType: 'blob'}
                    ).then(res => {
                        console.log("response: ", res);
                        // new Blob([data])用来创建URL的file对象或者blob对象
                        let url = window.URL.createObjectURL(new Blob([res.data])); 
                        //t.imgUrl = "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1709644436,2739756540&fm=26&gp=0.jpg";
                        //t.imgUrl=url
                        t.showViewer = true;
                        console.log(t.imgUrl)
                        let routeUrl = t.$router.resolve({
                            path: "/image",
                            query: {imageUrl:url}
                        });
                        window.open(routeUrl .href, '_blank');
                    }).catch(err => {
                        console.error(err)
                        this.$alert('请求超时，刷新重试！')
                    })
				}
                else if(this.compareFile(suffix)||fileName=="part-r-00000"){
                        // window.open(
                        // "https://view.officeapps.live.com/op/view.aspx?src="+"http://119.3.167.84:8090/downLoad?filePath="+filePath,
                        // "_blank"
                        // );
                        let routeUrl = t.$router.resolve({
                            path: "/showFile",
                            query: {filePath:filePath}
                        });
                         window.open(routeUrl .href, '_blank');
                    // var params = new URLSearchParams();
                    // params.append("filePath",filePath)
                    // this.$axios.post('readfile',params, {responseType: 'blob'}
                    // ).then(res => {
                    //     console.log("response: ", res);
                    //     // new Blob([data])用来创建URL的file对象或者blob对象
                    //     let url = window.URL.createObjectURL(new Blob([res.data])); 
                    //     let routeUrl = t.$router.resolve({
                    //         path: "/showFile",
                    //         query: {fileUrl:url,filePath:filePath}
                    //     });
                    //     window.open(routeUrl .href, '_blank');
                    // }).catch(err => {
                    //     console.error(err)
                    //     this.$alert('请求超时，刷新重试！')
                    // })
                }else if(suffix=="mp4"){
                    let routeUrl = t.$router.resolve({
                        path: "/video",
                        query: {path:filePath}
                    });
                     window.open(routeUrl .href, '_blank');
                }
		},
compareFile(type){//比较图片类型
	let typsList = ['txt','docx','xlsx','pptx'];
		if(typsList.indexOf(type)> -1){//说明类型是图片
			return true;
		}else{
			return false;
		}
},

//判断类型为图片的方法
compareImg(type){//比较图片类型
	let typsList = ['bmp','jpg','png','gif','svg','webp'];
		if(typsList.indexOf(type)> -1){//说明类型是图片
			return true;
		}else{
			return false;
		}
},
getUserImage(name){
                var params = new URLSearchParams();
                params.append("name",name)
                var t=this
                this.$axios.post('getImageJson',params
                ).then(res => {
                    console.log("response: ", res);
                    // new Blob([data])用来创建URL的file对象或者blob对象
                    t.imgUrl=res.data.image
                }).catch(err => {
                    console.error(err)
                    this.$alert('请求超时，刷新重试！')
                })
}
        },
        filters:{
            filterType(val){
                if(val==0) return "0 B"
                var k=1024
                var sizes=["B","KB","MB","GB","TB","PB","EB","ZB","YB"],
                i=Math.floor(Math.log(val)/Math.log(k))
                return (val/Math.pow(k,i)).toPrecision(3)+" "+sizes[i]
            }
        },
         mounted() {
            if(!this.$cookie.get('manager')){
                alert("请登录!")
                this.$router.push({path:'/managerLogin'})
            }
            this.manager=this.$cookie.get('manager');
            this.findByPage(this.currpage,this.pagesize);
            this.setRowCount();
            //console.log(this.getpath());
            //this.getUserImage(this.user)
        }
}
</script>