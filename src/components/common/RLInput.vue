<template>
	<div class="field" :style="computedStyle">
		<label v-if="label || error">{{ label }} <span v-if="error">({{error}})</span></label>
		<input
			v-model="inputModel"
			:placeholder="placeholder"
			:readonly="readonly"
			v-on:keyup="onKeyup"
			v-on:change="change"
			v-on:keyup.enter="onEnter" />
	</div>
</template>

<script>
export default {
    name: 'RLInput',
    data() {
		return {
			inputModel: ''
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
		inputType: {
			type: String,
			required: false,
			default: 'text'
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
		onKeyup(e) {
			if (this.inputType === "number") {
				this.inputModel = this.inputModel.replace(",", ".");
			}
			this.$emit('change', this.inputModel);
			this.$emit('keyup', e);
		},
		onEnter() {
			this.$emit('enter');
		},
		change(e) {
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

input {
	height: $component-height;
	width: 100%;
	min-width: 140px;
	border-radius: $border-radius;
	border: 1px solid $border-color;
	transition: all 0.2s ease;
	outline: none;
	font-size: $font-size;
	padding: 0 20px;

	&:active,
	&:focus {
		border-color: $border-color-active;
		box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
	}
}
</style>
