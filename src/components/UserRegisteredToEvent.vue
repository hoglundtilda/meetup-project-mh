<template>
  <div class="image__wrapper">
    <img :src="user.image" alt="user" />
  </div>
</template>

<script>
export default {
  name: "UserRegisteredToEvent",
  props: { user: Object },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.image__wrapper {
  width: 40px;
  height: 40px;
  background: $white;
  border-radius: 100%;

  img {
    border-radius: 100%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>