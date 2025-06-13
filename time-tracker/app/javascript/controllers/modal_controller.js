import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["form"]

  open(event) {
    event.preventDefault()
    this.formTarget.action = event.currentTarget.dataset.url
    this.element.classList.remove("hidden")
  }

  cancel(event) {
    event.preventDefault()
    this.element.classList.add("hidden")
  }
}
