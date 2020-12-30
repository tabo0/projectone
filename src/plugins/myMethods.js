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
    },
    shareFile(filePath,fileName,username,t){
        var params = new URLSearchParams();
        params.append("filePath",filePath)
        params.append("username",username)
        params.append("fileName",fileName)
        axios.post('shareFile',params
        ).then(res => {
            console.log("response: ", res);
            
            t.$alert('链接:getShareFileByCode/'+res.data.message, '分享成功', {
                confirmButtonText: '确定',
              });


        }).catch(err => {
            console.error(err)
            t.$alert('请求超时，刷新重试！')
        })
    },
    myPost(t,params,method,message){
        axios.post(method,params
        ).then(res => {
            t.$message(message);
        }).catch(err => {
            console.error(err)
            t.$alert('请求超时，刷新重试！')
        })
    }
}