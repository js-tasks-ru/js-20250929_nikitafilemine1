export default class ColumnChart {
  constructor(props = {}) {
    const {
      data = [],
      value = 0,
      label = "",
      link = "",
      formatHeading = (value) => value,
    } = props;

    this.data = data;
    this.value = value;
    this.label = label;
    this.link = link;
    this.formatHeading = formatHeading;
    this.element = this._createElement();
    this.chartHeight = 50;
  }

  _renderChart() {
    return this.data
      .map((num, _, data) => {
        const value = Math.floor(num * (50 / Math.max(...data)));
        const percent = ((num / Math.max(...data)) * 100).toFixed(0);
        return `<div style="--value: ${value}" data-tooltip="${percent}%"></div>`;
      })
      .join("");
  }

  _createElement() {
    const element = document.createElement("div");
    element.innerHTML = `
      <div class="column-chart" style="--chart-height: 50">
        <div class="column-chart__title">
          Total ${this.label}
          ${
            this.link &&
            `<a href=${this.link} class="column-chart__link">View all</a>`
          }
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">${this.formatHeading(
            this.value
          )}</div>
          <div data-element="body" class="column-chart__chart">
          ${this._renderChart()}
          </div>
        </div>
      </div>
    `;
    const firstElementChild = element.firstElementChild;
    if (!this.data.length) {
      firstElementChild.classList.add("column-chart_loading");
    }
    return firstElementChild;
  }

  update(newData) {
    this.data = newData;
    this.element.replaceWith(this._createElement());
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
