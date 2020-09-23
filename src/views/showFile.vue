<template>
<div>


    <div v-for="(str,i) in list">
        <h4>{{str}}</h4>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
            fileUrl:"123",
            list:[]
        }
    },
        methods:{
        init(){
                    var t=this
                    var params = new URLSearchParams();
                    params.append("filePath",this.$route.query.filePath)
                    this.$axios.post('readfile',params,
                    ).then(res => {
                        console.log("response: ", res);
                        t.list=res.data.list
                    }).catch(err => {
                        console.error(err)
                        this.$alert('请求超时，刷新重试！')
                    })
        }
    },
    mounted(){
        //this.fileUrl=this.$route.query.fileUrl
        //alert(this.fileUrl)
        this.init()
    }
}
</script>