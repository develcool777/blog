<template>
  <div class="field">
    <div class="field__container">
      <input 
        class="field__input" 
        type="text" 
        placeholder="Текст комментария" 
        v-model="msg"
      >
    </div>
    <div class="field__btn" @click="post()">Отправить</div>
  </div>
</template>

<script>
const url = 'http://localhost:3000/homeDataMore';
import CurrentDate from '@/mixins/currentDate';
import Api from '@/services/api';
export default {
  mixins: [CurrentDate],
  name: "Field",
  data() {
    return {
      api: new Api(url),
      msg: ''
    }
  },
  methods: {
		object() {
			return {
        img: '',
        name: 'Vadim',
        date: this.currentDate(),
        text: this.msg,
			} 
		},
		async post() {
			if (this.cheak(this.msg)) {
				await this.api.makePost(this.object());
				this.msg = ''
				this.$emit('reload');
			}
		},
    cheak(str) {
			return str === '' ? false : true;
    },
  }
}
</script>

<style lang="scss">
.field {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  &__container {
    position: relative;
    width: rem(550);
    height: rem(25);
  }
  &__container::after {
    position: absolute;
    content: "";
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background: $border;
  }
  &__input {
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    background: transparent;
    color: $white;
    font-size: rem(14);
  }
  &__btn {
    margin-top: rem(20);
    padding: rem(8) rem(15);
    color: $white;
    background: $active;
    border-radius: 5px;
    font-size: rem(12);
    transition-duration: .5s;
    cursor: pointer;
  }
  &__btn:hover {
    color: $active;
    background: $white;
  }
}
</style>