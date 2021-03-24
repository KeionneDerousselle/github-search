import Vuex from 'vuex'
import { mount, shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'

// Global Helpers
global.routerPush = jest.fn()
jest.spyOn(global, 'routerPush')

// Vue Test Utils Mount Helpers
global.mount = mount
global.shallow = shallowMount

global.mountPreMocked = (component, vueOptions, validator) => mount(
  {
    ...component,
    inject: validator ? [] : component.inject
  },
  createComponentMocks(vueOptions || {})
)

global.shallowPreMocked = (component, vueOptions, validator) => shallowMount(
  {
    ...component,
    inject: validator ? [] : component.inject
  },
  createComponentMocks(vueOptions || {})
)

// A helper for creating Vue component mocks
const createComponentMocks = ({
  store,
  router,
  style,
  mocks,
  stubs,
  propsData,
  slots,
  attachTo,
  sync,
  envVars,
  localVue,
  mixins,
  listeners,
  attrs
}) => {
  // Use a local version of Vue, to avoid polluting the global
  // Vue and thereby affecting other tests.
  localVue = localVue || createLocalVue()

  const div = document.createElement('div')

  document.body.appendChild(div)

  const returnOptions = {
    localVue,
    stubs: stubs || {},
    mocks: mocks || {},
    propsData: propsData || {},
    slots: slots || {},
    listeners: listeners || {},
    attrs: attrs || {},
    attachTo: attachTo || div,
    sync: sync ? !!sync : false
  }

  returnOptions.mocks.$router = {
    push: global.routerPush
  }

  if (mixins) {
    returnOptions.mixins = mixins
  }

  if (store) {
    localVue.use(Vuex)
    returnOptions.store = new Vuex.Store({
      modules: Object.keys(store)
        .map(moduleName => {
          const storeModule = store[moduleName]

          return {
            [moduleName]: {
              state: storeModule.state || {},
              getters: storeModule.getters || {},
              actions: storeModule.actions || {},
              namespaced: typeof storeModule.namespaced === 'undefined' ? true : storeModule.namespaced
            }
          }
        })
        .reduce((moduleA, moduleB) => ({ ...moduleA, ...moduleB }), {})
    })
  }

  if (router) {
    returnOptions.stubs.RouterLink = RouterLinkStub
    returnOptions.stubs['router-view'] = true
    returnOptions.stubs['nuxt-link'] = true
  }

  if (style) {
    returnOptions.mocks.$style = style
  }

  returnOptions.stubs.Nuxt = true
  returnOptions.stubs.nuxt = true

  return returnOptions
}
