import { Controller } from "@hotwired/stimulus"
import { Turbo } from "@hotwired/turbo-rails"

export default class extends Controller {
  static values = { id: Number }
  static targets = ["modal"]

  confirm(event) {
    this.idValue = event.currentTarget.dataset.deleteIdValue
    this.modalTarget.classList.remove("hidden")
  }

  cancel() {
    this.modalTarget.classList.add("hidden")
  }

  submit() {
    fetch(`/time_entries/${this.idValue}`, {
      method: "DELETE",
      headers: {
        "Accept": "text/vnd.turbo-stream.html",
        "X-CSRF-Token": this.token()
      }
    })
      .then(response => response.text())
      .then(html => Turbo.renderStreamMessage(html))
      .then(() => this.cancel())
  }

  token() {
    return document.querySelector('meta[name="csrf-token"]').content
  }
}
