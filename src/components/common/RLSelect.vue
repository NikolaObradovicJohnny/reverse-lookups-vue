<template>
	<div class="field" :style="computedStyle">
		<label v-if="label || error">{{ label }} <span v-if="error">({{error}})</span></label>
		<select v-model="inputModel" v-on:change="change" :class="{ selected: isSelected }">
			<option value="">Select method</option>
			<slot />
		</select>
	</div>
</template>

<script>
export default {
	name: 'RLSelect',
    data() {
		return {
			inputModel: '',
			isSelected: false
		};
    },
    watch: {
		value(newValue) {
			this.inputModel = newValue;
		}
	},
    props: {
		placeholder: {
			type: String
		},
		value: {
			type: [String, Number, Object, Date]
		},
		label: {
			type: String,
			required: false,
			default: null
		},
		readonly: {
			type: Boolean,
			required: false,
			default: false
		},
		mandatory: {
			type: Boolean,
			required: false,
			default: false
		},
		error: {
			type: String,
			required: false,
			default: null
		},
		block: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	created() {
		if(this.value)
			this.inputModel = this.value;
	},
	methods: {
		change(e) {
			this.isSelected = true;
			this.$emit('change', e.target.value);
		}
	},
	computed: {
		computedStyle() {
			return this.block ? 'display: block;' : '';
		}
	}
}
</script>

<style scoped lang="scss">
@import '../../scss/variables';

select {
	background-color: $white;
	color: $bgcolor;
	height: $component-height;
	min-width: 140px;
	border-radius: $border-radius;
	border: 1px solid $border-color-active-light;
	transition: all 0.2s ease;
	outline: none;
	font-size: $font-size;
	padding: 0 20px;
	cursor: pointer;

	&:active,
	&:focus {
		border-color: $border-color-active;
		box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
	}

	&.selected {
		background-color: $bgcolor;
		color: $white;
	}
}

.field {
	@media (min-width: 600px) {
		display: block;
	}
	@media (min-width: 1024px) {
		display: block;
	}
}
</style>
