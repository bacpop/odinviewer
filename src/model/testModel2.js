export class testModel2 {
  constructor(base, user, unusedUserAction) {
    this.base = base;
    this.internal = {};
    var internal = this.internal;
    internal.tme = 1;
    this.setUser(user, unusedUserAction);
  }
  initial(t) {
    var internal = this.internal;
    var state = Array(5).fill(0);
    state[0] = internal.initial_T;
    state[1] = internal.initial_B;
    state[2] = internal.initial_E;
    state[3] = internal.initial_R;
    state[4] = internal.initial_V;
    return state;
  }
  setUser(user, unusedUserAction) {
    this.base.user.checkUser(user, ["a0", "a1", "B_init", "c0inv", "c1", "c2", "c3", "d", "d0", "d1", "E_init", "f", "g0", "r", "R_init", "T_init", "V_init"], unusedUserAction);
    var internal = this.internal;
    this.base.user.setUserScalar(user, "a0", internal, 0.1946, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "a1", internal, 0.29999999999999999, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "B_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "c0inv", internal, 369, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "c1", internal, 100, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "c2", internal, 300, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "c3", internal, 300, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "d", internal, 0.00069999999999999999, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "d0", internal, 1.0000000000000001e-05, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "d1", internal, 1.0000000000000001e-05, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "E_init", internal, 100, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "f", internal, 0.62, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "g0", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "r", internal, 0.01, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "R_init", internal, 1, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "T_init", internal, 3, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "V_init", internal, 0, -Infinity, Infinity, false);
    internal.c0 = 1 / internal.c0inv;
    internal.initial_B = internal.B_init;
    internal.initial_E = internal.E_init;
    internal.initial_R = internal.R_init;
    internal.initial_T = internal.T_init;
    internal.initial_V = internal.V_init;
    this.updateMetadata();
  }
  getInternal() {
    return this.internal;
  }
  rhs(t, state, dstatedt) {
    var internal = this.internal;
    const T = state[0];
    const B = state[1];
    const E = state[2];
    const R = state[3];
    const V = state[4];
    dstatedt[1] = 0 + internal.tme * internal.a1 * Math.pow((T), (2)) / (internal.c2 + Math.pow((T), (2))) - internal.tme * internal.d * B;
    dstatedt[2] = 0 + internal.tme * internal.f * E * T / (1 + internal.c3 * T * B) - internal.tme * internal.d1 * E - internal.tme * internal.d0 * R * E - internal.tme * internal.r * E;
    dstatedt[3] = 0 + internal.tme * internal.r * E - internal.tme * internal.d1 * R;
    dstatedt[4] = 0 - internal.tme * internal.d1 * V;
    dstatedt[0] = 0 + internal.tme * internal.a0 * T * (1 - internal.c0 * T) - internal.tme * internal.d0 * E * T / (1 + internal.c1 * B) - internal.tme * internal.d0 * T * V;
  }
  names() {
    return this.metadata.ynames.slice(1);
  }
  updateMetadata() {
    this.metadata = {};
    var internal = this.internal;
    this.metadata.ynames = ["t", "T", "B", "E", "R", "V"];
    this.metadata.internalOrder = {a0: null, a1: null, B_init: null, c0: null, c0inv: null, c1: null, c2: null, c3: null, d: null, d0: null, d1: null, E_init: null, f: null, g0: null, initial_B: null, initial_E: null, initial_R: null, initial_T: null, initial_V: null, r: null, R_init: null, T_init: null, tme: null, V_init: null};
    this.metadata.variableOrder = {T: null, B: null, E: null, R: null, V: null};
    this.metadata.outputOrder = null;
  }
  getMetadata() {
    return this.metadata;
  }
}
