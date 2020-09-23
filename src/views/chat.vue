<template>
    <div class="roomStyle">
    <br>欢迎使用<strong>VueTest</strong>极简聊天室：<br/><br/>
    <textarea id="content" v-model="content" cols="60" rows="30" readonly="readonly"></textarea><br>
    发送给谁?<input type="text" v-model="toUsername">
    <br>
    <input type="text" v-model="message">
    <button type="button" @click="sendMsg()">发送消息</button>
    <br/><br/>
    用户：<input type="text" v-model="user">
    <button @click="joinRoom()">加入群聊</button>
    <button @click="exitRoom()">退出群聊</button>
</div>
</template>
<script>
export default {
  name: 'pageRoom',
  data() {
    return {
      url: 'ws://'+ window.location.host + '/Room/',
      ws: null,
      user: '',
      message: '',
      content: '',
      toUsername:""
    }
  },
  created(){
  },
  methods: {
    async joinRoom(){
      if(this.ws) {
        alert("你已经再聊天室");
        return;
      }
      let url = this.url;
      let username = this.user;
      this.ws = new WebSocket('ws://127.0.0.1:8090/chat/' + username);  // 后端的启动端口
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
      this.content += (value.data + '\r\n') ;
    },
    exitRoom(){
      this.closeWebSocket();
    },
    sendMsg(){
      if(!this.ws) {
        alert('你已经掉线，请重新加入');
        return;
      }
      if(this.ws.readyState === 1){
        var msg={
          message:this.message ,
          toUsername:this.toUsername
        }

        this.ws.send(JSON.stringify(msg));
        this.message = '';
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
    }
  }
}
</script>
<style>
.roomStyle{
  text-align: center;
  background-color: rgba(15, 161, 230, 0.35);
  margin: 0 auto;
  border: 1px solid #000;
  width: 600px;
  height: 650px
}
</style>