<template>
  <div class="events__wrapper">
    <h1>Events</h1>
    <ul>
      <li
        class="event"
        @click="goTo(event._id)"
        v-for="event in events"
        :key="event._id"
      >
        <Event :event="event" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Event from "@/components/Event";
export default {
  components: {
    Event,
  },
  data: () => {
    return {};
  },
  computed: {
    ...mapState({
      events: (state) => {
        if (state.filtered.length !== 0) {
          return state.filtered;
        } else {
          return state.events;
        }
      },
    }),
  },
  methods: {
    getAll() {
      this.$store.dispatch("getAllEvents");
    },
    goTo(id) {
      this.$router.push("/event/" + id).then(() => window.scrollTo(0, 0));
    },
  },
  created() {
    this.getAll();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.events__wrapper {
  padding: 0 10%;
  h1 {
    color: $white;
    font-size: 32px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;

    li {
      cursor: pointer;
    }
  }
}
</style>