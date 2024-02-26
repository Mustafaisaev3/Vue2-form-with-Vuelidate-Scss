<template>
  <div class="multiselect" 
    @click="handleMultiselectClick" 
    @blur="focused = false" 
    :class="{'multiselect__error': error}"
    tabindex="-1"
  >
    <div 
      class="multiselect__selected"
      v-for="(option, i) in formatedOptions"
      :key="i"
      v-if="option.checked"
    >
      {{ option[displayProperty] }}
      <span 
        class="multiselect__remove"
        @click="preventClose($event);handleOptionClick(i)"
      > 
        &times; 
      </span>
    </div>
    <div class="label">
        <img v-if="required" src="../../assets/required.png" alt="img">
        {{ label }}
    </div>
    <div class="multiselect__options" v-show="focused" @click="preventClose">
      <div 
        v-for="(option, i) in formatedOptions"
        :key="i"
        class="multiselect__option"
        :class="{'multiselect__option--checked': option.checked}"
        @click="handleOptionClick(i)"
      >
        <div class="multiselect__checkbox"></div>
        <div class="multiselect__text">
          {{ option[displayProperty] }}
        </div>
      </div>
    </div>
    <div class="error" v-if="error">{{ error }}</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      focused: false
    }
  },
  props: {
      v: {
        type: Object,
        required: true
      },
      options: {
        type: Array,
        default: () => []
      },
      value: {
        default: () => []
      },
      label: {
        type: String,
        required: true
      },
      error: {
        type: String,
        required: false
      },
      placeholder: {
        type: String,
        default: 'Click to select'
      },
      required: {
        type: Boolean,
        default: false
      },
      displayProperty: {
        type: String,
        default: 'name'
      },
      valueProperty: {
        type: String,
        default: 'value'
      },
  },
  computed: {
    formatedOptions () {
      let formatted = this.options.map(option => {
        let checked = this.value.some(val => val === option[this.valueProperty])
        return {...option, checked}
      })
      return formatted
    }
  },
  methods: {
      handleMultiselectClick () {
          this.focused = !this.focused
      },
      handleOptionClick (i) {
          let targetValue = this.options[i][this.valueProperty];
          let newValue = [...this.value]
          let existIndex = this.value.findIndex(val => val === targetValue)
          if (existIndex === -1) {
              newValue.push(targetValue)
          } else {
              newValue.splice(existIndex, 1)
          }
          this.$emit('input', newValue)
          this.v.$touch()
          console.log(this.v)
      },
      preventClose (e) {
          e.stopPropagation()
      }
  },
  mounted() {
      console.log(this.v, 'multiselect')
  }
}
</script>
<style lang="scss">
.multiselect {
  width: 100%;
  height: 35px;
  background: #fff;
  padding: 3px 8px;
  margin-bottom: 10px;
  margin-top: 30px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  min-height: 33px;
  min-width: 222px;
  position: relative;
  display: flex;
  flex-wrap: wrap;

  &__error {
    border: 1px solid red;
  }

  &:focus {
    outline: none;
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

  &__placeholder {
    color: #929292;
  }

  &__selected {
    width: auto;
    font-size: 12px;
    padding: 2px 8px;
    margin: 3px 3px;
    border-radius: 5px;
    background-color: #77d5cc7a;
  }

  &__remove {
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    color: red;
    
    &:hover {
        font-weight: bold;
    }
  }

  &__options {
    position: absolute;
    top: calc(100% + 5px);
    right: 0;
    left: 0;
    display: flex;
    background: #fff;
    flex-direction: column;
    box-shadow: 0 3px 3px 2px #e3e3e3;
    padding: 5px 0;
    min-height: 55px;
    max-height: 188px;
    overflow-y: auto;
    z-index: 10;
  }

  &__option {
    padding: 6px 11px;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  &__option--checked {
    color: #77d5cb;
    font-weight: bold;
  }

  &__checkbox {
    width: 18px;
    height: 18px;
    border: 1px solid #969696;
    margin-right: 7px;
    position: relative;
  }

  &__text {
    font-size: 14px;
  }

  &__option--checked &__checkbox {
    border: 1px solid #77d5cb;
    background: #77d5cb;
  }

  &__option--checked &__checkbox::after {
    width: 9px;
    height: 4px;
    border-left: 2px solid rgb(255, 255, 255);
    border-bottom: 2px solid rgb(255, 255, 255);
    content: "";
    z-index: 9999;
    position: absolute;
    transform: rotate(-45deg);
    left: 4px;
    top: 4px;
  }

  .error {
    color: red;
    text-align: left;
    position: absolute;
    bottom: -20px;
    left: 0;
    padding-top: 4px;
    font-size: 12px;
  }
}
    
</style>