import { Controller } from "@hotwired/stimulus"

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
        'X-CSRF-Token': this.token()
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

  token() {
    return document.querySelector('meta[name="csrf-token"]').content
  }
}
