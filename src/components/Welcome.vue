<template>
  <div
    class="min-h-screen flex flex-col justify-center items-center space-y-5 text-center"
  >
    <div class="text-4xl font-bold text-blue-600 px-10 py-5">Cover GO</div>
    <div class="max-w-xl">
      <span class="font-bold"> Welcome to Cover go </span>insurance Lorem ipsum
      dolor sit amet consectetur adipisicing elit. Nostrum ipsa quae quibusdam
      qui iusto quas voluptatibus et unde cum, ad explicabo asperiores laborum
      harum veritatis! Quaerat enim minus earum officia debitis officiis
      deserunt facilis eaque, accusamus eum explicabo laborum dignissimos
      delectus, expedita laudantium ducimus repellendus et voluptate unde
      aperiam repudiandae?
    </div>
    <button
      @click="routes.push('/form')"
      class="bg-gray-900 py-2 px-2 text-white w-36 rounded-sm shadow-sm"
    >
      Next
    </button>
  </div>
</template>

<script>
import routes from '../routes/index';
export default {
  name: 'WelcomeComponent',
  setup() {
    return {
      routes,
    };
  },
};
</script>

<style></style>
