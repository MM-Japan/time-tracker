import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    try {
      const zone = Intl.DateTimeFormat().resolvedOptions().timeZone
      const option = this.element.querySelector(`option[value="${zone}"]`)
      if (option) {
        this.element.value = zone
      }
    } catch (e) {
      // ignore
    }
  }
}
