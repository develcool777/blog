<template>
  <section class="login">
    <div class="wrapper">
      <h3 class="login__title">Вход</h3>
      <div class="login__form">
        <div class="login__field" 
          v-for="(item, i) in login" 
          :key="i"
          :style="{borderColor: colors(i)}"
          @click="active(i)"
        >
          <input class="login__input" :type="item.type" :placeholder="item.placeholder" v-model="form.vModel[i]">
				</div>
        <div class="login__btn" @click="send()">Войти</div>
      </div>
      <div class="login__group">
        <div class="login__item">восстановить</div>
        <div class="login__item" @click="goTo()">регистрация</div>
      </div>
    </div>
  </section>
</template>

<script>
import profileForms from '@/mixins/profileForms';
export default {
  name: "Login",
  mixins: [profileForms],
  data() {
    return {
      login: [
        { type: 'email', placeholder: 'Ваш email' },
        { type: 'password', placeholder: 'Пароль' }
      ]
    }
  },
  methods: {
    async send() {
			if (this.form.vModel.length === 2) {
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
      this.$emit('registration', 1);
    }
  }
}
</script>

<style lang="scss">
.login {
  padding-top: rem(70);
  height: 100vh;
  background-color: $background;
  color: $white;
  @include profileForms();
  &__item:nth-child(2) {
    margin-left: rem(10);
  }
}
</style>