import axios from 'axios'
export default{
    wordCount(path,name,fileName,t){
        console.log(path)
        var params = new URLSearchParams();
        params.append("name",name)
        params.append("filePath",path)
        params.append("fileName",fileName)
        axios.post('wordcount',params
        ).then(res => {
            console.log("response: ", res);
            t.$message("单词统计成功!已经保存到大数据操作结果文件夹下!");
        }).catch(err => {
            console.error(err)
            t.$alert('请求超时，刷新重试！')
        })
    }
}