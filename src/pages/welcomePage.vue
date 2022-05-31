<template>
  <Welcome />
</template>

<script>
import { useFormMachine } from '../machines/insuranceForm';
import Welcome from '../components/Welcome.vue';
import { onMounted } from '@vue/runtime-core';
export default {
  name: 'welcomePage',
  components: {
    Welcome,
  },
  setup() {
    const { state, send } = useFormMachine();
    onMounted(() => send({ to: 'welcome', type: 'welcome' }));
    return {
      state,
      send,
    };
  },
};
</script>

<style></style>
