export class model {
  constructor(base, user, unusedUserAction) {
    this.base = base;
    this.internal = {};
    var internal = this.internal;
    internal.cell = 1;
    internal.K1 = 0.0050000000000000001;
    internal.K2 = 0.0050000000000000001;
    internal.K3 = 0.0050000000000000001;
    internal.K4 = 0.0050000000000000001;
    internal.kd = 0.01;
    internal.Kd = 0.02;
    internal.V2 = 1.5;
    internal.V4 = 0.5;
    internal.vd = 0.25;
    internal.vi = 0.025000000000000001;
    this.setUser(user, unusedUserAction);
  }
  initial(t) {
    var internal = this.internal;
    var state = Array(3).fill(0);
    state[0] = internal.initial_C;
    state[1] = internal.initial_M;
    state[2] = internal.initial_X;
    return state;
  }
  setUser(user, unusedUserAction) {
    this.base.user.checkUser(user, ["C_init", "Kc", "M_init", "VM1", "VM3", "X_init"], unusedUserAction);
    var internal = this.internal;
    this.base.user.setUserScalar(user, "C_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "Kc", internal, 0.5, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "M_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "VM1", internal, 3, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "VM3", internal, 1, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "X_init", internal, 0, -Infinity, Infinity, false);
    internal.initial_C = internal.C_init;
    internal.initial_M = internal.M_init;
    internal.initial_X = internal.X_init;
    this.updateMetadata();
  }
  getInternal() {
    return this.internal;
  }
  rhs(t, state, dstatedt) {
    var internal = this.internal;
    const C = state[0];
    const M = state[1];
    const X = state[2];
    dstatedt[0] = 0 + internal.cell * internal.vi - C * internal.cell * internal.kd - C * internal.cell * internal.vd * X * Math.pow((C + internal.Kd), (- 1));
    var V1 = C * internal.VM1 * Math.pow((C + internal.Kc), (- 1));
    var V3 = M * internal.VM3;
    dstatedt[1] = 0 + internal.cell * (1 + - 1 * M) * V1 * Math.pow((internal.K1 + - 1 * M + 1), (- 1)) - internal.cell * M * internal.V2 * Math.pow((internal.K2 + M), (- 1));
    dstatedt[2] = 0 + internal.cell * V3 * (1 + - 1 * X) * Math.pow((internal.K3 + - 1 * X + 1), (- 1)) - internal.cell * internal.V4 * X * Math.pow((internal.K4 + X), (- 1));
  }
  names() {
    return this.metadata.ynames.slice(1);
  }
  updateMetadata() {
    this.metadata = {};
    var internal = this.internal;
    this.metadata.ynames = ["t", "C", "M", "X"];
    this.metadata.internalOrder = {C_init: null, cell: null, initial_C: null, initial_M: null, initial_X: null, K1: null, K2: null, K3: null, K4: null, Kc: null, kd: null, Kd: null, M_init: null, V2: null, V4: null, vd: null, vi: null, VM1: null, VM3: null, X_init: null};
    this.metadata.variableOrder = {C: null, M: null, X: null};
    this.metadata.outputOrder = null;
  }
  getMetadata() {
    return this.metadata;
  }
}
