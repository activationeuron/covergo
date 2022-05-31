<template>
  <Exit />
</template>

<script>
import { onMounted } from 'vue';
import Exit from '../components/Exit.vue';
import { useFormMachine } from '../machines/insuranceForm';
export default {
  name: 'summeryPage',
  components: {
    Exit,
  },
  setup() {
    const { send } = useFormMachine();

    onMounted(() => send({ to: 'summery', type: 'summery' }));
  },
};
</script>

<style></style>
