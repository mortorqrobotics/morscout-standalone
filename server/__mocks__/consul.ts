import EventEmitter from "events";
module.exports = () => ({
  acl: {
    bootstrap: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    get: jest.fn(),
    clone: jest.fn(),
    list: jest.fn(),
    replication: jest.fn()
  },
  agent: {
    check: {
      list: jest.fn(),
      register: jest.fn(),
      deregister: jest.fn(),
      pass: jest.fn(),
      warn: jest.fn(),
      fail: jest.fn()
    },
    service: {
      list: jest.fn(),
      register: jest.fn(),
      deregister: jest.fn(),
      maintenance: jest.fn()
    },
    members: jest.fn(),
    reload: jest.fn(),
    self: jest.fn(),
    maintenance: jest.fn(),
    join: jest.fn(),
    forceLeave: jest.fn()
  },
  catalog: {
    datacenters: jest.fn(),
    connect: {
      nodes: jest.fn()
    },
    node: {
      list: jest.fn(),
      services: jest.fn()
    },
    service: {
      list: jest.fn(),
      nodes: jest.fn()
    }
  },
  event: {
    fire: jest.fn(),
    list: jest.fn()
  },
  health: {
    node: jest.fn(),
    checks: jest.fn(),
    service: jest.fn(),
    state: jest.fn()
  },
  kv: {
    get: jest.fn(),
    keys: jest.fn(),
    set: jest.fn(),
    del: jest.fn()
  },
  lock: jest.fn(),
  query: {
    list: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    get: jest.fn(),
    destroy: jest.fn(),
    execute: jest.fn(),
    explain: jest.fn()
  },
  session: {
    create: jest.fn(),
    destroy: jest.fn(),
    get: jest.fn(),
    node: jest.fn(),
    list: jest.fn(),
    renew: jest.fn()
  },
  status: {
    leader: jest.fn(),
    peers: jest.fn()
  },
  watch: jest.fn().mockReturnValue(new EventEmitter())
});

jest.spyOn(module, "exports");
