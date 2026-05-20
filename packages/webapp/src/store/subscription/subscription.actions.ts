import ApiService from '@/services/ApiService';
import { SET_PLAN_SUBSCRIPTIONS_LIST } from '@/store/types';;
import type { AppDispatch } from '@/store/create-store';

export const fetchSubscriptions = () => (dispatch: AppDispatch) =>
  new Promise<void>((resolve, reject) => {
    ApiService.get('subscription')
      .then((response) => {
        dispatch({
          type: SET_PLAN_SUBSCRIPTIONS_LIST,
          payload: {
            subscriptions: response.data.subscriptions,
          },
        });
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const setSubscriptions = (subscriptions: Array<Record<string, unknown>>) => {
  return {
    type: SET_PLAN_SUBSCRIPTIONS_LIST,
    payload: {
      subscriptions,
    },
  };
};

