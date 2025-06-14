import { Controller } from "@hotwired/stimulus"
import { Turbo } from "@hotwired/turbo-rails"
import { csrfToken } from "../csrf"

export default class extends Controller {
  static values = { id: Number }
  static targets = ["modal"]

  confirm(event) {
    this.idValue = event.currentTarget.dataset.taskDeleteIdValue
    this.modalTarget.classList.remove("hidden")
  }

  cancel() {
    this.modalTarget.classList.add("hidden")
  }

  submit() {
    fetch(`/tasks/${this.idValue}`, {
      method: "DELETE",
      headers: {
        "Accept": "text/vnd.turbo-stream.html",
        "X-CSRF-Token": csrfToken()
      }
    })
      .then(response => response.text())
      .then(html => Turbo.renderStreamMessage(html))
      .then(() => this.cancel())
  }
}
