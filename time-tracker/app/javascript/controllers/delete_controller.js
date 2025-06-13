import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { id: Number }

  confirm(event) {
    this.idValue = event.currentTarget.dataset.deleteIdValue
    this.element.classList.remove("hidden")
  }

  cancel() {
    this.element.classList.add("hidden")
  }

  submit() {
    fetch(`/time_entries/${this.idValue}`, {
      method: "DELETE",
      headers: { "Accept": "text/vnd.turbo-stream.html" }
    }).then(() => this.cancel())
  }
}
