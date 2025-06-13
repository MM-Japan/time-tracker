import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["task", "timer", "comment"]

  connect() {
    this.timeEntryId = this.data.get("entryId")
    this.startTime = this.data.get("start") ? new Date(this.data.get("start")) : null
    if (this.startTime) {
      const header = document.getElementById('header-controls')
      if (header) {
        header.dataset.start = this.startTime.toISOString()
        header.dataset.entryId = this.timeEntryId
        header.dataset.taskId = this.taskTarget.value || header.dataset.taskId
      }
      this.startTicker(this.taskTarget.value)
    }
  }

  disconnect() {
    this.stopTicker()
  }

  start(event) {
    event.preventDefault()
    const taskId = this.taskTarget.value
    if (!taskId) return
    this.startTime = new Date()
    this.startTicker(taskId)
    fetch(`/tasks/${taskId}/time_entries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRF-Token': this.token()
      }
    }).then(r => r.json()).then(data => {
      this.timeEntryId = data.id
      const header = document.getElementById('header-controls')
      if (header) {
        header.dataset.entryId = data.id
        header.dataset.taskId = taskId
      }
    })
  }

  stop(event) {
    event.preventDefault()
    if (!this.timeEntryId) return
    const taskId = this.taskTarget.value
    fetch(`/tasks/${taskId}/time_entries/${this.timeEntryId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': this.token()
      },
      body: JSON.stringify({ time_entry: { comment: this.commentTarget.value } })
    }).then(() => {
      this.stopTicker()
      this.timeEntryId = null
      this.commentTarget.value = ''
      this.startTime = null
      this.updateTimer()
    })
  }

  startTicker(taskId) {
    this.stopTicker()
    this.updateTimer()
    this.interval = setInterval(() => this.updateTimer(), 10)
    const timerEl = document.getElementById('timer')
    if (timerEl) timerEl.dataset.start = this.startTime.toISOString()
    const header = document.getElementById('header-controls')
    if (header) {
      header.dataset.start = this.startTime.toISOString()
      header.dataset.taskId = taskId
      header.dispatchEvent(new Event('timer-start'))
    }
  }

  stopTicker() {
    if (this.interval) clearInterval(this.interval)
    const timerEl = document.getElementById('timer')
    if (timerEl) timerEl.dataset.start = ''
    const header = document.getElementById('header-controls')
    if (header) {
      header.dataset.start = ''
      header.dataset.entryId = ''
      header.dispatchEvent(new Event('timer-stop'))
    }
  }

  updateTimer() {
    if (!this.startTime) {
      this.timerTarget.textContent = "00:00:00.000"
      return
    }
    const diff = Date.now() - this.startTime.getTime()
    const hours = Math.floor(diff / 3600000)
    const minutes = Math.floor((diff % 3600000) / 60000)
    const seconds = Math.floor((diff % 60000) / 1000)
    const ms = diff % 1000
    this.timerTarget.textContent = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}.${String(ms).padStart(3,'0')}`
  }

  pad(num) {
    return String(num).padStart(2, '0')
  }

  token() {
    return document.querySelector('meta[name="csrf-token"]').content
  }
}
