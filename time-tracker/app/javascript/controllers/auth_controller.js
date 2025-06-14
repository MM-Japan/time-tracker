import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["loginTab", "signupTab", "frame"]
  static values = { loginUrl: String, signupUrl: String, tab: String }

  connect() {
    this.show(this.tabValue || "login")
  }

  showLogin(event) {
    event.preventDefault()
    this.show("login")
  }

  showSignup(event) {
    event.preventDefault()
    this.show("signup")
  }

  show(tab) {
    this.tabValue = tab
    this.loginTabTarget.classList.toggle("bg-indigo-600", tab === "login")
    this.loginTabTarget.classList.toggle("text-white", tab === "login")
    this.signupTabTarget.classList.toggle("bg-indigo-600", tab === "signup")
    this.signupTabTarget.classList.toggle("text-white", tab === "signup")
    const url = tab === "signup" ? this.signupUrlValue : this.loginUrlValue
    this.frameTarget.src = url
  }
}
