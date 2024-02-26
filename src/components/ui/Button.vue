<template>
  <button 
    :class="`btn ${variant} ${disabled}`"
    @click.prevent="onClick"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>
<script>

export default {
  props: {
    variant: {
      type: String,
      default: 'primary'
    },
    onClick: {
      type: Function,
      required: false
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
  }
}

</script>

<style scoped lang="scss">
.btn {
  padding: 8px 14px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #77d5cb;
  color: #666666;
  cursor: pointer;

  &.true {
      opacity: 0.6;
  }
}

.primary {
  background: white;
  color: #77d5cb;

  &:hover {
      background: #77d5cc2a;
  }
}
.secondary {
  background: #77d5cb;
  color: white;
  
  &:hover {
      background: #77d5ccc9;
  }
}
</style>