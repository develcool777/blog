<template>
	<transition name="fade">
		<div class="modal" v-if="status">
			<div class="mask" @click="close()"/>
			<div class="contact center">
				<div class="contact__close" @click="close()"></div>
				<div class="contact__form">
					<div class="contact__field" 
						:style="{borderColor: colors(1, name)}"
						@click="active(1)">
						<input class="contact__input" type="text" placeholder="Ваше имя" v-model="name">
					</div>
					<div class="contact__field" 
						:style="{borderColor: colors(2, email)}" 
						@click="active(2)">
						<input class="contact__input" type="email" placeholder="Ваш e-mail" v-model="email">
					</div>
					<div class="contact__field" 
						:style="{borderColor: colors(3, text)}" 
						@click="active(3)">
						<input class="contact__input" type="text" placeholder="Текст сообщения" v-model="text">
					</div>
					<div class="contact__btn" @click="send()">Отправить</div>
				</div>
				<div class="contact__info">
					<p class="contact__item">e-mail: <span class="contact__item--value">info@mywebsite.ru</span></p>
					<p class="contact__item">тел: <span class="contact__item--value">+943-232-856-22</span></p>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
const url = 'http://localhost:3000/contacts';
import Api from '@/services/api';
import closeModals from '@/mixins/closeModals';
export default {
	name: "Contact",
	mixins: [closeModals],
	data() {
		return {
			name: '',
			email: '',
			text: '',
			activeField: null,
			isActive: true,
			redArray: [],
			api: new Api(url)
		}
	},
	methods: {
		cheak(str) {
			return str === '' ? false : true;
		},
		async send() {
			const arr = [this.name, this.email, this.text]
			if (arr.every(i => this.cheak(i))) {
				await this.api.makePost({
					name: arr[0],
					email: arr[1],
					text: arr[2]
				})
				this.name = '';
				this.email = '';
				this.text = '';
				this.redArray.splice(0)
			} else {
				arr.forEach((item, i) => {
						if (item === '') {
								this.redArray.push(i + 1);
						}
				})
			}
			this.isActive = false;
		},
		active(i) {
			this.activeField = i;
			this.isActive = true;
		},
		colors(number, str) {
			if (this.cheak(str)) {
				return 'green'
			} else if (this.activeField === number && this.isActive) {
				return '#3137C9'; // $activeMenu
			} else if (this.redArray.includes(number)) { 
				return 'red';
			} else {
				return '#3f3f3f'; // $border
			}
		}
	}
}
</script>
<style lang="scss">
.contact {
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	width: rem(500);
	height: rem(342);
	background-color: $input;
	z-index: $modalContent;
	&__form {
		width: rem(340);
	}
	&__field {
		position: relative;
		width: inherit;
		height: rem(25);
		border-bottom: 1px solid $border;
		transition:all .5s ease;
	}
	&__field:hover {
		border-color: $active !important;
	}
	&__input {
		padding-bottom: 9px;
		border: none;
		outline: none;
		width: 100%;
		height: 100%;
		background: transparent;
		color: $white;
		font-size: rem(14);
		font-weight: normal;
	}
	&__field:nth-child(2) {
		margin: rem(25) 0;
	}
	&__field:nth-child(3) {
		margin-bottom: rem(25);
	}
	&__btn {
		padding: rem(8) rem(15);
		background-color: $active;
		width: rem(90);
		font-size: rem(12);
		font-weight: normal;
		border-radius: 5px;
		border: 1px solid transparent;
		color: $white;
		cursor: pointer;
		transition-duration: .5s;
	}
	&__btn:hover {
		border: 1px solid $active;
		background-color: white;
		color: $active;
	}
	&__info {
		@include Flex(space-between);
		position: absolute;
		bottom: rem(25);
		width: rem(270);
		font-size: rem(12);
		font-weight: normal;
		color: $white;
	}
	&__item {
		&--value {
			position: relative;
			cursor: pointer;
			@include ColorDirectionText(lightblue, $white, 275ms, to right, 100%);
		}
		&--value::after {
			position: absolute;
			bottom: -1px;
			left: 0;
			width: 100%;
			height: 1px;
			content: "";
			@include Color2Right(lightblue, $white, 275ms)
		}
		&--value:hover {
			background-position: 0 100%;
		}
		&--value:hover::after {
			background-position: right bottom;
		}
	}
	@include CloseModal();
}
</style>