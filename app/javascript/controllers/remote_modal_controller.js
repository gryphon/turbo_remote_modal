import { Controller } from "@hotwired/stimulus"
import { Modal } from "bootstrap"

export default class extends Controller {

  static values = {
    keep: {type: Boolean, default: false}
  }

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

    // Closing window because response does not contain modal content
    document.addEventListener("turbo:frame-missing", (event) => {
      const { detail: { response, visit } } = event;
    
      // to let for update work we need to read text???
      // to close window if response.text() was read already
      // response.text().then((html) => {
        console.log("Modal frame missing", response)
        this.close();
      // })

      event.preventDefault();
    });

    this.element.parentElement.removeAttribute("src")

    // Trying to focus first element that is visible
    this.element.addEventListener('shown.bs.modal', () => {
      const elements = this.element.querySelectorAll('form input:not([type=hidden]), form select, form textarea');
      for (const element of elements) {
        // Check if the element is visible
        const isVisible = element.offsetParent !== null && !element.disabled && !element.hidden;
        if (isVisible) { 
          element.focus();
          break;
        }
      }
    });

    // console.log("FOCUS", focus)
    // if (focus) {
    //   this.element.addEventListener('shown.bs.modal', () => {focus.focus();})
    // }

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
    if (this.modal && event.detail.success && event.detail.formSubmission.method.toUpperCase()!="GET" && !this.keepValue) {
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
