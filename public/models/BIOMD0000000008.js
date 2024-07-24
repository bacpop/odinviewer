export class model {
  constructor(base, user, unusedUserAction) {
    this.base = base;
    this.internal = {};
    var internal = this.internal;
    internal.a1 = 0.050000000000000003;
    internal.a2 = 0.050000000000000003;
    internal.alpha = 0.10000000000000001;
    internal.Cell = 1;
    internal.d1 = 0.050000000000000003;
    internal.k1 = 0.5;
    internal.K1 = 0.10000000000000001;
    internal.K2 = 0.10000000000000001;
    internal.K3 = 0.20000000000000001;
    internal.K4 = 0.10000000000000001;
    internal.K5 = 0.02;
    internal.kd = 0.02;
    internal.V2 = 0.25;
    internal.V4 = 0.10000000000000001;
    internal.vi = 0.10000000000000001;
    internal.vs = 0.20000000000000001;
    this.setUser(user, unusedUserAction);
  }
  initial(t) {
    var internal = this.internal;
    var state = Array(5).fill(0);
    state[0] = internal.initial_C;
    state[1] = internal.initial_X;
    state[2] = internal.initial_M;
    state[3] = internal.initial_Y;
    state[4] = internal.initial_Z;
    return state;
  }
  setUser(user, unusedUserAction) {
    this.base.user.checkUser(user, ["C_init", "K6", "M_init", "V1p", "V3p", "X_init", "Y_init", "Z_init"], unusedUserAction);
    var internal = this.internal;
    this.base.user.setUserScalar(user, "C_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "K6", internal, 0.29999999999999999, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "M_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "V1p", internal, 0.75, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "V3p", internal, 0.29999999999999999, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "X_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "Y_init", internal, 1, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "Z_init", internal, 1, -Infinity, Infinity, false);
    internal.initial_C = internal.C_init;
    internal.initial_M = internal.M_init;
    internal.initial_X = internal.X_init;
    internal.initial_Y = internal.Y_init;
    internal.initial_Z = internal.Z_init;
    this.updateMetadata();
  }
  getInternal() {
    return this.internal;
  }
  rhs(t, state, dstatedt) {
    var internal = this.internal;
    const C = state[0];
    const X = state[1];
    const M = state[2];
    const Y = state[3];
    const Z = state[4];
    dstatedt[0] = 0 + internal.vi - C * internal.k1 * X * Math.pow((C + internal.K5), (- 1)) - C * internal.kd - internal.a1 * C * Y + internal.a2 * Z + internal.alpha * internal.d1 * Z;
    dstatedt[3] = 0 - internal.a1 * C * Y + internal.a2 * Z + internal.alpha * internal.kd * Z + internal.vs - internal.d1 * Y;
    dstatedt[4] = 0 + internal.a1 * C * Y - internal.a2 * Z - internal.alpha * internal.d1 * Z - internal.alpha * internal.kd * Z;
    var V1 = C * internal.V1p * Math.pow((C + internal.K6), (- 1));
    var V3 = M * internal.V3p;
    dstatedt[2] = 0 + (1 + - 1 * M) * V1 * Math.pow((internal.K1 + - 1 * M + 1), (- 1)) - M * internal.V2 * Math.pow((internal.K2 + M), (- 1));
    dstatedt[1] = 0 + V3 * (1 + - 1 * X) * Math.pow((internal.K3 + - 1 * X + 1), (- 1)) - internal.V4 * X * Math.pow((internal.K4 + X), (- 1));
  }
  names() {
    return this.metadata.ynames.slice(1);
  }
  updateMetadata() {
    this.metadata = {};
    var internal = this.internal;
    this.metadata.ynames = ["t", "C", "X", "M", "Y", "Z"];
    this.metadata.internalOrder = {a1: null, a2: null, alpha: null, C_init: null, Cell: null, d1: null, initial_C: null, initial_M: null, initial_X: null, initial_Y: null, initial_Z: null, k1: null, K1: null, K2: null, K3: null, K4: null, K5: null, K6: null, kd: null, M_init: null, V1p: null, V2: null, V3p: null, V4: null, vi: null, vs: null, X_init: null, Y_init: null, Z_init: null};
    this.metadata.variableOrder = {C: null, X: null, M: null, Y: null, Z: null};
    this.metadata.outputOrder = null;
  }
  getMetadata() {
    return this.metadata;
  }
}
