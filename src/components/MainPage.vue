<template>
  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
  <div class="container">
    <div class="row clearfix">

      <div class="col-lg-12">

        <div class="card chat-app">
          <!-- Error Popup -->
          <web-socket-error/>
          <!-- Sidebar -->
          <div id="plist" class="people-list">
            <!-- Search -->
            <search-list/>
            <!-- Chats -->
            <chats-list/>
            <!-- Followed Users -->
            <followed-users-list/>
            <!-- Settings -->
            <settings-list/>
            <!-- Blocked Users -->
            <blocked-users-list/>
          </div>
          <!-- Navbar -->
          <div class="bar">
            <nav-bar/>
          </div>
          <!-- Chat -->
          <div class="chat">
            <chat-component/>
            <profile-component/>
            <security-component/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChatsList from "@/components/sidebar/ChatsList.vue";
import FollowedUsersList from "@/components/sidebar/FollowedUsersList.vue";
import BlockedUsersList from "@/components/sidebar/BlockedUsersList.vue";
import SettingsList from "@/components/sidebar/SettingsList.vue";
import NavBar from "@/components/sidebar/NavBar.vue";
import SearchList from "@/components/sidebar/SearchList.vue";
import ChatComponent from "@/components/chat/ChatComponent.vue";
import ProfileComponent from "@/components/profile/ProfileComponent.vue";
import SecurityComponent from "@/components/profile/SecurityComponent.vue";
import WebSocketError from "@/components/alerts/WebSocketError.vue";

import DeviceService from "@/services/device.service";

export default {
  name: 'MainPage',
  components: {
    WebSocketError,
    SecurityComponent,
    ProfileComponent,
    ChatsList,
    ChatComponent,
    SearchList,
    NavBar,
    FollowedUsersList,
    BlockedUsersList,
    SettingsList,
  },
  mounted() {
    this.$store.dispatch('user/setUser');
    this.$messaging.getToken({vapidKey: "BDq6PaLGzELQX_sNx-7sWZgXV2LZ-A08L6gwmPweuUnvtt_dRcfFKzHnSxhDIKKd5uX2Uc68qxX67VH6sv4JrDQ"})
        .then((currentToken) => {
          if (currentToken) {
            // console.log('Token: ', currentToken);
            DeviceService.addDevice(currentToken);
          } else {
            console.log('No registration token available. Request permission to generate one.');
          }
        }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
  },
};
</script>

<style>

body {
  background-color: #f4f7f6;
  margin-top: 20px;
}

.card {
  height: 600px;
  background: #fff;
  transition: .5s;
  border: 0;
  margin-bottom: 30px;
  border-radius: .55rem;
  position: relative;
  width: 100%;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
}

.bar {
  width: 280px;
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 20px;
  z-index: 7;
  border-right: 1px solid #eaeaea;
  height: 80px;
}

.bar .btn {
  margin: 0 4px;
}

.chat-app .people-list {
  width: 280px;
  position: absolute;
  left: 0;
  top: 0;
  padding: 20px;
  z-index: 7
}

.chat-app .chat {
  margin-left: 280px;
}

.people-list {
  -moz-transition: .5s;
  -o-transition: .5s;
  -webkit-transition: .5s;
  transition: .5s;
  border-right: 1px solid #eaeaea;
  height: 520px;
}

.people-list .chat-list li {
  padding: 10px 15px;
  list-style: none;
  border-radius: 3px
}

.people-list .chat-list li:hover {
  background: #efefef;
  cursor: pointer
}

.people-list .chat-list li.active {
  background: #efefef
}

.people-list .chat-list li .name {
  font-size: 15px
}

.people-list .chat-list img {
  width: 45px;
  border-radius: 50%
}

.people-list img {
  float: left;
  border-radius: 50%
}

.people-list .about {
  float: left;
  padding-left: 8px
}

.people-list .status {
  color: #999;
  font-size: 13px
}

.people-list .trash {
  float: right;
  line-height: 0.5;
  margin-left: 5px;
  margin-top: 5px;
}

.chat .chat-header {
  padding: 15px 20px;
  border-bottom: 2px solid #f4f7f6
}

.chat .chat-header .contact {
  line-height: 0.5;
  margin-left: 5px;
}

.chat .chat-header img {
  float: left;
  border-radius: 40px;
  width: 40px
}

.chat .chat-header .chat-about {
  float: left;
  padding-left: 10px
}

.chat .chat-history {
  overflow: auto;
  height: 440px;
  padding: 20px;
  border-bottom: 2px solid #fff;
}

.chat .chat-history ul {
  padding: 0
}

.chat .chat-history ul li {
  list-style: none;
  margin-bottom: 30px
}

.chat .chat-history ul li:last-child {
  margin-bottom: 0px
}

.chat .chat-history .message-data {
  margin-bottom: 15px
}

.chat .chat-history .message-data img {
  border-radius: 40px;
  width: 40px
}

.chat .chat-history .message-data-time {
  color: #434651;
  padding-left: 6px
}

.chat .chat-history .message {
  color: #444;
  padding: 18px 20px;
  line-height: 26px;
  font-size: 16px;
  border-radius: 7px;
  display: inline-block;
  position: relative
}

.chat .chat-history .message:after {
  bottom: 100%;
  left: 7%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-bottom-color: #fff;
  border-width: 10px;
  margin-left: -10px
}

.chat .chat-history .my-message {
  background: #efefef
}

.chat .chat-history .my-message:after {
  bottom: 100%;
  left: 30px;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-bottom-color: #efefef;
  border-width: 10px;
  margin-left: -10px
}

.chat .chat-history .other-message {
  background: #e8f1f3;
  text-align: right;
}

.chat .chat-history .other-message:after {
  border-bottom-color: #e8f1f3;
  left: 80%
}

.chat .chat-message {
  padding: 20px
}

.online,
.offline,
.me {
  margin-right: 2px;
  font-size: 8px;
  vertical-align: middle
}

.online {
  color: #86c541
}

.offline {
  color: #e47297
}

.me {
  color: #1d8ecd
}

.float-right {
  float: right
}

.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0
}

@media only screen and (max-width: 767px) {
  .card {
    height: 465px;
  }

  .chat-app .people-list {
    height: 465px;
    width: 100%;
    overflow-x: auto;
    background: #fff;
    left: -400px;
    display: none
  }

  .chat-app .people-list.open {
    left: 0
  }

  .chat-app .chat {
    margin: 0
  }

  .chat-app .chat .chat-header {
    border-radius: 0.55rem 0.55rem 0 0
  }

  .chat-app .chat-history {
    height: 300px;
    overflow-x: auto
  }
}

@media only screen and (min-width: 768px) and (max-width: 992px) {
  .card {
    height: 650px;
  }

  .chat-app .chat-list {
    height: 650px;
    overflow-x: auto
  }

  .chat-app .chat-history {
    height: 600px;
    overflow-x: auto
  }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 1) {
  .card {
    height: 480px;
  }

  .chat-app .chat-list {
    height: 480px;
    overflow-x: auto
  }

  .chat-app .chat-history {
    height: calc(100vh - 350px);
    overflow-x: auto
  }
}

.not-react {
  pointer-events: none;
}
</style>