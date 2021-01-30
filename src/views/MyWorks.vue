<template>
	<div class="page">
		<ShortInfo/>
		<div class="page__right">
			<Header/>
			<Works/>
		</div>
	</div>
</template>

<script>
import ShortInfo from '@/layout/ShortInfo';
import Header from '@/layout/Header';
import Works from '@/layout/Works'
export default {
	name: 'MyWorks',
	components: {
		ShortInfo,
		Header,
		Works 
	}
}
</script>

<style>
</style>