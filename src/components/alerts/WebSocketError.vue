<template>
  <div class="modal fade show modal-container" v-if="showModalState" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title">{{modalTitleState}}</h6>
          <button type="button" @click="hideModal()" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>{{modalMessageState}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "WebSocketError",
  methods: {
    hideModal() {
      this.$store.dispatch('ui/clearModal');
    }
  },
  computed: {
    ...mapState({
      showModalState: state => state.ui.showModal,
      modalTitleState: state => state.ui.modalTitle,
      modalMessageState: state => state.ui.modalMessage,
    }),
  },
}
</script>

<style scoped>
.show {
  display: block !important;
}
.modal-container{
  margin-top: 5%;
  margin-left: 8.5%;
}
</style>