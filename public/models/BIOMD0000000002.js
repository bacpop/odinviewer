export class model {
  constructor(base, user, unusedUserAction) {
    this.base = base;
    this.internal = {};
    var internal = this.internal;
    internal.comp1 = 9.9999999999999998e-17;
    this.setUser(user, unusedUserAction);
  }
  initial(t) {
    var internal = this.internal;
    var state = Array(13).fill(0);
    state[0] = internal.initial_BLL;
    state[1] = internal.initial_IL;
    state[2] = internal.initial_AL;
    state[3] = internal.initial_A;
    state[4] = internal.initial_BL;
    state[5] = internal.initial_B;
    state[6] = internal.initial_DLL;
    state[7] = internal.initial_D;
    state[8] = internal.initial_ILL;
    state[9] = internal.initial_DL;
    state[10] = internal.initial_I;
    state[11] = internal.initial_ALL;
    state[12] = internal.initial_L;
    return state;
  }
  setUser(user, unusedUserAction) {
    this.base.user.checkUser(user, ["A_init", "AL_init", "ALL_init", "B_init", "BL_init", "BLL_init", "D_init", "DL_init", "DLL_init", "I_init", "IL_init", "ILL_init", "kf_0", "kf_1", "kf_10", "kf_11", "kf_12", "kf_13", "kf_14", "kf_15", "kf_16", "kf_2", "kf_3", "kf_4", "kf_5", "kf_6", "kf_7", "kf_8", "kf_9", "kr_0", "kr_1", "kr_10", "kr_11", "kr_12", "kr_13", "kr_14", "kr_15", "kr_16", "kr_2", "kr_3", "kr_4", "kr_5", "kr_6", "kr_7", "kr_8", "kr_9", "L_init"], unusedUserAction);
    var internal = this.internal;
    this.base.user.setUserScalar(user, "A_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "AL_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "ALL_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "B_init", internal, 1e-22, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "BL_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "BLL_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "D_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "DL_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "DLL_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "I_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "IL_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "ILL_init", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "kf_0", internal, 300000000, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "kf_1", internal, 150000000, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "kf_10", internal, 19.850000000000001, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "kf_11", internal, 20, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "kf_12", internal, 300000000, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "kf_13", internal, 150000000, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "kf_14", internal, 0.050000000000000003, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "kf_15", internal, 0.050000000000000003, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "kf_16", internal, 0.050000000000000003, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "kf_2", internal, 30000, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "kf_3", internal, 300000000, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "kf_4", internal, 150000000, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "kf_5", internal, 0.54000000000000004, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "kf_6", internal, 130, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "kf_7", internal, 300000000, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "kf_8", internal, 150000000, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "kf_9", internal, 19.699999999999999, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "kr_0", internal, 8000, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "kr_1", internal, 16000, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "kr_10", internal, 1.74, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "kr_11", internal, 0.81000000000000005, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "kr_12", internal, 4, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "kr_13", internal, 8, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "kr_14", internal, 0.0011999999999999999, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "kr_15", internal, 0.0011999999999999999, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "kr_16", internal, 0.0011999999999999999, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "kr_2", internal, 700, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "kr_3", internal, 8.6400000000000006, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "kr_4", internal, 17.280000000000001, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "kr_5", internal, 10800, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "kr_6", internal, 2740, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "kr_7", internal, 4, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "kr_8", internal, 8, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "kr_9", internal, 3.7400000000000002, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "L_init", internal, 9.9999999999999991e-22, -Infinity, Infinity, false);
    internal.initial_A = internal.A_init;
    internal.initial_AL = internal.AL_init;
    internal.initial_ALL = internal.ALL_init;
    internal.initial_B = internal.B_init;
    internal.initial_BL = internal.BL_init;
    internal.initial_BLL = internal.BLL_init;
    internal.initial_D = internal.D_init;
    internal.initial_DL = internal.DL_init;
    internal.initial_DLL = internal.DLL_init;
    internal.initial_I = internal.I_init;
    internal.initial_IL = internal.IL_init;
    internal.initial_ILL = internal.ILL_init;
    internal.initial_L = internal.L_init;
    this.updateMetadata();
  }
  getInternal() {
    return this.internal;
  }
  rhs(t, state, dstatedt) {
    var internal = this.internal;
    const BLL = state[0];
    const IL = state[1];
    const AL = state[2];
    const A = state[3];
    const BL = state[4];
    const B = state[5];
    const DLL = state[6];
    const D = state[7];
    const ILL = state[8];
    const DL = state[9];
    const I = state[10];
    const ALL = state[11];
    const L = state[12];
    dstatedt[3] = 0 - internal.comp1 * (internal.kf_3 * A * L - internal.kr_3 * AL) + internal.comp1 * (internal.kf_5 * B - internal.kr_5 * A) - internal.comp1 * (internal.kf_9 * A - internal.kr_9 * I);
    dstatedt[2] = 0 + internal.comp1 * (internal.kf_3 * A * L - internal.kr_3 * AL) - internal.comp1 * (internal.kf_4 * AL * L - internal.kr_4 * ALL) + internal.comp1 * (internal.kf_6 * BL - internal.kr_6 * AL) - internal.comp1 * (internal.kf_10 * AL - internal.kr_10 * IL);
    dstatedt[11] = 0 + internal.comp1 * (internal.kf_2 * BLL - internal.kr_2 * ALL) + internal.comp1 * (internal.kf_4 * AL * L - internal.kr_4 * ALL) - internal.comp1 * (internal.kf_11 * ALL - internal.kr_11 * ILL);
    dstatedt[5] = 0 - internal.comp1 * (internal.kf_0 * B * L - internal.kr_0 * BL) - internal.comp1 * (internal.kf_5 * B - internal.kr_5 * A);
    dstatedt[4] = 0 + internal.comp1 * (internal.kf_0 * B * L - internal.kr_0 * BL) - internal.comp1 * (internal.kf_1 * BL * L - internal.kr_1 * BLL) - internal.comp1 * (internal.kf_6 * BL - internal.kr_6 * AL);
    dstatedt[0] = 0 + internal.comp1 * (internal.kf_1 * BL * L - internal.kr_1 * BLL) - internal.comp1 * (internal.kf_2 * BLL - internal.kr_2 * ALL);
    dstatedt[7] = 0 - internal.comp1 * (internal.kf_12 * D * L - internal.kr_12 * DL) + internal.comp1 * (internal.kf_14 * I - internal.kr_14 * D);
    dstatedt[9] = 0 + internal.comp1 * (internal.kf_12 * D * L - internal.kr_12 * DL) - internal.comp1 * (internal.kf_13 * DL * L - internal.kr_13 * DLL) + internal.comp1 * (internal.kf_15 * IL - internal.kr_15 * DL);
    dstatedt[6] = 0 + internal.comp1 * (internal.kf_13 * DL * L - internal.kr_13 * DLL) + internal.comp1 * (internal.kf_16 * ILL - internal.kr_16 * DLL);
    dstatedt[10] = 0 - internal.comp1 * (internal.kf_7 * I * L - internal.kr_7 * IL) + internal.comp1 * (internal.kf_9 * A - internal.kr_9 * I) - internal.comp1 * (internal.kf_14 * I - internal.kr_14 * D);
    dstatedt[1] = 0 + internal.comp1 * (internal.kf_7 * I * L - internal.kr_7 * IL) - internal.comp1 * (internal.kf_8 * IL * L - internal.kr_8 * ILL) + internal.comp1 * (internal.kf_10 * AL - internal.kr_10 * IL) - internal.comp1 * (internal.kf_15 * IL - internal.kr_15 * DL);
    dstatedt[8] = 0 + internal.comp1 * (internal.kf_8 * IL * L - internal.kr_8 * ILL) + internal.comp1 * (internal.kf_11 * ALL - internal.kr_11 * ILL) - internal.comp1 * (internal.kf_16 * ILL - internal.kr_16 * DLL);
    dstatedt[12] = 0 - internal.comp1 * (internal.kf_0 * B * L - internal.kr_0 * BL) - internal.comp1 * (internal.kf_1 * BL * L - internal.kr_1 * BLL) - internal.comp1 * (internal.kf_3 * A * L - internal.kr_3 * AL) - internal.comp1 * (internal.kf_4 * AL * L - internal.kr_4 * ALL) - internal.comp1 * (internal.kf_7 * I * L - internal.kr_7 * IL) - internal.comp1 * (internal.kf_8 * IL * L - internal.kr_8 * ILL) - internal.comp1 * (internal.kf_12 * D * L - internal.kr_12 * DL) - internal.comp1 * (internal.kf_13 * DL * L - internal.kr_13 * DLL);
  }
  names() {
    return this.metadata.ynames.slice(1);
  }
  updateMetadata() {
    this.metadata = {};
    var internal = this.internal;
    this.metadata.ynames = ["t", "BLL", "IL", "AL", "A", "BL", "B", "DLL", "D", "ILL", "DL", "I", "ALL", "L"];
    this.metadata.internalOrder = {A_init: null, AL_init: null, ALL_init: null, B_init: null, BL_init: null, BLL_init: null, comp1: null, D_init: null, DL_init: null, DLL_init: null, I_init: null, IL_init: null, ILL_init: null, initial_A: null, initial_AL: null, initial_ALL: null, initial_B: null, initial_BL: null, initial_BLL: null, initial_D: null, initial_DL: null, initial_DLL: null, initial_I: null, initial_IL: null, initial_ILL: null, initial_L: null, kf_0: null, kf_1: null, kf_10: null, kf_11: null, kf_12: null, kf_13: null, kf_14: null, kf_15: null, kf_16: null, kf_2: null, kf_3: null, kf_4: null, kf_5: null, kf_6: null, kf_7: null, kf_8: null, kf_9: null, kr_0: null, kr_1: null, kr_10: null, kr_11: null, kr_12: null, kr_13: null, kr_14: null, kr_15: null, kr_16: null, kr_2: null, kr_3: null, kr_4: null, kr_5: null, kr_6: null, kr_7: null, kr_8: null, kr_9: null, L_init: null};
    this.metadata.variableOrder = {BLL: null, IL: null, AL: null, A: null, BL: null, B: null, DLL: null, D: null, ILL: null, DL: null, I: null, ALL: null, L: null};
    this.metadata.outputOrder = null;
  }
  getMetadata() {
    return this.metadata;
  }
}
