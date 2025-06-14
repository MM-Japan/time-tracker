import { Controller } from "@hotwired/stimulus"
import { csrfToken } from "../csrf"

export default class extends Controller {
  static targets = ["task"]

  confirm() {
    const taskId = this.taskTarget.value
    if (!taskId) return
    fetch(`/tasks/${taskId}/time_entries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRF-Token': csrfToken()
      }
    })
      .then(r => r.json())
      .then(data => {
        this.element.classList.add('hidden')
        const header = document.getElementById('header-controls')
        if (header) {
          header.dataset.entryId = data.id
          header.dataset.taskId = taskId
          header.dataset.start = data.start_time
          header.dispatchEvent(new Event('timer-start'))
        }
        const timer = document.getElementById('timer')
        if (timer) timer.dataset.start = data.start_time
      })
  }

}
