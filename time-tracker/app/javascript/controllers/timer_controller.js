import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  // Reads the start timestamp from a data attribute so other controllers can
  // update the timer simply by modifying `data-start` on this element.

  connect() {
    this.interval = setInterval(() => this.update(), 100)
    this.update()
  }

  disconnect() {
    clearInterval(this.interval)
  }

  update() {
    // `data-start` holds an ISO8601 timestamp when the timer is running
    const startAttr = this.element.dataset.start
    if (!startAttr) {
      this.element.textContent = "00:00:00.0"
      this.element.classList.remove('animate-pulse')
      return
    }
    this.element.classList.add('animate-pulse')
    const start = new Date(startAttr)
    const diff = Date.now() - start.getTime()
    const hours = Math.floor(diff / 3600000)
    const minutes = Math.floor((diff % 3600000) / 60000)
    const seconds = Math.floor((diff % 60000) / 1000)
    const tenths = Math.floor((diff % 1000) / 100)
    this.element.textContent = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}.${tenths}`
  }

  pad(num) {
    return num.toString().padStart(2,'0')
  }
}
