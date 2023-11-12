<template>
  <div v-if="showSecurityState" class="security-info">
    <div class="row">
      <div class="col-12 text-center">
        <div class="security-icon-container mx-auto">
          <font-awesome-icon class="security-icon" icon="user-secret"/>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="security-password">
          <div v-if="showOldPassword" class="input-wrapper">
            <input type="password"
                   class="form-control"
                   placeholder="current pass"
                   v-model="oldPassword"/>
            <button @click="showOldPassword = false; showNewPassword = true"
                    class="btn btn-outline-secondary">
              <font-awesome-icon icon="check"/>
            </button>
          </div>
          <div v-if="showNewPassword" class="input-wrapper">
            <button @click="showNewPassword = false; showOldPassword = true;"
                    class="btn btn-outline-secondary">
              <font-awesome-icon icon="arrow-left"/>
            </button>
            <input type="password"
                   class="form-control"
                   placeholder="new pass"
                   v-model="newPassword"/>
            <button @click="showNewPassword = false; showRetypeNewPassword = true"
                    class="btn btn-outline-secondary">
              <font-awesome-icon icon="check"/>
            </button>
          </div>
          <div v-if="showRetypeNewPassword" class="input-wrapper">
            <button @click="showRetypeNewPassword = false; showNewPassword = true"
                    class="btn btn-outline-secondary">
              <font-awesome-icon icon="arrow-left"/>
            </button>
            <input type="password"
                   class="form-control"
                   placeholder="retype new pass"
                   v-model="retypeNewPassword"/>
            <button @click="updatePassword()"
                    class="btn btn-outline-secondary">
              <font-awesome-icon icon="paper-plane"/>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="error-message" :class="{'show' : errorMessage}">
          <div class="input-wrapper">
            {{ errorMessage }}
          </div>
        </div>
        <div class="success-message" :class="{'show' : successMessage}">
          <div class="input-wrapper">
            {{ successMessage }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import UserService from "@/services/user.service";

export default {
  name: 'SecurityComponent',
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      retypeNewPassword: "",
      showOldPassword: true,
      showNewPassword: false,
      showRetypeNewPassword: false,
      errorMessage: "",
      successMessage: "",
    }
  },
  methods: {
    updatePassword() {
      if (this.newPassword !== this.retypeNewPassword) {
        this.errorMessage = "Passwords do not match";
        return;
      }
      UserService.updatePassword(this.oldPassword, this.newPassword).then(
          response => {
            if (response.status !== 200) {
              this.errorResponse(response.data.message);
            }
            this.successResponse(response.data.message);
          },
          error => {
            this.errorResponse(error.response.data.message);
          }
      );
    },
    successResponse(message) {
      this.successMessage = message;
      setTimeout(() => {
        this.successMessage = '';
        this.errorMessage = '';
        this.oldPassword = "";
        this.newPassword = "";
        this.retypeNewPassword = "";
        this.showOldPassword = true;
        this.showNewPassword = false;
        this.showRetypeNewPassword = false;
      }, 3000);
    },
    errorResponse(message) {
      this.errorMessage = message;
      setTimeout(() => {
        this.successMessage = '';
        this.errorMessage = '';
        this.oldPassword = "";
        this.newPassword = "";
        this.retypeNewPassword = "";
      }, 3000);
    }
  },
  computed: {
    ...mapState({
      showSecurityState: state => state.ui.showSecurity
    }),
  },
}
</script>

<style scoped>
.security-info {
  margin-top: 20px;
}

.security-icon-container {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #e9e9e9;
}

.security-icon {
  font-size: 200px;
  color: #6c757ddb;
}

.security-password {
  margin-top: 20px;
  font-size: 20px;
}

.security-password input {
  width: 150px;
  margin: 0 5px;
}

.input-wrapper {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.error-message {
  color: rgba(255, 0, 0, 0.65);
  margin-top: 10px;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.error-message.show {
  opacity: 1;
}

.success-message {
  color: rgb(72, 165, 46);
  margin-top: 10px;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.success-message.show {
  opacity: 1;
}
</style>