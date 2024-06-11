export class testModel1 {
  constructor(base, user, unusedUserAction) {
    this.base = base;
    this.internal = {};
    var internal = this.internal;
    internal.compartment = 1;
    this.setUser(user, unusedUserAction);
  }
  initial(t) {
    var internal = this.internal;
    var state = Array(3).fill(0);
    state[0] = internal.initial_D;
    state[1] = internal.initial_N;
    state[2] = internal.initial_v;
    return state;
  }
  setUser(user, unusedUserAction) {
    this.base.user.checkUser(user, ["d_D", "D_init", "d_N", "d_v", "I_0", "k_D", "K_D", "k_D0", "k_N", "K_N", "k_N0", "K_v1", "K_v2", "n_1", "n_2", "n_3", "n_4", "N_init", "p_v", "v_0", "v_init"], unusedUserAction);
    var internal = this.internal;
    this.base.user.setUserScalar(user, "d_D", internal, 0.25, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "D_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "d_N", internal, 1, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "d_v", internal, 10, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "I_0", internal, 0.20000000000000001, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "k_D", internal, 4.5, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "K_D", internal, 0.29999999999999999, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "k_D0", internal, 0.17499999999999999, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "k_N", internal, 320, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "K_N", internal, 32, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "k_N0", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "K_v1", internal, 1200, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "K_v2", internal, 1200, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "n_1", internal, 2, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "n_2", internal, 2, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "n_3", internal, 2, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "n_4", internal, 2, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "N_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "p_v", internal, 1, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "v_0", internal, 30000, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "v_init", internal, 0, -Infinity, Infinity, false);
    internal.initial_D = internal.D_init;
    internal.initial_N = internal.N_init;
    internal.initial_v = internal.v_init;
    this.updateMetadata();
  }
  getInternal() {
    return this.internal;
  }
  rhs(t, state, dstatedt) {
    var internal = this.internal;
    const D = state[0];
    const N = state[1];
    const v = state[2];
    var f_D = internal.k_D0 + internal.k_D * Math.pow((v), (internal.n_1)) / (Math.pow((v), (internal.n_1)) + Math.pow((internal.K_v1), (internal.n_1)));
    var f_N = internal.k_N0 + internal.k_N * (Math.pow((v), (internal.n_2)) / (Math.pow((v), (internal.n_2)) + Math.pow((internal.K_v2), (internal.n_2)))) * (Math.pow((internal.K_D), (internal.n_3)) / (Math.pow((D), (internal.n_3)) + Math.pow((internal.K_D), (internal.n_3))));
    var I = internal.I_0 + internal.p_v * v * (Math.pow((N), (internal.n_4)) / (Math.pow((N), (internal.n_4)) + Math.pow((internal.K_N), (internal.n_4))));
    dstatedt[0] = 0 + internal.compartment * f_D - internal.compartment * internal.d_D * D;
    dstatedt[1] = 0 + internal.compartment * f_N - internal.compartment * internal.d_N * N;
    var f_v = internal.v_0 * ((1 - Math.exp(- I)) / (1 + Math.exp(- I)));
    dstatedt[2] = 0 + internal.compartment * f_v - internal.compartment * internal.d_v * v;
  }
  names() {
    return this.metadata.ynames.slice(1);
  }
  updateMetadata() {
    this.metadata = {};
    var internal = this.internal;
    this.metadata.ynames = ["t", "D", "N", "v"];
    this.metadata.internalOrder = {compartment: null, d_D: null, D_init: null, d_N: null, d_v: null, I_0: null, initial_D: null, initial_N: null, initial_v: null, k_D: null, K_D: null, k_D0: null, k_N: null, K_N: null, k_N0: null, K_v1: null, K_v2: null, n_1: null, n_2: null, n_3: null, n_4: null, N_init: null, p_v: null, v_0: null, v_init: null};
    this.metadata.variableOrder = {D: null, N: null, v: null};
    this.metadata.outputOrder = null;
  }
  getMetadata() {
    return this.metadata;
  }
}
