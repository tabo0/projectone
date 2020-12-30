<template>
<div>
    <el-row>
        <h1>文件名:{{shareFile.filename}}</h1>
    </el-row>
    <el-row>
        <h1>分享时间:{{shareFile.sharetime}}</h1>
    </el-row>
    <el-row>
        <h1>分享人:{{shareFile.username}}</h1>
    </el-row>
    <el-row>
        <el-button type="primary" @click="downLoadFile">下载</el-button>
    </el-row>
</div>
</template>
<script>
export default {
    data(){
        return{
            shareFile:{}
        }
    },
    methods:{
            downLoadFile(){
                this.$message("开始下载,请稍等！");
                this.fileStream(this.shareFile.filename,this.shareFile.filepath);
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
    },
    mounted(){
        console.log(this.$route.params.code)
        var params = new URLSearchParams();
        params.append("code",this.$route.params.code)
        this.$axios.post('getShareFileBeanByCode',params
        ).then(res => {
            console.log("response: ", res);
            this.shareFile=res.data
        }).catch(err => {
            console.error(err)
            t.$alert('请求超时，刷新重试！')
        })
    }
}
</script>
