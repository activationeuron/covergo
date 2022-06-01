import { useActor } from '@xstate/vue';
import { assign, createMachine, interpret } from 'xstate';
import router from '../routes';

const getExchangeRate = (context, event) => {
  return new Promise((resolve, reject) => {
    const example = { UK: 3, US: 2, HK: 1 };
    resolve({ rate: example[context.place] });
  });
};

export const insuranceStates = createMachine(
  {
    id: 'insuranceForm',
    initial: 'welcome',
    context: {
      name: null,
      age: null,
      place: null,
      plan: null,
      exchangeRate: null,
      premium: 10,
      planeRate: {
        STD: { factor: 1 },
        SAFE: { factor: 1.5 },
        SSAFE: { factor: 1.75 },
      },
    },
    states: {
      welcome: {
        id: 'welcome',
        on: {
          OPEN_FORM: 'openedForm',
        },
      },

      openedForm: {
        id: 'form',
        on: {
          ENTER_NAME: {
            actions: ['assignName'],
            cond: {
              type: 'validateInput',
              minLength: 3,
            },
          },
          ENTER_AGE: {
            actions: ['assignAge'],
          },

          SELECT_PLAN: {
            actions: ['selectPlan'],
          },
          SELECT_PLACE: {
            actions: ['selectPlace'],
            target: 'selectingPlace',
          },
          NEXT: {
            target: 'summery',
            actions: [() => router.push('/summery')],
            cond: {
              type: 'navigateSummery',
            },
          },
          BACK: {
            actions: [() => router.push('/')],
            target: 'welcome',
          },
        },
      },
      selectingPlace: {
        // id: 'selectPlace',
        // actions: 'selectPlace',
        // onDone: {
        //   target: 'success',
        // },
        // onError: {
        //   target: 'failure',
        // },
        invoke: {
          id: 'getExchangeRate',
          // to get conversions rate fro currency
          src: (context, event) => getExchangeRate(context, event),
          onDone: { target: 'openedForm', actions: 'setExchangeRate' },
          onError: { target: 'openedForm' },
        },
      },
      // summery
      summery: {
        id: 'summery',
        on: {
          BUY: {
            target: 'welcome',
            actions: [() => router.push('/')],
          },
          BACK: {
            target: 'openedForm',
            actions: [() => router.push('/form')],
          },
        },
      },
      success: {
        on: {
          YES: 'welcome',
        },
      },
      failure: {},
    },

    // failure: {},
  },
  {
    actions: {
      assignName: assign({ name: (ctx, event) => event.value }),
      assignAge: assign({ age: (ctx, event) => event.value }),
      selectPlace: assign({ place: (ctx, event) => event.value }),
      selectPlan: assign((context, event) => {
        // { plan: (ctx, event) => event.value }
        return {
          ...context,
          plan: event.value,
        };
      }),
      setExchangeRate: assign((context, event) => {
        const {
          data: { rate },
        } = event;
        return { ...context, exchangeRate: rate };
      }),
      // navigations

      clearForm: assign({ name: null, email: null, place: null }),
    },
    guards: {
      validateInput: (context, event, { cond }) => {
        console.log(context, event, cond);
        return event.value.length > cond.minLength;
      },
      // navigation
      navigateSummery: (context, event, { cond }) => {
        if (
          context.age &&
          context.name &&
          context.plan &&
          context.place &&
          context.exchangeRate
        ) {
          if (context.age > 100) {
            router.push('/error');
            return false;
          } else {
            return true;
          }
        } else {
          return false;
        }
      },
    },
  }
);
const service = interpret(insuranceStates, { devTools: true }).start();
export const useFormMachine = () => {
  return useActor(service);
};
