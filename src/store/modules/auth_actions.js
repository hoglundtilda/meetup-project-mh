import axios from 'axios';
const auth = {
  actions: {
    async loginRequest({ commit, dispatch }, credentials) {
      await axios
        .post(
          '/authenticate/loginRequest',
          {},
          {
            headers: {
              email: credentials.email,
              password: credentials.password,
            },
          }
        )
        .then((response) => {
          console.log(response);
          commit('authenticationSuccess', response.data.token);
        })
        .catch((error) => {
          console.log(error);
          commit('wrongCredentials');
        });
    },
    userRequest({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get('/authenticate/userRequest')
          .then((response) => {
            if (response.data.success === true) {
              commit('authenticationSuccess', response.data.token);
              commit('userRequestSuccess', response.data.user);
            }
          })
          .catch((error) => {
            commit('authenticationError');
          });
        resolve();
      });
    },
    async logoutUser(ctx) {
      await ctx.commit('logoutSuccess');
    },
  },
};
export default auth;
