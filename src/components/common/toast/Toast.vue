<template>
  <div class="toast" v-show="isShow">
    <div class="toast-content">{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  // props: {
  //   message: {
  //     type: String,
  //     default: ""
  //   },
  //   isShow: {
  //     type: Boolean,
  //     default: false
  //   }
  // }

  data() {
    return {
      message: "",
      isShow: false
    }
  },
  methods: {
    show(message, duration) {
      this.message = message;
      this.isShow = true;

      setTimeout(() => {
        this.message = "";
        this.isShow = false;
      }, duration)
    }
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  z-index: 10;
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 3px;
}

.toast .toast-content {
  padding: 8px 10px;
}
</style>