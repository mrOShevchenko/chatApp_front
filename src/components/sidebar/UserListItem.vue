<template>
  <div @click="doOnClickItemBody(user, chat)"
       @mouseover="showTrashButton[user.id] = true"
       @mouseleave="showTrashButton[user.id] = false"
       class="clearfix">
    <img :src="user.image" alt="avatar">
    <div class="about">
      <div class="name">{{ user.username }}</div>
      <div v-if="user.isOnline === true" class="status">
        <i class="fa fa-circle online"></i> online
      </div>
      <div v-else class="status">
        <i class="fa fa-circle offline"></i> offline
      </div>
    </div>
    <div v-if="doOnClickTrashButton.toString() !== (() => {}).toString()">
      <button @click.stop="doOnClickTrashButton(user, chat)"
              v-if="showTrashButton[user.id] || forceShowTrashButton"
              class="btn btn-outline-secondary trash">
        <font-awesome-icon icon="trash"/>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserListItem",
  props: {
    user: {
      type: Object,
      required: true,
    },
    chat: {
      type: Object,
      required: true,
    },
    doOnClickItemBody: {
      type: Function,
      required: true,
    },
    doOnClickTrashButton: {
      type: Function,
      required: true,
    },
    forceShowTrashButton: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showTrashButton: [],
    }
  },
}
</script>

<style lang="scss" scoped>

</style>