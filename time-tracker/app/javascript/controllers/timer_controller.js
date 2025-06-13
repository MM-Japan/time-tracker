import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { start: String }

  connect() {
    this.interval = setInterval(() => this.update(), 10)
    this.update()
  }

  disconnect() {
    clearInterval(this.interval)
  }

  update() {
    if (!this.startValue) {
      this.element.textContent = "00:00:00.000"
      return
    }
    const start = new Date(this.startValue)
    const diff = Date.now() - start.getTime()
    const hours = Math.floor(diff / 3600000)
    const minutes = Math.floor((diff % 3600000) / 60000)
    const seconds = Math.floor((diff % 60000) / 1000)
    const ms = diff % 1000
    this.element.textContent = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}.${ms.toString().padStart(3,'0')}`
  }

  pad(num) {
    return num.toString().padStart(2,'0')
  }
}
