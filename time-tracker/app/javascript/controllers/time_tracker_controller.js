import { Controller } from "@hotwired/stimulus"
import { csrfToken } from "../csrf"

export default class extends Controller {
  static targets = ["task", "timer", "comment", "startBtn", "stopBtn"]

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
    } else {
      this.showStart()
    }

    this.header = document.getElementById('header-controls')
    if (this.header) {
      this.headerStartListener = () => this.externalStart()
      this.headerStopListener = () => this.externalStop()
      this.header.addEventListener('timer-start', this.headerStartListener)
      this.header.addEventListener('timer-stop', this.headerStopListener)
    }
  }

  disconnect() {
    this.stopTicker()
    if (this.header) {
      this.header.removeEventListener('timer-start', this.headerStartListener)
      this.header.removeEventListener('timer-stop', this.headerStopListener)
    }
  }

  start(event) {
    event.preventDefault()
    const taskId = this.taskTarget.value
    if (!taskId) {
      const modal = document.getElementById('task-picker')
      if (modal) modal.classList.remove('hidden')
      return
    }
    this.startTime = new Date()
    this.startTicker(taskId)
    this.showStop()
    fetch(`/tasks/${taskId}/time_entries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRF-Token': csrfToken()
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
        'X-CSRF-Token': csrfToken()
      },
      body: JSON.stringify({ time_entry: { comment: this.commentTarget.value } })
    }).then(() => {
      this.stopTicker()
      this.timeEntryId = null
      this.commentTarget.value = ''
      this.startTime = null
      this.updateTimer()
      this.showStart()
    })
  }

  externalStart() {
    if (!this.header) return
    this.timeEntryId = this.header.dataset.entryId
    this.startTime = this.header.dataset.start ? new Date(this.header.dataset.start) : null
    if (this.header.dataset.taskId && this.hasTaskTarget) {
      this.taskTarget.value = this.header.dataset.taskId
    }
    if (this.startTime) {
      this.startTicker(this.header.dataset.taskId, false)
    }
  }

  externalStop() {
    this.stopTicker(false)
    this.timeEntryId = null
    this.startTime = null
    if (this.hasCommentTarget) this.commentTarget.value = ''
    this.updateTimer()
  }

  startTicker(taskId, broadcast = true) {
    this.stopTicker(false)
    this.updateTimer()
    this.interval = setInterval(() => this.updateTimer(), 10)
    const timerEl = document.getElementById('timer')
    if (timerEl) timerEl.dataset.start = this.startTime.toISOString()
    if (broadcast) {
      const header = document.getElementById('header-controls')
      if (header) {
        header.dataset.start = this.startTime.toISOString()
        header.dataset.taskId = taskId
        header.dispatchEvent(new Event('timer-start'))
      }
    }
    this.showStop()
  }

  stopTicker(broadcast = true) {
    if (this.interval) clearInterval(this.interval)
    const timerEl = document.getElementById('timer')
    if (timerEl) timerEl.dataset.start = ''
    if (broadcast) {
      const header = document.getElementById('header-controls')
      if (header) {
        header.dataset.start = ''
        header.dataset.entryId = ''
        header.dispatchEvent(new Event('timer-stop'))
      }
    }
    this.showStart()
  }

  showStart() {
    if (this.hasStopBtnTarget) this.stopBtnTarget.classList.add('hidden')
    if (this.hasStartBtnTarget) this.startBtnTarget.classList.remove('hidden')
  }

  showStop() {
    if (this.hasStartBtnTarget) this.startBtnTarget.classList.add('hidden')
    if (this.hasStopBtnTarget) this.stopBtnTarget.classList.remove('hidden')
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

}
