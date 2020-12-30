<template>
    <video controls="controls" preload="auto">
        <source :src="this.videoUrl" type="video/mp4" >
    </video>
</template>
<script>
export default {
    data(){
        return {
            videoUrl:this.baseURL+'/downLoadMovie?filePath=hdfs://119.3.167.84:9000/pan/taboo/movie.mp4'
        }
    },
    mounted(){
        this.videoUrl=this.baseURL+'/downLoadMovie?filePath='+this.$route.query.path
    }
}
</script>