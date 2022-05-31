<template>
  <div
    class="flex h-screen justify-center items-center max-w-7xl gap-10 mx-auto"
  >
    <div class="flex gap-x-5 w-full">
      <div
        class="flex flex-col bg-white px-10 rounded-sm shadow-md py-10 mx-auto"
      >
        <div class="font-semibold text-xl text-gray-800">
          <div>Cover Go Insurance Form</div>
          <div class="text-sm font-normal">
            Please fill form for insurance details.
          </div>
        </div>

        <div class="py-2">
          <div class="font-bold text-gray-800 py-3">Personal Information</div>
          <div class="space-y-5">
            <div class="flex flex-col space-y-1">
              <label for="name" class="font-bold text-gray-600">Name</label>
              <input
                type="text"
                placeholder="Amit Rai"
                class="border-2 py-1.5 px-3 rounded-md"
                v-model="state.context.name"
                @input="
                  send({ type: 'ENTER_NAME', value: $event.target.value })
                "
              />
            </div>
            <div class="flex flex-col space-y-1">
              <label for="age" class="font-bold text-gray-600">Age</label>
              <input
                type="text"
                v-model="state.context.age"
                placeholder="Enter Age"
                class="border-2 py-1.5 px-3 rounded-md"
                @input="send({ type: 'ENTER_AGE', value: $event.target.value })"
              />
            </div>
          </div>
        </div>

        <!--plan information  -->
        <div class="flex flex-col">
          <div class="font-bold text-gray-800 py-3">Insurance Information</div>
          <div class="flex flex-col space-y-1">
            <label for="place" class="font-bold text-gray-600">
              Place of Residence
            </label>

            <select
              @change="
                send({ type: 'SELECT_PLACE', value: $event.target.value })
              "
              class="border-2 py-1.5 px-3 rounded-sm"
              v-model="state.context.place"
            >
              <option value="">Please select location</option>
              <option value="HK">Hong Kong</option>
              <option value="UK">UK</option>
              <option value="US">US</option>
            </select>
          </div>

          <div class="flex flex-col space-y-3 pt-5 items-start">
            <label for="place" class="font-bold text-gray-600"> Plans </label>
            <div class="flex flex-col items-center w-full space-y-3">
              <div
                class="flex bg-slate-200 h-14 w-full items-center px-2 rounded-sm"
              >
                <input
                  type="radio"
                  value="STD"
                  name="plan"
                  id="STD"
                  v-model="state.context.plan"
                  class="h-5 w-5"
                  @input="
                    send({ type: 'SELECT_PLAN', value: $event.target.value })
                  "
                />
                <div
                  class="mx-2 peer-checked:border-2 cursor-pointer focus:outline-none hover:border-gray-50"
                >
                  <label class="w-full">
                    <div class="text-slate-800">STANDERD</div>
                    <div class="text-sm font-light text-slate-900">
                      Stander plan secure all ...
                    </div>
                  </label>
                </div>
              </div>
              <div
                class="flex bg-slate-200 h-14 w-full items-center px-2 rounded-sm"
              >
                <input
                  type="radio"
                  value="SAFE"
                  name="plan"
                  class="h-5 w-5"
                  v-model="state.context.plan"
                  @input="
                    send({ type: 'SELECT_PLAN', value: $event.target.value })
                  "
                />
                <label for="SAFE" class="mx-2">
                  <div class="text-slate-800">SAFE</div>
                  <div class="text-sm font-light text-slate-900">
                    safe plan secure all ...
                  </div>
                </label>
              </div>
              <div
                class="flex bg-slate-200 h-14 w-full items-center px-2 rounded-sm"
              >
                <input
                  type="radio"
                  value="SSAFE"
                  name="plan"
                  class="h-5 w-5"
                  v-model="state.context.plan"
                  @input="
                    send({ type: 'SELECT_PLAN', value: $event.target.value })
                  "
                />
                <div class="mx-2">
                  <div class="text-slate-800">SUPER SAFE</div>
                  <div class="text-sm font-light text-slate-900">
                    super safe plan secure all ...
                  </div>
                </div>
              </div>
            </div>
            {{ state.context }}
          </div>
        </div>
      </div>

      <!-- second box -->
      <div class="self-start bg-white px-10 rounded-sm shadow-md w-1/2 py-10">
        <!-- <div
          v-if="
            state.context.age &&
            state.context.exchangeRate *
              state.context.planeRate[state.context.plan]
          "
        >
          {{ state.context }}
          {{
            state.context.age *
            state.context.exchangeRate *
            state.context.planeRate[state.context.plan]
          }}
        </div> -->
        <div class="space-y-10">
          <div class="font-semibold text-xl text-gray-800">
            <div>Premium Information</div>
            <div class="text-sm font-normal">
              Details for Premium against your plans.
            </div>
          </div>

          <div>
            <div>
              <div class="text-blue-700 font-bold text-2xl">
                Your Premium is:
                <span
                  v-if="
                    state.context.plan &&
                    state.context.exchangeRate &&
                    state.context.planeRate[state.context.plan]
                  "
                >
                  {{
                    state.context.age *
                    state.context.exchangeRate *
                    state.context.planeRate[state.context.plan].plan *
                    state.context.planeRate[state.context.plan].factor
                  }}{{ state.context.place }}
                </span>
              </div>
              <div class="text-sm font-light">
                based on current exchange rate {{ state.context.exchangeRate }}
              </div>
            </div>
            <button
              @click="send({ type: 'NEXT' })"
              class="bg-blue-700 w-full py-2 text-white uppercase rounded-sm shadow-sm my-2 cursor-pointer"
              :disabled="
                state.context.age *
                state.context.exchangeRate *
                state.context.planeRate[state.context.plan]
              "
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue';
import { useFormMachine } from '../machines/insuranceForm';
import { useSelector } from '@xstate/vue';
import router from '../routes';
export default {
  name: 'insuranceForm',
  setup() {
    const { send, state } = useFormMachine();
    onMounted(() => {
      send('OPEN_FORM');
    });
    const selectPlace = (data) => {
      console.log(data);
      send(data);
    };

    return {
      state,
      send,
      selectPlace,
    };
  },
};
</script>

<style></style>
