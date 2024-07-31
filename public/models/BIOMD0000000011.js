export class model {
  constructor(base, user, unusedUserAction) {
    this.base = base;
    this.internal = {};
    var internal = this.internal;
    internal.a1 = 1;
    internal.a10 = 5;
    internal.a2 = 0.5;
    internal.a3 = 3.2999999999999998;
    internal.a4 = 10;
    internal.a5 = 3.2999999999999998;
    internal.a6 = 10;
    internal.a7 = 20;
    internal.a8 = 5;
    internal.a9 = 20;
    internal.Cytoplasm = 1;
    internal.d1 = 0.40000000000000002;
    internal.d10 = 0.40000000000000002;
    internal.d2 = 0.5;
    internal.d3 = 0.41999999999999998;
    internal.d4 = 0.80000000000000004;
    internal.d5 = 0.40000000000000002;
    internal.d6 = 0.80000000000000004;
    internal.d7 = 0.59999999999999998;
    internal.d8 = 0.40000000000000002;
    internal.d9 = 0.59999999999999998;
    internal.k1 = 0.10000000000000001;
    internal.k10 = 0.10000000000000001;
    internal.k2 = 0.10000000000000001;
    internal.k3 = 0.10000000000000001;
    internal.k4 = 0.10000000000000001;
    internal.k5 = 0.10000000000000001;
    internal.k6 = 0.10000000000000001;
    internal.k7 = 0.10000000000000001;
    internal.k8 = 0.10000000000000001;
    internal.k9 = 0.10000000000000001;
    this.setUser(user, unusedUserAction);
  }
  initial(t) {
    var internal = this.internal;
    var state = Array(22).fill(0);
    state[0] = internal.initial_MAPK;
    state[1] = internal.initial_MAPKMEKpp;
    state[2] = internal.initial_MAPKp;
    state[3] = internal.initial_MAPKPH;
    state[4] = internal.initial_MAPKpMAPKPH;
    state[5] = internal.initial_MAPKpMEKpp;
    state[6] = internal.initial_MAPKpp;
    state[7] = internal.initial_MAPKppMAPKPH;
    state[8] = internal.initial_MEK;
    state[9] = internal.initial_MEKp;
    state[10] = internal.initial_MEKPH;
    state[11] = internal.initial_MEKpMEKPH;
    state[12] = internal.initial_MEKpp;
    state[13] = internal.initial_MEKppMEKPH;
    state[14] = internal.initial_MEKpRAFp;
    state[15] = internal.initial_MEKRAFp;
    state[16] = internal.initial_RAF;
    state[17] = internal.initial_RAFK;
    state[18] = internal.initial_RAFp;
    state[19] = internal.initial_RAFPH;
    state[20] = internal.initial_RAFpRAFPH;
    state[21] = internal.initial_RAFRAFK;
    return state;
  }
  setUser(user, unusedUserAction) {
    this.base.user.checkUser(user, ["MAPK_init", "MAPKMEKpp_init", "MAPKp_init", "MAPKPH_init", "MAPKpMAPKPH_init", "MAPKpMEKpp_init", "MAPKpp_init", "MAPKppMAPKPH_init", "MEK_init", "MEKp_init", "MEKPH_init", "MEKpMEKPH_init", "MEKpp_init", "MEKppMEKPH_init", "MEKpRAFp_init", "MEKRAFp_init", "RAF_init", "RAFK_init", "RAFp_init", "RAFPH_init", "RAFpRAFPH_init", "RAFRAFK_init"], unusedUserAction);
    var internal = this.internal;
    this.base.user.setUserScalar(user, "MAPK_init", internal, 0.40000000000000002, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "MAPKMEKpp_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "MAPKp_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "MAPKPH_init", internal, 0.29999999999999999, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "MAPKpMAPKPH_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "MAPKpMEKpp_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "MAPKpp_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "MAPKppMAPKPH_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "MEK_init", internal, 0.20000000000000001, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "MEKp_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "MEKPH_init", internal, 0.20000000000000001, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "MEKpMEKPH_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "MEKpp_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "MEKppMEKPH_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "MEKpRAFp_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "MEKRAFp_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "RAF_init", internal, 0.29999999999999999, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "RAFK_init", internal, 0.20000000000000001, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "RAFp_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "RAFPH_init", internal, 0.29999999999999999, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "RAFpRAFPH_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "RAFRAFK_init", internal, 0, -Infinity, Infinity, false);
    internal.initial_MAPK = internal.MAPK_init;
    internal.initial_MAPKMEKpp = internal.MAPKMEKpp_init;
    internal.initial_MAPKp = internal.MAPKp_init;
    internal.initial_MAPKPH = internal.MAPKPH_init;
    internal.initial_MAPKpMAPKPH = internal.MAPKpMAPKPH_init;
    internal.initial_MAPKpMEKpp = internal.MAPKpMEKpp_init;
    internal.initial_MAPKpp = internal.MAPKpp_init;
    internal.initial_MAPKppMAPKPH = internal.MAPKppMAPKPH_init;
    internal.initial_MEK = internal.MEK_init;
    internal.initial_MEKp = internal.MEKp_init;
    internal.initial_MEKPH = internal.MEKPH_init;
    internal.initial_MEKpMEKPH = internal.MEKpMEKPH_init;
    internal.initial_MEKpp = internal.MEKpp_init;
    internal.initial_MEKppMEKPH = internal.MEKppMEKPH_init;
    internal.initial_MEKpRAFp = internal.MEKpRAFp_init;
    internal.initial_MEKRAFp = internal.MEKRAFp_init;
    internal.initial_RAF = internal.RAF_init;
    internal.initial_RAFK = internal.RAFK_init;
    internal.initial_RAFp = internal.RAFp_init;
    internal.initial_RAFPH = internal.RAFPH_init;
    internal.initial_RAFpRAFPH = internal.RAFpRAFPH_init;
    internal.initial_RAFRAFK = internal.RAFRAFK_init;
    this.updateMetadata();
  }
  getInternal() {
    return this.internal;
  }
  rhs(t, state, dstatedt) {
    var internal = this.internal;
    const MAPK = state[0];
    const MAPKMEKpp = state[1];
    const MAPKp = state[2];
    const MAPKPH = state[3];
    const MAPKpMAPKPH = state[4];
    const MAPKpMEKpp = state[5];
    const MAPKpp = state[6];
    const MAPKppMAPKPH = state[7];
    const MEK = state[8];
    const MEKp = state[9];
    const MEKPH = state[10];
    const MEKpMEKPH = state[11];
    const MEKpp = state[12];
    const MEKppMEKPH = state[13];
    const MEKpRAFp = state[14];
    const MEKRAFp = state[15];
    const RAF = state[16];
    const RAFK = state[17];
    const RAFp = state[18];
    const RAFPH = state[19];
    const RAFpRAFPH = state[20];
    const RAFRAFK = state[21];
    dstatedt[0] = 0 - internal.a7 * MAPK * MEKpp + internal.d7 * MAPKMEKpp + internal.k8 * MAPKpMAPKPH;
    dstatedt[1] = 0 + internal.a7 * MAPK * MEKpp - internal.d7 * MAPKMEKpp - internal.k7 * MAPKMEKpp;
    dstatedt[2] = 0 + internal.k7 * MAPKMEKpp - internal.a8 * MAPKp * MAPKPH + internal.d8 * MAPKpMAPKPH - internal.a9 * MAPKp * MEKpp + internal.d9 * MAPKpMEKpp + internal.k10 * MAPKppMAPKPH;
    dstatedt[3] = 0 - internal.a8 * MAPKp * MAPKPH + internal.d8 * MAPKpMAPKPH + internal.k8 * MAPKpMAPKPH - internal.a10 * MAPKPH * MAPKpp + internal.d10 * MAPKppMAPKPH + internal.k10 * MAPKppMAPKPH;
    dstatedt[4] = 0 + internal.a8 * MAPKp * MAPKPH - internal.d8 * MAPKpMAPKPH - internal.k8 * MAPKpMAPKPH;
    dstatedt[5] = 0 + internal.a9 * MAPKp * MEKpp - internal.d9 * MAPKpMEKpp - internal.k9 * MAPKpMEKpp;
    dstatedt[6] = 0 + internal.k9 * MAPKpMEKpp - internal.a10 * MAPKPH * MAPKpp + internal.d10 * MAPKppMAPKPH;
    dstatedt[7] = 0 + internal.a10 * MAPKPH * MAPKpp - internal.d10 * MAPKppMAPKPH - internal.k10 * MAPKppMAPKPH;
    dstatedt[8] = 0 - internal.a3 * MEK * RAFp + internal.d3 * MEKRAFp + internal.k4 * MEKpMEKPH;
    dstatedt[9] = 0 + internal.k3 * MEKRAFp - internal.a4 * MEKp * MEKPH + internal.d4 * MEKpMEKPH - internal.a5 * MEKp * RAFp + internal.d5 * MEKpRAFp + internal.k6 * MEKppMEKPH;
    dstatedt[10] = 0 - internal.a4 * MEKp * MEKPH + internal.d4 * MEKpMEKPH + internal.k4 * MEKpMEKPH - internal.a6 * MEKPH * MEKpp + internal.d6 * MEKppMEKPH + internal.k6 * MEKppMEKPH;
    dstatedt[11] = 0 + internal.a4 * MEKp * MEKPH - internal.d4 * MEKpMEKPH - internal.k4 * MEKpMEKPH;
    dstatedt[12] = 0 + internal.k5 * MEKpRAFp - internal.a6 * MEKPH * MEKpp + internal.d6 * MEKppMEKPH - internal.a7 * MAPK * MEKpp + internal.d7 * MAPKMEKpp + internal.k7 * MAPKMEKpp - internal.a9 * MAPKp * MEKpp + internal.d9 * MAPKpMEKpp + internal.k9 * MAPKpMEKpp;
    dstatedt[13] = 0 + internal.a6 * MEKPH * MEKpp - internal.d6 * MEKppMEKPH - internal.k6 * MEKppMEKPH;
    dstatedt[14] = 0 + internal.a5 * MEKp * RAFp - internal.d5 * MEKpRAFp - internal.k5 * MEKpRAFp;
    dstatedt[15] = 0 + internal.a3 * MEK * RAFp - internal.d3 * MEKRAFp - internal.k3 * MEKRAFp;
    dstatedt[16] = 0 - internal.a1 * RAF * RAFK + internal.d1 * RAFRAFK + internal.k2 * RAFpRAFPH;
    dstatedt[17] = 0 - internal.a1 * RAF * RAFK + internal.d1 * RAFRAFK + internal.k1 * RAFRAFK;
    dstatedt[18] = 0 + internal.k1 * RAFRAFK - internal.a2 * RAFp * RAFPH + internal.d2 * RAFpRAFPH - internal.a3 * MEK * RAFp + internal.d3 * MEKRAFp + internal.k3 * MEKRAFp - internal.a5 * MEKp * RAFp + internal.d5 * MEKpRAFp + internal.k5 * MEKpRAFp;
    dstatedt[19] = 0 - internal.a2 * RAFp * RAFPH + internal.d2 * RAFpRAFPH + internal.k2 * RAFpRAFPH;
    dstatedt[20] = 0 + internal.a2 * RAFp * RAFPH - internal.d2 * RAFpRAFPH - internal.k2 * RAFpRAFPH;
    dstatedt[21] = 0 + internal.a1 * RAF * RAFK - internal.d1 * RAFRAFK - internal.k1 * RAFRAFK;
  }
  names() {
    return this.metadata.ynames.slice(1);
  }
  updateMetadata() {
    this.metadata = {};
    var internal = this.internal;
    this.metadata.ynames = ["t", "MAPK", "MAPKMEKpp", "MAPKp", "MAPKPH", "MAPKpMAPKPH", "MAPKpMEKpp", "MAPKpp", "MAPKppMAPKPH", "MEK", "MEKp", "MEKPH", "MEKpMEKPH", "MEKpp", "MEKppMEKPH", "MEKpRAFp", "MEKRAFp", "RAF", "RAFK", "RAFp", "RAFPH", "RAFpRAFPH", "RAFRAFK"];
    this.metadata.internalOrder = {a1: null, a10: null, a2: null, a3: null, a4: null, a5: null, a6: null, a7: null, a8: null, a9: null, Cytoplasm: null, d1: null, d10: null, d2: null, d3: null, d4: null, d5: null, d6: null, d7: null, d8: null, d9: null, initial_MAPK: null, initial_MAPKMEKpp: null, initial_MAPKp: null, initial_MAPKPH: null, initial_MAPKpMAPKPH: null, initial_MAPKpMEKpp: null, initial_MAPKpp: null, initial_MAPKppMAPKPH: null, initial_MEK: null, initial_MEKp: null, initial_MEKPH: null, initial_MEKpMEKPH: null, initial_MEKpp: null, initial_MEKppMEKPH: null, initial_MEKpRAFp: null, initial_MEKRAFp: null, initial_RAF: null, initial_RAFK: null, initial_RAFp: null, initial_RAFPH: null, initial_RAFpRAFPH: null, initial_RAFRAFK: null, k1: null, k10: null, k2: null, k3: null, k4: null, k5: null, k6: null, k7: null, k8: null, k9: null, MAPK_init: null, MAPKMEKpp_init: null, MAPKp_init: null, MAPKPH_init: null, MAPKpMAPKPH_init: null, MAPKpMEKpp_init: null, MAPKpp_init: null, MAPKppMAPKPH_init: null, MEK_init: null, MEKp_init: null, MEKPH_init: null, MEKpMEKPH_init: null, MEKpp_init: null, MEKppMEKPH_init: null, MEKpRAFp_init: null, MEKRAFp_init: null, RAF_init: null, RAFK_init: null, RAFp_init: null, RAFPH_init: null, RAFpRAFPH_init: null, RAFRAFK_init: null};
    this.metadata.variableOrder = {MAPK: null, MAPKMEKpp: null, MAPKp: null, MAPKPH: null, MAPKpMAPKPH: null, MAPKpMEKpp: null, MAPKpp: null, MAPKppMAPKPH: null, MEK: null, MEKp: null, MEKPH: null, MEKpMEKPH: null, MEKpp: null, MEKppMEKPH: null, MEKpRAFp: null, MEKRAFp: null, RAF: null, RAFK: null, RAFp: null, RAFPH: null, RAFpRAFPH: null, RAFRAFK: null};
    this.metadata.outputOrder = null;
  }
  getMetadata() {
    return this.metadata;
  }
}
