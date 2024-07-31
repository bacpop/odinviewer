export class model {
  constructor(base, user, unusedUserAction) {
    this.base = base;
    this.internal = {};
    var internal = this.internal;
    internal.cell = 1;
    this.setUser(user, unusedUserAction);
  }
  initial(t) {
    var internal = this.internal;
    var state = Array(6).fill(0);
    state[0] = internal.initial_PX;
    state[1] = internal.initial_PY;
    state[2] = internal.initial_PZ;
    state[3] = internal.initial_X;
    state[4] = internal.initial_Y;
    state[5] = internal.initial_Z;
    return state;
  }
  setUser(user, unusedUserAction) {
    this.base.user.checkUser(user, ["eff", "KM", "n", "ps_0", "ps_a", "PX_init", "PY_init", "PZ_init", "tau_mRNA", "tau_prot", "X_init", "Y_init", "Z_init"], unusedUserAction);
    var internal = this.internal;
    this.base.user.setUserScalar(user, "eff", internal, 20, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "KM", internal, 40, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "n", internal, 2, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "ps_0", internal, 0.00050000000000000001, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "ps_a", internal, 0.5, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "PX_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "PY_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "PZ_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "tau_mRNA", internal, 2, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "tau_prot", internal, 10, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "X_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "Y_init", internal, 20, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "Z_init", internal, 0, -Infinity, Infinity, false);
    internal.a_tr = (internal.ps_a - internal.ps_0) * 60;
    internal.a0_tr = internal.ps_0 * 60;
    internal.beta = internal.tau_mRNA / internal.tau_prot;
    internal.initial_PX = internal.PX_init;
    internal.initial_PY = internal.PY_init;
    internal.initial_PZ = internal.PZ_init;
    internal.initial_X = internal.X_init;
    internal.initial_Y = internal.Y_init;
    internal.initial_Z = internal.Z_init;
    internal.kd_mRNA = Math.log(2) / internal.tau_mRNA;
    internal.kd_prot = Math.log(2) / internal.tau_prot;
    internal.t_ave = internal.tau_mRNA / Math.log(2);
    internal.alpha = internal.a_tr * internal.eff * internal.tau_prot / (Math.log(2) * internal.KM);
    internal.alpha0 = internal.a0_tr * internal.eff * internal.tau_prot / (Math.log(2) * internal.KM);
    internal.k_tl = internal.eff / internal.t_ave;
    this.updateMetadata();
  }
  getInternal() {
    return this.internal;
  }
  rhs(t, state, dstatedt) {
    var internal = this.internal;
    const PX = state[0];
    const PY = state[1];
    const PZ = state[2];
    const X = state[3];
    const Y = state[4];
    const Z = state[5];
    dstatedt[3] = 0 - internal.kd_mRNA * X + internal.a0_tr + internal.a_tr * Math.pow((internal.KM), (internal.n)) / (Math.pow((internal.KM), (internal.n)) + Math.pow((PZ), (internal.n)));
    dstatedt[4] = 0 - internal.kd_mRNA * Y + internal.a0_tr + internal.a_tr * Math.pow((internal.KM), (internal.n)) / (Math.pow((internal.KM), (internal.n)) + Math.pow((PX), (internal.n)));
    dstatedt[5] = 0 - internal.kd_mRNA * Z + internal.a0_tr + internal.a_tr * Math.pow((internal.KM), (internal.n)) / (Math.pow((internal.KM), (internal.n)) + Math.pow((PY), (internal.n)));
    dstatedt[0] = 0 + internal.k_tl * X - internal.kd_prot * PX;
    dstatedt[1] = 0 + internal.k_tl * Y - internal.kd_prot * PY;
    dstatedt[2] = 0 + internal.k_tl * Z - internal.kd_prot * PZ;
  }
  names() {
    return this.metadata.ynames.slice(1);
  }
  updateMetadata() {
    this.metadata = {};
    var internal = this.internal;
    this.metadata.ynames = ["t", "PX", "PY", "PZ", "X", "Y", "Z"];
    this.metadata.internalOrder = {a_tr: null, a0_tr: null, alpha: null, alpha0: null, beta: null, cell: null, eff: null, initial_PX: null, initial_PY: null, initial_PZ: null, initial_X: null, initial_Y: null, initial_Z: null, k_tl: null, kd_mRNA: null, kd_prot: null, KM: null, n: null, ps_0: null, ps_a: null, PX_init: null, PY_init: null, PZ_init: null, t_ave: null, tau_mRNA: null, tau_prot: null, X_init: null, Y_init: null, Z_init: null};
    this.metadata.variableOrder = {PX: null, PY: null, PZ: null, X: null, Y: null, Z: null};
    this.metadata.outputOrder = null;
  }
  getMetadata() {
    return this.metadata;
  }
}
