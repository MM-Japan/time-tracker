import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { id: Number }

  open(event) {
    this.idValue = event.currentTarget.dataset.modalIdValue
    this.element.classList.remove("hidden")
  }

  close() {
    this.element.classList.add("hidden")
  }

  confirm() {
    fetch(`/tasks/${this.idValue}`, {
      method: "DELETE"
    })
    .then(() => this.close())
  }
}
