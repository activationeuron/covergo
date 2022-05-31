<template>
  <div class="min-h-screen flex justify-center items-center h-screen">
    <div class="max-w-4xl bg-white w-full shadow-md">
      <div class="px-10 py-10">
        <div class="text-blue-800 text-xls font-bold">Insurance Summery</div>
        <div class="space-y-5">
          <div>
            <div class="text-sm">Name</div>
            <div class="text-2xl capitalize">{{ state.context.name }}</div>
          </div>
          <div>
            <div>Age</div>
            <div>{{ state.context.age }}</div>
          </div>
          <div>
            <div>Where do you live</div>
            <div>{{ state.context.age }}</div>
          </div>
          <div>
            <div>Package</div>
            <div>{{ state.context.plan }}</div>
          </div>

          <div>
            <div>Premium</div>
            <div
              v-if="
                state.context.age *
                state.context.exchangeRate *
                state.context.planeRate[state.context.plan]
              "
            >
              {{
                state.context.age *
                state.context.exchangeRate *
                state.context.planeRate[state.context.plan].plan *
                state.context.planeRate[state.context.plan].factor
              }}{{ state.context.place }}
            </div>
          </div>
          <div class="flex justify-evenly">
            <div
              class="bg-gray-800 w-36 text-center py-2 text-white shadow-sm rounded-sm cursor-pointer"
              @click="send({ type: 'BACK' })"
            >
              Back
            </div>
            <div
              class="bg-blue-700 w-36 text-center py-2 text-white shadow-sm rounded-sm cursor-pointer"
              @click="send({ type: 'BUY' })"
            >
              Buy
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core';
import { useFormMachine } from '../machines/insuranceForm';

export default {
  name: 'exit',
  setup() {
    const { state, send } = useFormMachine();
    onMounted(() => {
      send({ type: 'NEXT' });
    });
    return {
      state,
      send,
    };
  },
};
</script>

<style></style>
