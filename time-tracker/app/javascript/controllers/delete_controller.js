import { Controller } from "@hotwired/stimulus"

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
      headers: { "Accept": "text/vnd.turbo-stream.html" }
    }).then(() => this.cancel())
  }
}
