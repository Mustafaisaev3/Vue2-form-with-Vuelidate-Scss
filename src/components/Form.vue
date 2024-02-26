<template>
  <form class="form" @submit.prevent="submitHandler" novalidate>
      <div class="form__title">
        <h2>{{ formLabel }}</h2>
      </div>
      <div class="stepper-container">
        <div class="stepper">
          <div class="stepper-progress">
            <div class="stepper-progress-bar" :style="'width:' + stepperProgress "></div>
          </div>

          <div class="stepper-item" :class="{ 'current': step == item, 'success': step > item }" v-for="item in Steps" :key="item">
            <div class="stepper-item-counter">
              <img class="icon-success" src="https://www.seekpng.com/png/full/1-10353_check-mark-green-png-green-check-mark-svg.png" alt="">
              <span class="number">
                {{ item }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="form_fieldset" v-if="step === Steps.ATTRIBUTES">
        <div class="box" >
          <Input 
            :v="$v.formReg.name" 
            v-model="formReg.name" 
            type="text" 
            :masked="false" 
            placeholder="Имя" 
            label="Имя" 
            :error="$v.formReg.name.$error && 'Введите ваше Имя'"
            :required="true"
          />
          <Input 
            v-model="formReg.lustname" 
            :v="$v.formReg.lustname" 
            type="text" 
            :masked="false" 
            placeholder="Фамилия" 
            label="Фамилия" 
            :error="$v.formReg.lustname.$error && 'Введите вашу Фамилию'"
            :required="true"
          />
        </div>
        <div class="box" >
          <Input 
            :v="$v.formReg.surname" 
            v-model="formReg.surname" 
            type="text" 
            :masked="false" 
            placeholder="Отчество" 
            label="Отчество" 
            :error="$v.formReg.surname.$error && 'Введите ваше Отчество'"
          />
          <MaskInput 
            mask="##/##/####" 
            v-model="formReg.birth" 
            :v="$v.formReg.birth" 
            type="text" 
            :masked="true" 
            placeholder="Дата рождения" 
            label="Дата рождения" 
            :error="$v.formReg.birth.$error && 'Введите вашу Дату рождения'"
            :required="true"
          />
        </div>
        <div class="box" >
          <MaskInput 
            mask="+7 (###) ####-##" 
            v-model="formReg.phone" 
            :v="$v.formReg.phone" 
            type="text" 
            :masked="true" 
            placeholder="+7 (###) ####-##" 
            label="Номер телефона" 
            :error="$v.formReg.phone.$error && 'Введите номер телефона'"
            :required="true"
          />
          <Input 
            v-model="formReg.gender" 
            :v="$v.formReg.gender" 
            type="text" 
            :masked="false" 
            placeholder="Пол" 
            label="Пол" 
            :error="$v.formReg.gender.$error && 'Введите ваш Пол (Мужской/Женский)'"
          />
        </div>
        <div class="box" >
          <Multiselect 
            :label="'Группа клиентов'"
            :options="clientsGroup" 
            :display-property="'title'" 
            :value-property="'shortcut'" 
            v-model="formReg.selectedClientsGroup" 
            :v="$v.formReg.selectedClientsGroup"
            :error="$v.formReg.selectedClientsGroup.$error && 'Выберите Группу клиентов'"
            :required="true"
          />
          <Select 
            :label="'Лечащий врач'"
            :options="doctors" 
            :tabindex="1" 
            v-model="formReg.selectedDoctor"
            :v="$v.formReg.selectedDoctor" 
          />
        </div>
        <div class="box">
          <CheckBox label="Не отправлять СМС." value="foo" v-model="formReg.dontSendSMS" />
        </div>
      </div>

      <div class="form_fieldset" v-if="step === Steps.ADDRESS">
        <div class="box">
          <Input 
            v-model="formReg.index" 
            :v="$v.formReg.index" 
            type="text" 
            :masked="false" 
            placeholder="Индекс" 
            label="Индекс" 
            :error="$v.formReg.index.$error && 'Введите Индекс'"
          />
          <Input 
            v-model="formReg.country" 
            :v="$v.formReg.country" 
            type="text" 
            :masked="false" 
            placeholder="Страну" 
            label="Страну" 
            :error="$v.formReg.country.$error && 'Введите Страну'"
          />
        </div>
        <div class="box">
          <Input 
            v-model="formReg.region" 
            :v="$v.formReg.region" 
            type="text" 
            :masked="false" 
            placeholder="Область" 
            label="Область" 
            :error="$v.formReg.region.$error && 'Введите Область'"
          />
          <Input 
            v-model="formReg.city" 
            :v="$v.formReg.city" 
            type="text" 
            :masked="false" 
            placeholder="Город" 
            label="Город" 
            :error="$v.formReg.city.$error && 'Введите Город'"
            :required="true"
          />
        </div>
        <div class="box">
          <Input 
            v-model="formReg.street" 
            :v="$v.formReg.street" 
            type="text" 
            :masked="false" 
            placeholder="Улица" 
            label="Улица" 
            :error="$v.formReg.street.$error && 'Введите Улицу'"
          />
          <Input 
            v-model="formReg.house" 
            :v="$v.formReg.house" 
            type="text" 
            :masked="false" 
            placeholder="Дом" 
            label="Дом" 
            :error="$v.formReg.house.$error && 'Введите Дом'"
          />
        </div>
      </div>
      <div class="form_fieldset" v-if="step === Steps.PASSPORT">
        <div class="box">
          <Select 
            :options="documentType" 
            :tabindex="1" 
            label="Тип документа"
            v-model="formReg.document"
            :v="$v.formReg.document" 
            :error="$v.formReg.document.$error && 'Выберите Тип документа'"
            :required="true"
          />
          <Input 
            v-model="formReg.series" 
            :v="$v.formReg.series" 
            type="text" 
            :masked="false" 
            placeholder="Серия" 
            label="Серия" 
            :error="$v.formReg.series.$error && 'Введите Серию'"
          />
        </div>
        <div class="box">
          <Input 
            v-model="formReg.number" 
            :v="$v.formReg.number" 
            type="text" 
            :masked="false" 
            placeholder="Номер" 
            label="Номер" 
            :error="$v.formReg.number.$error && 'Введите Номер'"
          />
          <Input 
            v-model="formReg.issuedBy" 
            :v="$v.formReg.issuedBy" 
            type="text" 
            :masked="false" 
            placeholder="Кем выдан" 
            label="Кем выдан" 
            :error="$v.formReg.issuedBy.$error && 'Кем выдан'"
          />
        </div>
        <div class="box">
          <MaskInput 
            mask="##/##/####" 
            v-model="formReg.issuedDate" 
            :v="$v.formReg.issuedDate" 
            type="text" 
            :masked="true" 
            placeholder="Дата выдачи" 
            label="Дата выдачи" 
            :error="$v.formReg.issuedDate.$error && 'Введите Дату выдачи'"
            :required="true"
          />
        </div>
      </div>
      <div class="form__actions">
        <Button :variant="'primary'" :onClick="onBack">{{ backBtnText }}</Button>
        <Button :variant="'secondary'" :onClick="onNext">{{ nextBtnText }}</Button>
      </div>
  </form>
</template>
<script>
import { required, minLength, alpha } from 'vuelidate/lib/validators'
import Input from './ui/Input.vue';
import MaskInput from './ui/MaskInput.vue';
import Multiselect from './ui/Multiselect.vue';
import Select from './ui/Select.vue';
import Button from './ui/Button.vue'
import CheckBox from './ui/CheckBox.vue'

const STEPS = {
  ATTRIBUTES: 1,
  ADDRESS: 2,
  PASSPORT: 3
}

export default {
  name: 'Form',
  components: {
    Input,
    MaskInput,
    Multiselect,
    Select,
    Button,
    CheckBox
  },
  data () {
    return {
      formReg: {
        lustname: '',
        name: '',
        surname: '',
        birth: '',
        phone: '',   
        gender: '',   
        clientGroup: '',   
        doctor: '',   
        sendSMS: '', 
        selectedDays: [],
        selectedClientsGroup: [],
        selectedDoctor: '',
        dontSendSMS: false,

        index: '',
        country: '',
        region: '',
        city: '',
        street: '',
        house: '',

        document: '',
        series: '',    
        number: '',
        issuedBy: '',
        issuedDate: '',

      },
      clientsGroup: [
        {title: 'VIP', shortcut: 'vip'},
        {title: 'Проблемные', shortcut: 'проблемные'},
        {title: 'ОМС', shortcut: 'омс'},
      ],
      doctors: [
        {title: 'Иванов', shortcut: 'Иванов'},
        {title: 'Захаров', shortcut: 'Захаров'},
        {title: 'Чернышева', shortcut: 'Чернышева'},
      ],
      documentType: [
        {title: 'Паспорт', shortcut: 'Паспорт'},
        {title: 'Свидетельство о рождении', shortcut: 'Свидетельство о рождении'},
        {title: 'Вод. удостоверение', shortcut: 'Вод. удостоверение'},
      ],
      step: 1
    }
  },
  computed: {
    Steps () {
      return STEPS
    },
    formLabel () {
      switch (this.step) {
          case STEPS.ATTRIBUTES:
            return 'Атрибуты формы'
          case STEPS.ADDRESS:
            return 'Адрес'
          case STEPS.PASSPORT:
            return 'Паспорт'
          default:
            return 'Атрибуты формы'
      }
    },
    backBtnText () {
      return 'Назад'
    },
    nextBtnText () {
      if (this.step === STEPS.PASSPORT) {
        return 'Зарегистрироваться'
      }  
      return 'Вперёд'
    },
    stepperProgress() {
      return ( 100 / 2 ) * ( this.step - 1 ) + '%'
    }
  },
  methods: {
    onBack () {
      if (this.step === 1) {
        return
      }
      this.step = this.step - 1
    },
    onNext () {
      if (this.step === STEPS.ATTRIBUTES) {
        this.$v.formReg.lustname.$touch()
        this.$v.formReg.name.$touch() 
        this.$v.formReg.birth.$touch() 
        this.$v.formReg.phone.$touch() 
        this.$v.formReg.selectedClientsGroup.$touch()

        if  (
          this.$v.formReg.lustname.$error | 
          this.$v.formReg.name.$error | 
          this.$v.formReg.birth.$error | 
          this.$v.formReg.phone.$error | 
          this.$v.formReg.selectedClientsGroup.$error 
        ) {
            return
        }
      }  

      if (this.step === STEPS.ADDRESS ) {
        this.$v.formReg.city.$touch()
        console.log(this.$v.formReg.city.$error,this.$v.formReg.city,'werwerwer')

        if (this.$v.formReg.city.$error) {
            return
        }
      }  
      if (this.step === STEPS.PASSPORT) {
        this.$v.formReg.issuedDate.$touch() 
        this.$v.formReg.document.$touch()

        if (this.$v.formReg.issuedDate.$error | this.$v.formReg.document.$error) {
            return
        }

        this.submitHandler()
        this.openSuccessModal(this.formReg)
        return
      }
      this.step = this.step + 1
    },
    submitHandler () {
      if (this.$v.invalid) {
        return
      }
    },
    openSuccessModal (data) {
      this.$emit("success", data)
    }
  },
  validations: {
    formReg: {
      lustname: { required, alpha },
      name: { required, alpha },
      surname: { alpha },
      birth:  { 
        required, 
        minLength: minLength(10),
      }, 
      phone: { 
        required, 
        minLength: minLength(16),
      },   
      gender: { alpha },       
      selectedClientsGroup: { required },
      selectedDoctor: { alpha },   

      index: { minLength: minLength(3) },
      country: { alpha },
      region: { alpha },
      city: { alpha, required },
      street: { alpha },
      house: { minLength: minLength(1) },

      document: { required },
      series: { alpha },    
      number: { minLength: minLength(1) },
      issuedBy: { alpha },
      issuedDate: { required },
    }
  },
  watch: {
    formReg: {
      handler(val) {
        console.log(val)
      },
      deep: true
    }       
  }
}
</script>

<style scoped lang="scss">
$default    :   #C5C5C5;
$green-1    :   #77d5cb;
$transiton  :   all 500ms ease;

.form {
    width: 600px;
    height: auto;
    background: #ffffff;
    border-radius: 12px;
    padding: 30px;

    .form_fieldset {
        width: 100%;
        height: auto;
        min-height: 300px;
    }

    .form__actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 0px;

    }

    @media (max-width: 768px) {
      width: 500px;
    }
    
    @media (max-width: 640px) {
      position: absolute;
      left: 0;
      right: 0;
      width: auto;
      margin-top: 50px;
    }
}

.stepper-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .stepper{
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 500px;
        position: relative;
        z-index: 0;
        margin-bottom: 24px;

        &-progress{
            position: absolute;
            background-color: $default;
            height: 2px;
            z-index: -1;
            left: 0;
            right: 0;
            margin: 0 auto;

            &-bar{
                position: absolute;
                left: 0;
                height: 100%;
                width: 0%;
                background-color: $green-1;
                transition: $transiton;
            }
        }

        @media (max-width: 640px) {
          min-width: 300px;
        }
    }

    .stepper-item{
        display: flex;
        flex-direction: column;
        align-items: center;
        color: $default;
        transition: $transiton;

        &-counter{
            height: 35px;
            width: 35px;
            display: grid;
            place-items: center;
            background-color: #fff;
            border-radius: 100%;
            border: 2px solid $default;
            position: relative;

            .icon-success{
                position: absolute;
                opacity: 0;
                transform: scale(0);
                width: 14px;
                transition: $transiton;
            }

            .number{
                font-size: 14px;
                transition: $transiton;
            }
        }

        &-title{
            width: auto;
            position: absolute;
            font-size: 14px;
            bottom: -24px;
        }
    }

    .stepper-item.success{
        .stepper-item-counter{
            border-color: $green-1;
            background-color: d7eeea;
            color: #fff;
            font-weight: 600;

            .icon-success{
                opacity: 1;
                transform: scale(1);
            }

            .number{
                opacity: 0;
                transform: scale(0);
            }
        }
    }

    .stepper-item.current{
        .stepper-item-counter{
            border-color: $green-1;
            background-color: $green-1;
            color: #fff;
            font-weight: 600;
        }

        .stepper-item-title{
            color: #818181;
        }
    }

}


.form__title {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;

    & > h2 {
        font-size: 25px;
        font-weight: 600;
    }
}

.box {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    
    @media (max-width: 640px) {
      grid-template-columns: repeat(1, 1fr);
    }
}
</style>