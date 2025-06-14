import { Controller } from "@hotwired/stimulus"
import { csrfToken } from "../csrf"
import { showToast } from "../toast"

export default class extends Controller {
  static targets = ["startBtn", "stopBtn"]

  connect() {
    this.updateButtons()
    this.element.addEventListener('timer-start', () => this.showStop())
    this.element.addEventListener('timer-stop', () => this.showStart())
  }

  start(event) {
    event.preventDefault()
    const taskId = this.element.dataset.taskId
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
      this.element.dataset.entryId = data.id
      const timer = document.getElementById('timer')
      if (timer) timer.dataset.start = data.start_time
      this.showStop()
    })
  }

  stop(event) {
    event.preventDefault()
    const taskId = this.element.dataset.taskId
    const entryId = this.element.dataset.entryId
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
      delete this.element.dataset.entryId
      this.showStart()
      showToast("Hours logged")
    })
  }

  updateButtons() {
    if (this.element.dataset.entryId) {
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
