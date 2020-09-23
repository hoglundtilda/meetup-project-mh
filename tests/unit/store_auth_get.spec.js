import Vuex from 'vuex';
import Vue from 'vue';
import auth from '@/store/modules/auth_actions.js';

Vue.use(Vuex);

let url = '',
  mockError = false;

jest.mock('axios', () => ({
  get: (_url) => {
    let response = {
      data: {
        success: true,
        token: 'token',
        user: { name: 'name', email: 'email' },
      },
    };
    return new Promise((resolve) => {
      if (mockError) throw Error('Mock error');

      url = _url;
      resolve(response);
    });
  },
}));

describe('store - auth', () => {
  it('Should run userRequest with correct params', async () => {
    const commit = jest.fn();
    await auth.actions.userRequest({ commit });

    expect(url).toBe('/authenticate/userRequest');
  });

  it('Should commit userRequestSuccess if request is ok', async () => {
    const commit = jest.fn(),
      user = { name: 'name', email: 'email' };

    await auth.actions.userRequest({ commit });

    expect(commit).toHaveBeenCalledWith('userRequestSuccess', user);
  });

  it('should throw error if request fails', async () => {
    mockError = true;
    const commit = jest.fn();

    await auth.actions.userRequest({ commit });

    expect(commit).toHaveBeenCalledWith('userRequestError');
  });
});
