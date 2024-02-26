<template>
  <div class="input">
    <div class="input-box" :class="{'input-box__error': error}">
      <label :for="label">
        <input
          type="text" 
          :value="display"
          @input="onInput"
          v-bind="$attrs" 
        >
        <div 
          class="label" 
          :class="{'active': focused}"
        >
          <img v-if="required" src="../../assets/required.png" alt="img">
          {{ label }}
        </div>
      </label>
    </div>
    <div class="error" v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import mask from '@/directives/MaskDirective/mask'
import tokens from '@/directives/MaskDirective/tokens'
import masker from '@/directives/MaskDirective/masker'

export default {
  name: 'Input',
  props: {
    v: {
      type: Object,
      required: true
    },
    value: [String, Number],
    label: {
      type: String,
      required: false
    },
    error: {
      type: String,
      required: false
    },
    required: {
      type: Boolean,
      default: false
    },
  },
  directives: {mask},
  data () {
    return {
      lastValue: null,
      display: this.value,
      focused: false
    }
  },
  watch : {
    value (newValue) {
      if (newValue !== this.lastValue) {
        this.display = newValue
      }
    },
  },
  methods: {
    onInput (e) {
      this.refresh(e.target.value)
      this.v.$touch()
    },

    refresh (value) {
      this.display = value
      var newValue
      if (this.masked) {
        newValue = masker(value, this.mask, this.masked, this.tokens)
      } else {
        newValue = value
      }
      if (newValue !== this.lastValue) {
        this.lastValue = newValue
        this.$emit('input', newValue)
      }
    },

    onBlur () {
      this.v.$touch()
      if (this.lastValue) return
      this.focused = false
    }
  },
}
</script>

<style scoped lang="scss">
.input {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
  margin-top: 30px;
}
.input-box {
  width: auto;
  height: 35px;
  border: 1px solid #ccc;
  border-radius: 5px;
  position: relative;
  padding: 0px 10px;

  &__error {
    border-color: red;
  }

  & > label {
    width: 100%;
    height: 35px;
    display: inline-block;
    background: transparent;
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

  & input {
    display: inline-block;
    width: 100%;
    height: 35px;
    border: none;
    outline: none;
    background: transparent;
  }
}

.error {
  color: red;
  text-align: left;
  padding-top: 4px;
  font-size: 12px;
}

</style>