<template>
  <div v-if="showProfileState" class="profile-info">
    <div class="row">
      <div class="col-12 text-center">
        <div class="profile-image">
          <form @submit.prevent="uploadImage">
            <input type="file"
                   name="file"
                   class="hide"
                   id="profile-image-input"
                   @change="onFileSelected">
            <label for="profile-image-input">
              <img :src="userState.image"
                   class="rounded-circle"
                   alt="avatar"
              >
            </label>
          </form>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 text-center">
        <div class="profile-username">
          <div class="input-wrapper">
            <input type="text"
                   class="form-control"
                   :placeholder="userState.username"
                   v-model="username"/>
            <button @click="updateUsername"
                    class="btn btn-outline-secondary">
              <font-awesome-icon icon="pen"/>
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

export default {
  name: "ProfileComponent",
  data() {
    return {
      username: "",
      showUsernameEditIcon: false,
      errorMessage: "",
      successMessage: "",
      file: null,
    }
  },
  computed: {
    ...mapState({
      showProfileState: state => state.ui.showProfile,
      userState: state => state.user.user,
    }),
  },
  methods: {
    async updateUsername() {
      try {
        await this.$store.dispatch("user/updateUsername", this.username);
        this.successResponse("Username updated successfully");
      } catch (error) {
        this.errorResponse(error.response.data.message);
      }
    },
    // select the file to send
    onFileSelected(event) {
      this.file = event.target.files[0]
    },
    // sending form to server
    async uploadImage() {
      const formData = new FormData()
      formData.append('image', this.file)
      try {
        await this.$store.dispatch('user/uploadImage', formData);
        this.successResponse("Image updated successfully");
      } catch (error) {
        this.errorResponse(error);
      }
    },
    successResponse(message) {
      this.successMessage = message;
      setTimeout(() => {
        this.successMessage = '';
        this.errorMessage = '';
      }, 3000);
    },
    errorResponse(message) {
      this.errorMessage = message;
      setTimeout(() => {
        this.successMessage = '';
        this.errorMessage = '';
      }, 3000);
    }
  },
  watch: {
    file() {
      this.uploadImage()
    }
  }
}
</script>

<style scoped>
.profile-info {
  text-align: center;
  margin-top: 20px;
}

.profile-info img {
  width: 200px;
  height: 200px;
}

.profile-username {
  font-size: 20px;
  margin-top: 10px;
}

.profile-username input {
  width: 150px;
  margin: 0 5px;
}

.input-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-image {
  position: relative;
  display: inline-block; /* set the inline-block property for the image container */
}

.profile-image img {
  cursor: pointer;
}

.profile-image::before {
  font-size: 20px;
  content: "change image"; /* set the text that will be displayed on hover */
  display: none; /* by default, the pseudo-element must be hidden */
  position: absolute;
  top: 90%; /* place the pseudo-element in the center vertically */
  left: 0;
  transform: translate(0, -50%);
  padding: 5px;
  background-color: white;
  border-radius: 5px;
}

.profile-image:hover::before {
  display: block; /* when hovering over the image container, the pseudo-element will be displayed */
  z-index: 1; /* set the z-index so that the pseudo-element is on top of the image */
  width: 100%;
  text-align: center;
}

.hide {
  display: none;
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
  transition: opacity 1s ease-in-out; /* slowly transparency change animation */
}

.error-message.show {
  opacity: 1; /* full transparency when displaying an error message */
}

.success-message {
  color: rgb(72, 165, 46);
  margin-top: 10px;
  opacity: 0;
  transition: opacity 1s ease-in-out; /* slowly transparency change animation */
}

.success-message.show {
  opacity: 1; /* full transparency when displaying an error message */
}

</style>