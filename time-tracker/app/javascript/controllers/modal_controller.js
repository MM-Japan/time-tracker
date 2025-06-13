import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { id: Number }
  static targets = ["modal"]

  open(event) {
    this.idValue = event.currentTarget.dataset.modalIdValue
    this.modalTarget.classList.remove("hidden")
  }

  close() {
    this.modalTarget.classList.add("hidden")
  }

  confirm() {
    fetch(`/tasks/${this.idValue}`, {
      method: "DELETE",
      headers: {
        'X-CSRF-Token': this.token(),
        'Accept': 'text/html'
      }
    })
    .then(() => window.location.reload())
  }

  token() {
    return document.querySelector('meta[name="csrf-token"]').content
  }
}
