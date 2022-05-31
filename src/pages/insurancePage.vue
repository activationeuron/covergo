<template>
  <insurance-form />
</template>

<script>
import { onMounted } from 'vue';
import InsuranceForm from '../components/insuranceForm.vue';
import { useFormMachine } from '../machines/insuranceForm';
export default {
  name: 'insurancePage',
  components: {
    InsuranceForm,
  },
  setup() {
    const { state, send } = useFormMachine();
    onMounted(() => send({ id: 'form', type: 'openedForm' }));
  },
};
</script>

<style></style>
