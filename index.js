const { EventEmitter } = require('events');

class TransactionChain extends EventEmitter {
  constructor(chain = []) {
    super();
    this.chain = [];
    if (Array.isArray(chain)) chain.forEach(step => this.add(step));
  }
  
  add({
    action = () => {},
    undo = () => {},
    ...otherKeys
  }) {
    this.chain.push({
      action,
      undo,
      ...otherKeys,
    });
    return this;
  }
  
  async run(context = {}) {
    const done = [];
    for (let [idx, step] of this.chain.entries()) {
      try {
        await step.action(context, step);
        done.push(step);
      } catch (error) {
        error.index = idx;
        this.emit('error', { error, chain: this.chain, step, done, context });
        await this._undo(done, context);
        return context;
      }
    }
    return context;
  }
  
  async _undo(chain, context) {
    const done = [];
    for (let step of chain.reverse()) {
      try {
        const res = await step.undo(context, step);
        done.push(step);
      } catch (error) {
        this.emit('fatal', { error, chain, step, done, context });
        return;
      }
    }
  }
}

module.exports = TransactionChain;
