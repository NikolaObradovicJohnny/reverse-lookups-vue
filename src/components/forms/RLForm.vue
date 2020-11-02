<template>
    <form @submit="formSubmit">
        <div class="form-container">

            <div class="field-group">
                <RLSelect
                    name="Select method"
                    :error="form.method.error"
                    :readonly="loading"
                    @change="v => set('method', v, form)" >
                        <option value="fetchLookups">Using just netaddr library</option>
                        <option value="fetchLookupsSecond">Using asyncio</option>
                        <option value="fetchLookupsAsync">Using concurrent futures</option>
                </RLSelect>
                
                <RLInput
                    placeholder="CIDR"
                    :error="form.cidr.error"
                    :readonly="loading"
                    @change="v => set('cidr', v, form)" />

                <RLInput
                    placeholder="search"
                    :error="form.search.error"
                    :readonly="loading"
                    @change="v => set('search', v, form)" />
            </div>
            
            <h1 v-if="errorOnSubmit !== ''" class="error">{{errorOnSubmit}}</h1>
            <RLButton :disabled="!validate(form) || loading" >Run</RLButton>
            <div v-if="loading" class="loader"></div>
            
            <div class="result" v-if="lookups">
                {{this.lookups}}
                <div>
                    total: {{this.lookups.total}}
                </div>
                <div>
                    total resolved: {{this.lookups.totalResolved}}
                </div>
                <div>
                    total matched: {{this.lookups.totalMatched}}
                </div>
            </div>
        </div>
    </form>
</template>

<script>
import { mapActions } from "vuex";
import { required, set, validate, messages } from 'vue-val';

import RLInput from '../common/RLInput';
import RLSelect from '../common/RLSelect';
import RLButton from '../common/RLButton';
import { cidrValidation } from '../../helpers/validations';


messages.required = () => `required field.`;

export default {
    name: 'RLForm',
    components: {
        RLInput,
        RLSelect,
        RLButton,
    },
    data() {
        return {
            loading: false,
            lookups: undefined,
            errorOnSubmit: '',
            set,
            validate,
            form: {
                method: {
                    valid: false,
                    error: null,
                    constraints: [required]
                },
                cidr: {
                    valid: false,
                    error: null, 
                    constraints: [required, cidrValidation] 
                },
                search: {
                    valid: false,
                    error: null, 
                    constraints: [required] 
                }
            }
        }
    },
    methods: {
        ...mapActions(['fetchLookups']),

        formSubmit(e) {
            e.preventDefault();
            this.sendRequest();
        },
        sendRequest() {
            this.loading = true;
            this.lookups = undefined;
            this.errorOnSubmit = '';
            let formData = [
                {key: 'cidr', value: this.form.cidr.value},
                {key: 'search', value: this.form.search.value},
            ];
            const method = this.form.method.value;
            
            this.$store.dispatch(method, formData)
                .then(() => {
                    this.loading = false;
                    this.lookups = this.$store.state.lookups.lookups; 
                })
                .catch(() => {
                    this.loading = false;
                    this.errorOnSubmit = `Error.`;
                });
        }
	},
}
</script>

<style scoped lang="scss">
@import '../../scss/variables';

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loader {
	border: 5px solid $border-color;
	border-radius: 50%;
	border-top: 5px solid $bgcolor;
	width: 35px;
	height: 35px;
	animation: spin 2s linear infinite;
    margin: 0 auto 70px;
}
</style>