<template>
  <div class="user-details__wrapper">
    <section class="left">
      <div class="img__container">
        <i
          v-if="showChangePhoto"
          @click="showFileUpload"
          class="fas fa-cog"
        ></i>
        <img :src="user.image" alt />
      </div>
      <div class="upload-file__container">
        <input
          v-if="ifFileUpload"
          @change="imagePicker"
          ref="file"
          type="file"
          name="file"
          id="input-files"
          class="new-image__input"
          single
        />
        <button v-if="ifFileUpload" @click="uploadFile">Upload</button>
      </div>
    </section>
    <section class="right">
      <h4>{{ user.name }}</h4>
      <section class="user-stats__section">
        <p>{{ attend_to }} events attended</p>
        <p>{{ user.comments.length }} comments written</p>
      </section>
      <button
        v-if="showAddEvent"
        class="add-event__button"
        @click="goTo('/addevent')"
      >
        Add event
      </button>
    </section>
  </div>
</template>

<script>
export default {
  props: { user: Object, showAddEvent: Boolean, showChangePhoto: Boolean },
  data: () => {
    return {
      ifFileUpload: false,
    };
  },
  computed: {
    attend_to() {
      if (!this.user.attend_to) {
        return 0;
      } else {
        return this.user.attend_to.length;
      }
    },
  },
  methods: {
    showFileUpload() {
      this.ifFileUpload = !this.ifFileUpload;
    },
    imagePicker() {
      this.file = this.$refs.file.files[0];
    },
    uploadFile() {
      let formData = new FormData();
      formData.append("profile-image", this.file);
      this.$store.dispatch("addProfileImage", formData);
    },
    goTo(path) {
      if (this.$route.path !== path) {
        this.$router.push(path);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";
@import "@/assets/scss/style_mixins";

.user-details__wrapper {
  width: 60%;
  height: 300px;
  border-radius: 20px;
  padding: 3rem;
  display: flex;
  align-items: center;
  background: $color_dark;

  .left {
    width: 350px;
    .img__container {
      align-self: center;
      width: 200px;
      height: 200px;
      border-radius: 100%;

      .fa-cog {
        z-index: 1;
        position: absolute;
        color: $white;
        cursor: pointer;
        font-size: 30px;
        margin: 10px;
        color: $color_light;
      }

      .fa-cog:hover {
        @include pop;
      }

      img {
        @include profile_image;
      }
    }

    .upload-file__container {
      display: flex;
      margin-left: auto;
      align-items: center;
      margin-top: 10px;

      button {
        @include button;
        font-size: 0.8rem;
      }
    }
  }

  .right {
    width: 100%;
    height: 100%;
    text-align: right;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    h4 {
      font-size: 2rem;
    }

    .user-stats__section {
      p {
        font-size: 1rem;
      }
    }

    .add-event__button {
      @include button;
      align-self: flex-end;
    }
  }
}

@keyframes pop {
  50% {
    transform: scale(1.1);
  }
}
</style>