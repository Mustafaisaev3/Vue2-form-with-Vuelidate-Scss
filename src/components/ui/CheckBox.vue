<template>
  <label class="wrapper">
    <div class="label">
      {{ label }}
    </div>
    <input class="checkbox" type="checkbox" :checked="isChecked" :value="value" @change="updateInput"/>
    <span class="checkmark"></span>
  </label>
</template>
  
<script>
export default {
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    value: { type: String },
    modelValue: { default: "" },
    label: { type: String, required: true},
    trueValue: { default: true },
    falseValue: { default: false }
  },
  computed: {
    isChecked() {
      if (this.modelValue instanceof Array) {
        return this.modelValue.includes(this.value)
      }
      return this.modelValue === this.trueValue
    }
  },
  methods: {
    updateInput(event) {
      let isChecked = event.target.checked
      if (this.modelValue instanceof Array) {
        let newValue = [...this.modelValue]
        if (isChecked) {
          newValue.push(this.value)
        } else {
          newValue.splice(newValue.indexOf(this.value), 1)
        }
        this.$emit('change', newValue)
      } else {
        this.$emit('change', isChecked ? this.trueValue : this.falseValue)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  height: 19px;
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 28px;
  margin-top: 20px;
  margin-bottom: 10px;
  cursor: pointer;
  font-size: 22px;
  user-select: none;
  font-size: 16px;

  & .label {
    font-size: 14px;
    color: #666666;
  }

  & input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    width: 18px;
    height: 18px;
    border-radius: 0px;
    background-color: #eee;
    border: 1px solid #ccc;
  }
  &:hover input ~ .checkmark {
    background-color: #ccc;
  }
  & input:checked ~ .checkmark {
    background-color: #77d5cb;
  }
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }
  & input:checked ~ .checkmark:after {
    display: block;
  }
  & .checkmark:after {
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
}

</style>