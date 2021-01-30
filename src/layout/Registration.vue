<template>
  <section class="registration">
    <div class="wrapper">
      <h3 class="registration__title">Регистрация</h3>
      <div class="registration__form">
        <div 
          class="registration__field" 
          v-for="(item, i) in registration" 
          :key="i"
          :style="{borderColor: colors(i)}"
          @click="active(i)"
        >
          <input 
            class="registration__input" 
            :type="item.type" 
            :placeholder="item.placeholder" 
            v-model="form.vModel[i]"
          >
				</div>
        <div class="registration__btn" @click="send()">Зарегистрироватся</div>
      </div>
      <div class="registration__group">
        <div class="registration__item" @click="goTo()">Войти</div>
      </div>
    </div>
  </section>
</template>

<script>
import profileForms from '@/mixins/profileForms';
export default {
  name: "Registration",
  mixins: [profileForms],
  data() {
    return {
      registration: [
        { type: 'email', placeholder: 'Ваш email' },
        { type: 'password', placeholder: 'Пароль' },
        { type: 'password', placeholder: 'Повторите пароль' }
      ]
    }
  },
  methods: {
    async send() {
			if (this.form.vModel.length === 3 && this.passwordEqual()) {
				// await this.api.makePost({
				// 	name: arr[0],
				// 	email: arr[1],
				// 	text: arr[2]
        // })
        this.form.vModel.splice(0);
        this.greenArray.splice(0);
        this.isSend = false;
			} else {
        this.isSend = true;
      }
			this.isActive = false;
    },
    goTo() {
      this.$emit('login', 2);
    }
  }
}
</script>

<style lang="scss">
.registration {
  padding-top: rem(70);
  height: 100vh;
  background-color: $background;
  color: $white;
  @include profileForms();
}
</style>