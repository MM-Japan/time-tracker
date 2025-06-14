import { Controller } from "@hotwired/stimulus"
import { csrfToken } from "../csrf"

export default class extends Controller {
  static targets = ["startBtn", "stopBtn"]

  connect() {
    this.updateButtons()
    this.element.addEventListener('timer-start', () => this.showStop())
    this.element.addEventListener('timer-stop', () => this.showStart())
  }

  start(event) {
    event.preventDefault()
    const taskId = this.data.get("taskId")
    if (!taskId) {
      const modal = document.getElementById('task-picker')
      if (modal) modal.classList.remove('hidden')
      return
    }
    fetch(`/tasks/${taskId}/time_entries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRF-Token': csrfToken()
      }
    }).then(r => r.json()).then(data => {
      this.data.set("entryId", data.id)
      const timer = document.getElementById('timer')
      if (timer) timer.dataset.start = data.start_time
      this.showStop()
    })
  }

  stop(event) {
    event.preventDefault()
    const taskId = this.data.get("taskId")
    const entryId = this.data.get("entryId")
    if (!taskId || !entryId) return
    fetch(`/tasks/${taskId}/time_entries/${entryId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken()
      },
      body: JSON.stringify({ time_entry: { comment: '' } })
    }).then(() => {
      const timer = document.getElementById('timer')
      if (timer) timer.dataset.start = ''
      this.data.delete("entryId")
      this.showStart()
    })
  }

  updateButtons() {
    if (this.data.get("entryId")) {
      this.showStop()
    } else {
      this.showStart()
    }
  }

  showStop() {
    if (this.hasStartBtnTarget) this.startBtnTarget.classList.add('hidden')
    if (this.hasStopBtnTarget) this.stopBtnTarget.classList.remove('hidden')
  }

  showStart() {
    if (this.hasStopBtnTarget) this.stopBtnTarget.classList.add('hidden')
    if (this.hasStartBtnTarget) this.startBtnTarget.classList.remove('hidden')
  }

}
