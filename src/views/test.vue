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
  <el-menu-item index="1">首页</el-menu-item>
  <el-menu-item index="2">好友</el-menu-item>
  <el-menu-item index="3">动态</el-menu-item>
  <el-menu-item index="4">发动态</el-menu-item>
  <el-menu-item index="5">我的分享</el-menu-item>
  <el-menu-item index="6">搜索文件</el-menu-item>
  <el-menu-item index="10" style="float:right;margin-right:1cm"><img  class="userImage" :src="userImg" alt="头像">&nbsp;&nbsp;{{userName}} 
  </el-menu-item>
  <!-- <h3 style="float:right;margin-right:1cm">欢迎,{{user}} </h3> -->
</el-menu>
   <br>
  <JwChat-index :config="config" :taleList="taleList" @enter="bindEnter" v-model="inputMsg" :toolConfig="tool"
  scrollType="scroll">
  <!-- <JwChat-rightbox :config="rightConfig" @click="rightClick" /> -->
  <div v-for="(user ,i) in userList">
    <JwChat-item :config="user" @click="bindClick" style="margin-bottom:0.3cm"/>
  </div>
  </JwChat-index>>

</div>
</template>


<script>
export default {
  data () {
    return {
      signature:'',
      activeIndex: '2',
      url: 'ws://'+ window.location.host + '/Room/',
      ws:null,
      userName:"taboo",
      userImg:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2987801098,1858423351&fm=26&gp=0.jpg",
      toUserName:"test",
      toUserNameImg:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2987801098,1858423351&fm=26&gp=0.jpg",
      currentPage:1,
      pageSize:5,
      userList:[],
      config1: {
                img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2987801098,1858423351&fm=26&gp=0.jpg',
        name: 'JwChat',
        dept: '最简单、最便捷',
        callback: this.bindCover
      },
      rightConfig:{
        tip: '群公告',
        notice: '【公告】这是一款高度自由的聊天组件，基于AVue、Vue、Element-ui开发。点个赞再走吧 ',
        listTip: '当前在线',
        list: [
          {
            name: 'JwChat',
            "img": "../image/three.jpeg"
          },
          {
            name: '留恋人间不羡仙',
            "img": "../image/one.jpeg"
          },
          {
            name: '只盼流星不盼雨',
            "img": "../image/two.jpeg"
          }
        ]
      },
      inputMsg: '',
      taleList: [
        {
          "date": "2020/04/25 21:19:07",
          "text": { "text": "起床不" },
          "mine": false,
          "name": "留恋人间不羡仙",
          "img": "../image/one.jpeg"
        },
        {
          "date": "2020/04/25 21:19:07",
          "text": { "text": "<audio data-src='https://www.w3school.com.cn/i/horse.mp3'/>" },
          "mine": false,
          "name": "只盼流星不盼雨",
          "img": "../image/two.jpeg"
        },
        {
          "date": "2020/04/25 21:19:07",
          "text": { "text": "<img data-src='../image/three.jpeg'/>" },
          "mine": false,
          "name": "只盼流星不盼雨",
          "img": "../image/two.jpeg"
        },
        {
          "date": "2020/04/16 21:19:07",
          "text": { "text": "<video data-src='https://www.w3school.com.cn/i/movie.mp4' controls='controls' />" },
          "mine": true,
          "name": "JwChat",
          "img": "../image/three.jpeg"
        },
      ],
      tool: {
        show: ['file', 'history', 'img'],
        callback: this.toolEvent
      },
      config: {
        img: "",
        name: "",
        dept: '我的签名',
        callback: this.headerEvent,
        historyConfig: {
          tip: '正在加载数据',
          callback: this.bindLoadHistory
        }
      },
    }
  },
  methods: {
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
    bindClick (play) {
      this.toUserName=play.value.name
      this.config.name=play.value.name
      this.toUserNameImg=play.value.img
      this.config.img=play.value.img
      this.initMessage()
    },
    rightClick (type) {
      console.log('rigth', type)
    },
    bindLoadHistory () {
                console.log("bug")
                var params = new URLSearchParams();
                params.append('fromName',this.userName);
                params.append('toName',this.toUserName);
                params.append('currentPage',this.currentPage+1);
                params.append('pageSize',this.pageSize);
                this.$axios.post('listmessagebypage',params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
                ).then(data => {
                    console.log(data);
                    var history=[]
                    var t=this
                    data.data.list.forEach(function(value,key){
                        var temp={
                          "date": value.time,
                          "text": { "text": value.message },
                          "mine": false,
                          "name": value.fromName,
                          "img": t.toUserNameImg
                        }
                        console.log(value.fromName==t.userNam)
                        if(value.fromName==t.userName){
                          temp.mine=true
                          temp.img=t.userImg
                        }
                        history.push(temp)
                        t.currentPage+=1;
                    })
                    history=history.reverse()
                    var list = history.concat(t.taleList)
                    t.taleList = list
                }).catch(err => {
                    console.error(err)
                    this.$alert('请求超时，刷新重试！')
                })
    },
    initMessage(){
                this.taleList=[]
                this.currentPage=1
                var params = new URLSearchParams();
                params.append('fromName',this.userName);
                params.append('toName',this.toUserName);
                params.append('currentPage',this.currentPage);
                params.append('pageSize',this.pageSize);
                this.$axios.post('listmessagebypage',params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
                ).then(data => {
                    console.log(data);
                    var history=[]
                    var t=this
                    data.data.list.forEach(function(value,key){
                        var temp={
                          "date": value.time,
                          "text": { "text": value.message},
                          "mine": false,
                          "name": value.fromName,
                          "img": t.toUserNameImg
                        }
                        if(value.fromName==t.userName){
                          temp.mine=true
                          temp.img=t.userImg
                        }
                        history.push(temp)

                    })
                    t.taleList = history.reverse()
                }).catch(err => {
                    console.error(err)
                    this.$alert('请求超时，刷新重试！')
                })
    },   
    bindEnter () {
      const msg = this.inputMsg
      if (!msg) return;
      const msgObj = {
        "date": new Date(),
        "text": { "text": msg },
        "mine": true,
        "name": this.userName,
        "img": this.userImg
      }
      this.taleList.push(msgObj)
      this.insertmessage(msg)
    },
    toolEvent (type) {
      console.log('tools', type)
    },
    headerEvent (type) {
      console.log('header', type)
    },
    getMyFriend(){
                var params = new URLSearchParams();
                params.append('name',this.userName);
                this.$axios.post('getmyfriends',params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
                ).then(data => {
                    console.log(data);
                    var l=this.userList
                    data.data.list.forEach(function(value,key){
                        var temp={
                          img: value.image,
                          name: value.friendname,
                          dept: 'hello',
                        }
                        l.push(temp)
                    })

                }).catch(err => {
                    console.error(err)
                    this.$alert('请求超时，刷新重试！')
                })
    },
      getMyFriendNew(){
        var t=this;
                var params = new URLSearchParams();
                params.append('name',this.userName);
                this.$axios.post('getmyfriendsNew',params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
                ).then(data => {
                    console.log(data);
                    var l=this.userList
                    data.data.list.forEach(function(value,key){
                        var temp={
                          img: t.userImg,
                          name: value.friendname,
                         
                        }
                        l.push(temp)
                    })

                }).catch(err => {
                    console.error(err)
                    this.$alert('请求超时，刷新重试！')
                })
    },
    insertmessage(friendmessage){
                this.sendMsg(friendmessage)
                var params = new URLSearchParams();
                params.append('fromname',this.userName);
                params.append('toname',this.toUserName);
                params.append('message',friendmessage);
                params.append('time',new Date());
                params.append('type',0);
                this.$axios.post('insertmessage',params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
                ).then(data => {
                    console.log(data);

                }).catch(err => {
                    console.error(err)
                    this.$alert('请求超时，刷新重试！')
                })
    },
        async joinRoom(){
      if(this.ws) {
        alert("你已经再聊天室");
        return;
      }
      let url = this.url;
      let username = this.userName;
      this.ws = new WebSocket('ws://'+this.chatBaseURL+'/chat/' + username);  // 后端的启动端口
      this.ws.onopen = this.webscoketonopen;
      this.ws.onmessage =  this.webscoketonmessage;
      //发生错误触发
      this.ws.onerror = function () {
        console.log("连接错误")
      };
      //正常关闭触发
      this.ws.onclose = function () {
        console.log("连接关闭");
      };
    }, 
    webscoketonopen(){
      console.log("与服务器成功建立连接");
    },
    webscoketonmessage(value){
      console.log(value);
      //this.content += (value.data + '\r\n') ;
      var s = eval("("+value.data+")");
      console.log(s);
      console.log(s.userName,s.message);
      if(s.userName==this.toUserName){
          const msgObj = {
            "date": new Date(),
            "text": { "text": s.message },
            "mine": false,
            "name": s.userName,
            "img": this.toUserNameImg
          }
          this.taleList.push(msgObj)
      }
    },
    exitRoom(){
      this.closeWebSocket();
    },
    sendMsg(message){
      if(!this.ws) {
        alert('你已经掉线，请重新加入');
        return;
      }
      if(this.ws.readyState === 1){
        var msg={
          message:message ,
          toUsername:this.toUserName
        }

        this.ws.send(JSON.stringify(msg));
      } else {
        alert('发送失败');
      }
    },
    closeWebSocket(){
      if(this.ws) {
        this.ws.close();
        this.ws = null;
      }
    },
    talking(content) {
      console.log(content);
    },
getUserImage(name){
                var params = new URLSearchParams();
                params.append("name",name)
                var t=this
                this.$axios.post('getImageJson',params
                ).then(res => {
                    console.log("response: ", res);
                    // new Blob([data])用来创建URL的file对象或者blob对象
                    t.userImg=res.data.image
                }).catch(err => {
                    console.error(err)
                    this.$alert('请求超时，刷新重试！')
                })
},
getIofo(){
                var params = new URLSearchParams();
                params.append("name",this.userName)
                var t=this
                this.$axios.post('getUser',params
                ).then(res => {
                  t.config.dept="用户签名:"+res.data.signature;
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
    this.userName=this.$cookie.get('user');
    console.log(this.toUserNameImg)
    this.config.img=this.toUserNameImg
    this.config.name=this.toUserName
    this.getMyFriendNew();
    //this.initMessage();
    this.taleList=[]
    this.joinRoom()
    //this.getUserImage(this.userName)
    this.getIofo();
  }
}
</script>
