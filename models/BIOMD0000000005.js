export class model {
  constructor(base, user, unusedUserAction) {
    this.base = base;
    this.internal = {};
    var internal = this.internal;
    internal.cell = 1;
    internal.k1aa = 0.014999999999999999;
    internal.k2 = 0;
    internal.k3 = 200;
    internal.k4 = 180;
    internal.k4prime = 0.017999999999999999;
    internal.k5notP = 0;
    internal.k6 = 1;
    internal.k7 = 0.59999999999999998;
    internal.k8notP = 1000000;
    internal.k9 = 1000;
    this.setUser(user, unusedUserAction);
  }
  initial(t) {
    var internal = this.internal;
    var CT_init = internal.initial_C2 + internal.initial_CP + internal.initial_M + internal.initial_pM;
    var YT_init = internal.initial_Y + internal.initial_YP + internal.initial_M + internal.initial_pM;
    internal.initial_CT = CT_init;
    internal.initial_YT = YT_init;
    var state = Array(9).fill(0);
    state[0] = internal.initial_EmptySet;
    state[1] = internal.initial_C2;
    state[2] = internal.initial_CP;
    state[3] = internal.initial_M;
    state[4] = internal.initial_pM;
    state[5] = internal.initial_Y;
    state[6] = internal.initial_YP;
    state[7] = internal.initial_YT;
    state[8] = internal.initial_CT;
    return state;
  }
  setUser(user, unusedUserAction) {
    this.base.user.checkUser(user, ["C2_init", "CP_init", "EmptySet_init", "M_init", "pM_init", "Y_init", "YP_init"], unusedUserAction);
    var internal = this.internal;
    this.base.user.setUserScalar(user, "C2_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "CP_init", internal, 0.75, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "EmptySet_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "M_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "pM_init", internal, 0.25, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "Y_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "YP_init", internal, 0, -Infinity, Infinity, false);
    internal.initial_C2 = internal.C2_init;
    internal.initial_CP = internal.CP_init;
    internal.initial_EmptySet = internal.EmptySet_init;
    internal.initial_M = internal.M_init;
    internal.initial_pM = internal.pM_init;
    internal.initial_Y = internal.Y_init;
    internal.initial_YP = internal.YP_init;
    this.updateMetadata();
  }
  getInternal() {
    return this.internal;
  }
  rhs(t, state, dstatedt) {
    var internal = this.internal;
    const C2 = state[1];
    const CP = state[2];
    const M = state[3];
    const pM = state[4];
    const Y = state[5];
    const YP = state[6];
    const CT = state[8];
    dstatedt[8] = 0 + 0;
    dstatedt[7] = 0 + 0;
    dstatedt[1] = 0 + internal.cell * internal.k6 * M - internal.cell * C2 * internal.k8notP + internal.cell * CP * internal.k9;
    dstatedt[2] = 0 + internal.cell * C2 * internal.k8notP - internal.cell * CP * internal.k9 - internal.cell * CP * internal.k3 * Y;
    dstatedt[0] = 0 - internal.cell * internal.k1aa + internal.cell * internal.k2 * Y + internal.cell * internal.k7 * YP;
    dstatedt[3] = 0 - internal.cell * internal.k6 * M - internal.cell * internal.k5notP * M + internal.cell * pM * (internal.k4prime + internal.k4 * Math.pow((M / CT), (2)));
    dstatedt[4] = 0 + internal.cell * CP * internal.k3 * Y + internal.cell * internal.k5notP * M - internal.cell * pM * (internal.k4prime + internal.k4 * Math.pow((M / CT), (2)));
    dstatedt[5] = 0 - internal.cell * CP * internal.k3 * Y + internal.cell * internal.k1aa - internal.cell * internal.k2 * Y;
    dstatedt[6] = 0 + internal.cell * internal.k6 * M - internal.cell * internal.k7 * YP;
  }
  names() {
    return this.metadata.ynames.slice(1);
  }
  updateMetadata() {
    this.metadata = {};
    var internal = this.internal;
    this.metadata.ynames = ["t", "EmptySet", "C2", "CP", "M", "pM", "Y", "YP", "YT", "CT"];
    this.metadata.internalOrder = {C2_init: null, cell: null, CP_init: null, EmptySet_init: null, initial_C2: null, initial_CP: null, initial_CT: null, initial_EmptySet: null, initial_M: null, initial_pM: null, initial_Y: null, initial_YP: null, initial_YT: null, k1aa: null, k2: null, k3: null, k4: null, k4prime: null, k5notP: null, k6: null, k7: null, k8notP: null, k9: null, M_init: null, pM_init: null, Y_init: null, YP_init: null};
    this.metadata.variableOrder = {EmptySet: null, C2: null, CP: null, M: null, pM: null, Y: null, YP: null, YT: null, CT: null};
    this.metadata.outputOrder = null;
  }
  getMetadata() {
    return this.metadata;
  }
}
