<template>
	<div class="page">
		<ShortInfo/>
		<div class="page__right">
			<Header :active="activeMenu"/>
			<HomeContent/>
		</div>
	</div>
</template>

<script>
import ShortInfo from '@/layout/ShortInfo';
import Header from '@/layout/Header';
import HomeContent from '@/layout/HomeContent';
export default {
	name: 'Home',
	props: ['activeMenu'],
	components: {
		ShortInfo,
		Header,
		HomeContent
	}
}
</script>

<style>
</style>