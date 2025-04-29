/** A button that contains an icon. */
export default class IconButton {
  button: HTMLButtonElement;
  icon: HTMLImageElement;

  constructor() {
    this.button = document.createElement("button");
    this.icon = document.createElement("img");

    this.button.append(this.icon);
    this.button.classList.add("icon-button");
  }
}
