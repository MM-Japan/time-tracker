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
    fetch(`/time_entries/${this.idValue}`, {
      method: "DELETE",
      headers: { "Accept": "text/vnd.turbo-stream.html" }
    })
    .then(() => this.close())
  }
}
