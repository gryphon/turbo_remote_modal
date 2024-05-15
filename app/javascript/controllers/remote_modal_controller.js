import { Controller } from "@hotwired/stimulus"
import { Modal } from "bootstrap"

export default class extends Controller {
  connect() {
    console.log("Modal: Connect")
    this.modal = new Modal(this.element, {backdrop: "static"})
    this.modal.show()
    document.addEventListener('turbo:submit-end', this.afterFormSubmit);

    // Turbo 8 tuning
    document.addEventListener("turbo:before-cache", function() {
      if (!this.element) return;
      this.element.innerHTML = ""
    })

    this.element.parentElement.removeAttribute("src")

  }

  disconnect() {
    console.log("disconnected")
  }

  close(){
    if (this.modal) {
      this.modal.hide()
      this.element.remove()
    }
  }

  afterFormSubmit = (event) => {
    if (this.modal && event.detail.success && event.detail.formSubmission.method!="get") {
      console.log("Modal: removing")
      this.modal.hide();
      this.element.remove()
    }
  };

  hideBeforeRender(event) {
    console.log("Modal: Hide before render")
    if (this.modal && this.isOpen()) {
      event.preventDefault()
      this.element.addEventListener('hidden.bs.modal', event.detail.resume)
      this.modal.hide()
    }
  }

  isOpen() {
    return this.element.classList.contains("show")
  }
}
