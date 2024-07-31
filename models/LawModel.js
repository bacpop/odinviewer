export class model {
  constructor(base, user, unusedUserAction) {
    this.base = base;
    this.internal = {};
    var internal = this.internal;
    internal.Malayasia = 1;
    this.setUser(user, unusedUserAction);
  }
  initial(t) {
    var internal = this.internal;
    var state = Array(3).fill(0);
    state[0] = internal.initial_Susceptible;
    state[1] = internal.initial_Infected;
    state[2] = internal.initial_Removed;
    return state;
  }
  setUser(user, unusedUserAction) {
    this.base.user.checkUser(user, ["beta_0", "Infected_init", "Removed_init", "Susceptible_init", "Trigger_Stage_1", "Trigger_Stage_2", "Trigger_Stage_3"], unusedUserAction);
    var internal = this.internal;
    this.base.user.setUserScalar(user, "beta_0", internal, 0.41139999999999999, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "Infected_init", internal, 728, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "Removed_init", internal, 62.000000000000099, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "Susceptible_init", internal, 32680000, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "Trigger_Stage_1", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "Trigger_Stage_2", internal, 0, -Infinity, Infinity, false);
    this.base.user.setUserScalar(user, "Trigger_Stage_3", internal, 1, -Infinity, Infinity, false);
    internal.delta = internal.Trigger_Stage_1 * 0.025000000000000001 + internal.Trigger_Stage_2 * 0.042000000000000003 + internal.Trigger_Stage_3 * 0.050000000000000003;
    internal.initial_Infected = internal.Infected_init;
    internal.initial_Removed = internal.Removed_init;
    internal.initial_Susceptible = internal.Susceptible_init;
    internal.p = internal.Trigger_Stage_1 * 0.078399999999999997 + internal.Trigger_Stage_2 * 0.044999999999999998 + internal.Trigger_Stage_3 * 0.046600000000000003;
    internal.z = internal.Trigger_Stage_1 * 0.43740000000000001 + internal.Trigger_Stage_2 * 0.39140000000000003 + internal.Trigger_Stage_3 * 0.4047;
    this.updateMetadata();
  }
  getInternal() {
    return this.internal;
  }
  rhs(t, state, dstatedt) {
    var internal = this.internal;
    const Susceptible = state[0];
    const Infected = state[1];
    const Removed = state[2];
    var N = Infected + Removed + Susceptible;
    var beta = internal.beta_0 * Math.pow((1 - internal.p), (t));
    dstatedt[2] = 0 + internal.Malayasia * internal.delta * Infected;
    dstatedt[1] = 0 + internal.Malayasia * (internal.z * beta * Susceptible * Infected / N) - internal.Malayasia * internal.delta * Infected;
    dstatedt[0] = 0 - internal.Malayasia * (internal.z * beta * Susceptible * Infected / N);
  }
  names() {
    return this.metadata.ynames.slice(1);
  }
  updateMetadata() {
    this.metadata = {};
    var internal = this.internal;
    this.metadata.ynames = ["t", "Susceptible", "Infected", "Removed"];
    this.metadata.internalOrder = {beta_0: null, delta: null, Infected_init: null, initial_Infected: null, initial_Removed: null, initial_Susceptible: null, Malayasia: null, p: null, Removed_init: null, Susceptible_init: null, Trigger_Stage_1: null, Trigger_Stage_2: null, Trigger_Stage_3: null, z: null};
    this.metadata.variableOrder = {Susceptible: null, Infected: null, Removed: null};
    this.metadata.outputOrder = null;
  }
  getMetadata() {
    return this.metadata;
  }
}
