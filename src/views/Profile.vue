<template>
	<div class="page">
		<ShortInfo/>
		<div class="page__right">
			<Header :active="activeMenu"/>
      <Registration v-if="registration" v-on:login="change($event)"/>
			<Login v-else-if="login" v-on:registration="change($event)"/>
		</div>
	</div>
</template>

<script>
import ShortInfo from '@/layout/ShortInfo';
import Header from '@/layout/Header';
import Registration from '@/layout/Registration';
import Login from '@/layout/Login';
export default {
	name: 'Profile',
	props: ['activeMenu'],
	components: {
		ShortInfo,
    Header,
		Registration,
		Login
	},
	data() {
		return {
			registration: true,
			login: true
		}
	},
	methods: {
		change(number) {
			if (number === 1) {
				this.registration = true;
			} else {
				this.registration = false;
			}
		}
	}
}
</script>

<style lang="scss">

</style>