<template>
    <button :disabled="disabled" v-on:click="click">
		<slot />
	</button>
</template>

<script>
export default {
	name: 'RLButton',
	methods: {
		click() {
			this.$emit('click');
		}
	},
	props: {
		disabled: {
			type: Boolean,
			required: false,
			default: false
		}
	}
}
</script>

<style scoped lang="scss">
@import '../../scss/variables';

button {
	background-color: $bgcolor;
	color: $white;
	height: $component-height;
	min-width: 140px;
	border-radius: $border-radius;
	border: 1px solid $border-color-active-light;
	transition: all 0.2s ease;
	outline: none;
	font-size: $font-size;
	padding: 0 20px;

	&:not(:disabled) {
		cursor: pointer;
	}
	
	&:disabled {
		opacity: 0.5;
	}

	&:hover:not(:disabled),
	&:active:not(:disabled),
	&:focus:not(:disabled) {
		background: transparent;
		border-color: $border-color-active;
		color: $border-color-active;
		box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
	}
}
</style>
