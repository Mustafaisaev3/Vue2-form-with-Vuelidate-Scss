<template>
  <div class="select" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{'open': open, 'error': error}" @click="open = !open">
      {{ selected.title }}
    </div>
    <div class="label">
      <img v-if="required" src="../../assets/required.png" alt="img">
      {{ label }}
    </div>
    <div class="error-msg" v-if="error">{{ error }}</div>
    <div class="items" :class="{'selectHide': !open}">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="
          selected = option;
          open = false;
          $emit('input', option);
          v.$touch();
        "
        :class="{'active': option.title === selected.title}"
      >
        {{ option.title }}
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  props: {
    v: {
      type: Object,
      required: true
    },
    options: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      required: false
    },
    value: {
      default: () => []
    },
    required: {
      type: Boolean,
      default: false
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    error: {
      type: String,
      required: false,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      selected: this.default
        ? this.default
        : this.options.length > 0
        ? this.options[0]
        : null,
      open: false,
    };
  },
  mounted() {
    this.$emit("input", this.selected);
  },
};
</script>
<style scoped lang="scss">
.select {
  position: relative;
  width: 100%;
  margin-bottom: 10px;
  margin-top: 30px;
  text-align: left;
  outline: none;
  height: 35px;
  line-height: auto;

  & .selected {
    height: 35px !important;
    background-color: #ffffff;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 0px 8px;
    min-height: 30px;
    color: #666666;
    padding-left: 1em;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &.error {
      border: 1px solid red
    }
  }

  & .selected:after {
    position: absolute;
    content: "";
    top: 16px;
    right: 1em;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-color: #666666 transparent transparent transparent;
  }

  & .label {
    width: auto;
    height: fit-content;
    font-size: 14px;
    color: #666666;
    display: flex; 
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -24px;
    left: 0;
    padding: 0px;
    background: transparent;
    transition: all 0.1s;

    & > img {
        width: 6px;
        height: 6px;
        padding-right: 2px;
    }
  }

  & .items {
    color: #666666;
    border-radius: 6px;
    overflow: hidden;
    position: absolute;
    background-color: #ffffff;
    box-shadow: 0 3px 3px 2px #e3e3e3;
    left: 0;
    right: 0;
    z-index: 1;
  }

  & .items div {
    color: #666666;
    padding-left: 1em;
    padding: 5px 10px;
    cursor: pointer;
    user-select: none;

    &.active {
        background-color: #77d5cb;
        color: #ffffff;
    }
  }

  & .items div:hover {
    background-color: #77d5cc70;
  }

  & .items div:hover.active {
    background-color: #77d5cb;
  }

  .error-msg {
    color: red;
    text-align: left;
    padding-top: 4px;
    font-size: 12px;
  }

  .selectHide {
    display: none;
  }
}

</style>