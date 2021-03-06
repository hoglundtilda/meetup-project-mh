<template>
  <div class="city__autocomplete">
    <input
      type="text"
      @input="onChange"
      v-model="search"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter="onEnter"
      @click="onChange"
      placeholder="City"
    />
    <ul
      id="results__autocomplete__id"
      v-show="isOpen"
      class="results__autocomplete"
    >
      <li class="loading" v-if="isLoading">Loading results...</li>
      <li
        v-else
        v-for="(result, i) in results"
        :key="i"
        @click="setResult(result)"
        class="result__autocomplete"
        :class="{ 'is-active': i === arrowCounter }"
      >
        {{ result }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    cities: Array,
    isAsync: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data() {
    return {
      isOpen: false,
      results: [],
      search: "",
      isLoading: false,
      arrowCounter: 0,
    };
  },

  methods: {
    onChange() {
      this.$emit("input", this.search);

      if (this.isAsync) {
        this.isLoading = true;
      } else {
        this.filterResults();
        this.isOpen = true;
      }
    },

    filterResults() {
      this.results = this.cities.filter((item) => {
        return item.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
    },
    setResult(result) {
      this.search = result;
      this.isOpen = false;
      this.$emit("input", this.search);
    },
    onArrowDown(evt) {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1;
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
      }
    },
    onEnter() {
      this.search = this.results[this.arrowCounter];
      this.isOpen = false;
      this.arrowCounter = -1;
    },
    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.isOpen = false;
        this.arrowCounter = -1;
      }
    },
  },
  watch: {
    items: function (val, oldValue) {
      if (val.length !== oldValue.length) {
        this.results = val;
        this.isLoading = false;
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  destroyed() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>



<style lang="scss" scoped>
@import "@/assets/scss/variables";

.city__autocomplete {
  position: relative;
  height: 100%;

  input {
    outline: none;
    padding: 0 10px;
    border-radius: 4px;
    height: 100%;
    border: none;
    font-weight: 500;
    background: none;
    color: $white;
    font-size: 20px;
    width: 15em;
    letter-spacing: 1.5px;
  }

  input::placeholder {
    color: $white;
    letter-spacing: 2px;
    font-family: $font;
    font-size: 16px;
    height: 100%;
  }

  .results__autocomplete {
    padding: 0 10px;
    margin: 0;
    height: 120px;
    overflow: auto;
    width: 100%;
    background: $color_dark;
    color: $color_light;

    .result__autocomplete {
      list-style: none;
      text-align: left;
      padding: 4px 4px;
      cursor: pointer;
    }

    .result__autocomplete.is-active,
    .result__autocomplete:hover {
      background-color: $color_dark;
      color: $color_light;
    }
  }

  .results__autocomplete::-webkit-scrollbar {
    background: $color_dark;
    border-radius: 6px;
    width: 6px;
  }
  .results__autocomplete::-webkit-scrollbar-thumb {
    background: $color_light;
    border-radius: 6px;
  }
}
</style>