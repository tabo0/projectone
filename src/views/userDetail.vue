<template>
    <div>
        <h1>更换头像</h1>
        <el-upload
            :action="this.baseURL+'/putImage'"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :data="{name:user}">
            
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>
<script>
  export default {
    data() {
      return {
          user:"",
        dialogImageUrl: '',
        dialogVisible: false,
        url:""
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      showImage(){
                var params = new URLSearchParams();
                params.append("name","taboo")
                var t=this
                this.$axios.post('getImage',params, {responseType: 'blob'}
                ).then(res => {
                    console.log("response: ", res);
                    // new Blob([data])用来创建URL的file对象或者blob对象
                    let url = window.URL.createObjectURL(new Blob([res.data])); 
                    t.url=url
                }).catch(err => {
                    console.error(err)
                    this.$alert('请求超时，刷新重试！')
                })
      },
    showImageJson(){
                var params = new URLSearchParams();
                params.append("name","taboo")
                var t=this
                this.$axios.post('getImageJson',params
                ).then(res => {
                    console.log("response: ", res);
                    // new Blob([data])用来创建URL的file对象或者blob对象
                    t.url=res.data.image
                }).catch(err => {
                    console.error(err)
                    this.$alert('请求超时，刷新重试！')
                })
      }
    },
    mounted(){
            if(!this.$cookie.get('user')){
                alert("请登录!")
                this.$router.push({path:'/login'})
            }
            this.user=this.$cookie.get('user');
        this.showImageJson()
    }
  }
</script>