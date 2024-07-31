export class model {
  constructor(base, user, unusedUserAction) {
    this.base = base;
    this.internal = {};
    var internal = this.internal;
    internal.default_compartment = 1;
    this.setUser(user, unusedUserAction);
  }
  initial(t) {
    var internal = this.internal;
    var state = Array(7).fill(0);
    state[0] = internal.initial_A20_mRNA;
    state[1] = internal.initial_NFkB;
    state[2] = internal.initial_A20;
    state[3] = internal.initial_IkBa;
    state[4] = internal.initial_IkBa_mRNA;
    state[5] = internal.initial_NFkB_IkBa;
    state[6] = internal.initial_IKK_active;
    return state;
  }
  setUser(user, unusedUserAction) {
    this.base.user.checkUser(user, ["A20_init", "A20_mRNA_init", "IkBa_init", "IkBa_mRNA_init", "IKK_active_init", "k1", "k10", "k11", "k12", "k13", "k14", "k15", "k2", "k3", "k4", "k5", "k6", "k7", "k8", "k9", "NFkB_init", "stimulus"], unusedUserAction);
    var internal = this.internal;
    this.base.user.setUserScalar(user, "A20_init", internal, 0.302814090244101, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "A20_mRNA_init", internal, 2.6044082404165199, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "IkBa_init", internal, 0.73434608742426399, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "IkBa_mRNA_init", internal, 0.032412894821835903, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "IKK_active_init", internal, 0.017448654987448801, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "k1", internal, 9727.7089680715999, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "k10", internal, 0.098751337600000003, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "k11", internal, 0.0015859261999999999, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "k12", internal, 1.4453855879999999, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "k13", internal, 12.657051563, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "k14", internal, 0.0011844016000000001, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "k15", internal, 0.22328810800000001, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "k2", internal, 39.284345396299997, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "k3", internal, 0.85927221129999998, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "k4", internal, 0.0055014039999999997, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "k5", internal, 0.0063041258999999997, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "k6", internal, 0.00029974039999999997, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "k7", internal, 0.00038679110000000002, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "k8", internal, 0.0999074296, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "k9", internal, 0.1295180588, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "NFkB_init", internal, 0.0079051719185288492, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "stimulus", internal, 1, -Infinity, Infinity, false);
    internal.initial_A20 = internal.A20_init;
    internal.initial_A20_mRNA = internal.A20_mRNA_init;
    internal.initial_IkBa = internal.IkBa_init;
    internal.initial_IkBa_mRNA = internal.IkBa_mRNA_init;
    internal.initial_IKK_active = internal.IKK_active_init;
    internal.initial_NFkB = internal.NFkB_init;
    internal.NFkB_IkBa_init = internal.k12;
    internal.initial_NFkB_IkBa = internal.NFkB_IkBa_init;
    this.updateMetadata();
  }
  getInternal() {
    return this.internal;
  }
  rhs(t, state, dstatedt) {
    var internal = this.internal;
    const A20_mRNA = state[0];
    const NFkB = state[1];
    const A20 = state[2];
    const IkBa = state[3];
    const IkBa_mRNA = state[4];
    const NFkB_IkBa = state[5];
    const IKK_active = state[6];
    dstatedt[2] = 0 + internal.k8 * A20_mRNA - internal.k3 * A20;
    dstatedt[0] = 0 + internal.k10 * NFkB - internal.k6 * A20_mRNA;
    dstatedt[3] = 0 + internal.k9 * IkBa_mRNA - internal.k4 * IkBa - internal.k1 * IkBa * NFkB + internal.k2 * NFkB_IkBa;
    dstatedt[4] = 0 + internal.k11 * NFkB - internal.k7 * IkBa_mRNA;
    dstatedt[6] = 0 + internal.k14 / (internal.k14 + A20) - internal.k15 * IKK_active + internal.stimulus * internal.k13 * Math.exp(- A20);
    dstatedt[1] = 0 + - internal.k1 * IkBa * NFkB + internal.k2 * NFkB_IkBa + internal.k5 * NFkB_IkBa * IKK_active;
    dstatedt[5] = 0 + internal.k1 * IkBa * NFkB - internal.k2 * NFkB_IkBa - internal.k5 * NFkB_IkBa * IKK_active;
  }
  names() {
    return this.metadata.ynames.slice(1);
  }
  updateMetadata() {
    this.metadata = {};
    var internal = this.internal;
    this.metadata.ynames = ["t", "A20_mRNA", "NFkB", "A20", "IkBa", "IkBa_mRNA", "NFkB_IkBa", "IKK_active"];
    this.metadata.internalOrder = {A20_init: null, A20_mRNA_init: null, default_compartment: null, IkBa_init: null, IkBa_mRNA_init: null, IKK_active_init: null, initial_A20: null, initial_A20_mRNA: null, initial_IkBa: null, initial_IkBa_mRNA: null, initial_IKK_active: null, initial_NFkB: null, initial_NFkB_IkBa: null, k1: null, k10: null, k11: null, k12: null, k13: null, k14: null, k15: null, k2: null, k3: null, k4: null, k5: null, k6: null, k7: null, k8: null, k9: null, NFkB_IkBa_init: null, NFkB_init: null, stimulus: null};
    this.metadata.variableOrder = {A20_mRNA: null, NFkB: null, A20: null, IkBa: null, IkBa_mRNA: null, NFkB_IkBa: null, IKK_active: null};
    this.metadata.outputOrder = null;
  }
  getMetadata() {
    return this.metadata;
  }
}
