<template>
    <div class="home">
        <Form @success="openModal"/>
        <div v-show="showModal" class="success-modal">
            <div class="modal">
                <div class="modal-inner">
                    <img class="success" src="../assets/success.png" alt="">
                    <div class="header">
                     <h2>Отлично!</h2>
                     <h3>Ваша заявка отправленна</h3>
                    </div>
                    <Button variant="secondary" :onClick="closeModal">Закрыть</Button>
                    <div class="close" @click="closeModal">
                      <img src="../assets/close.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Form from './Form.vue';
import Button from './ui/Button.vue';

export default {
  name: 'HomePage',
  components: {
   Form,
   Button
  },
  data () {
    return {
      showModal: false
    }
  },
  methods: {
    closeModal () {
      this.showModal = false
    },
    openModal (data) {
      this.showModal = true
      console.log(data)
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(227,244,228);
  background: url('../assets/background.jpg');
  background-size: cover;
  position: relative;
  .success-modal {
    width: 100%;
    height: 100vh;
    background: #0000005d;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .modal {
      width: 500px;
      height: 300px;
      border-radius: 5px;
      background-color: white;
      .modal-inner {
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      .success {
        width: 80px;
        height: 80px;
        object-fit: cover;
      }
      .close {
        position: absolute;
        top: 20px;
        right: 20px;
        color: black;
        & > img {
          width: 20px;
          height: 20px;
          object-fit: cover;
          cursor: pointer;
        }
      }
      }
    }
  }
}
</style>