

class ViewLoading extends HTMLElement {

  static version = '0.0.1';

  /**
   * @type {HTMLElement}
   */
  container;

  /**
   * @type {MapView|SceneView}
   */
  view;

  /**
   * @type {boolean}
   */
  #enabled;
  get enabled() {
    return this.#enabled;
  }

  set enabled(value) {
    this.#enabled = value && this.view.updating;
    this.loader?.toggleAttribute('hidden', !this.#enabled);
  }

  constructor({container, view, enabled = true}) {
    super();

    this.container = (container instanceof HTMLElement) ? container : document.getElementById(container);
    this.view = view;
    this.#enabled = enabled;

    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
      <style>
        :host {
          pointer-events: none;
          box-shadow: none !important;
        }
        :host calcite-loader {
          --calcite-loader-padding: 0;           
          margin: auto 15px;          
        }     
      </style>
      <calcite-loader type="indeterminate" scale="s"></calcite-loader>   
    `;

    this.container?.append(this);
  }

  /**
   *
   */
  connectedCallback() {
    require(['esri/core/reactiveUtils'], (reactiveUtils) => {
      this.view.when(() => {
        this.loader = this.shadowRoot.querySelector('calcite-loader');
        reactiveUtils.watch(() => this.view.updating, (updating) => {
          this.#enabled && this.loader.toggleAttribute('hidden', !updating);
        });
      });
    });
  }

}

customElements.define("apl-view-loading", ViewLoading);

export default ViewLoading;
