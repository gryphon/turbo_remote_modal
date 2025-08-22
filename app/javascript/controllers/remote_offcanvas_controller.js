import { Controller } from "@hotwired/stimulus"
import { Offcanvas } from "bootstrap"

export default class extends Controller {
  connect() {
    console.log("Offcanvas: Connect")
    this.offcanvas = new Offcanvas(this.element, {backdrop: "static"})
    this.offcanvas.show()
    document.addEventListener('turbo:submit-end', this.afterFormSubmit);

    // Turbo 8 tuning
    document.addEventListener("turbo:before-cache", function() {
      if (!this.element) return;
      this.element.innerHTML = ""
    })

    document.addEventListener("turbo:frame-missing", (event) => {
      const { detail: { response, visit } } = event;
    
      // response.text().then((html) => {
      //   console.log("Offcanvas frame missing", response)
      //   this.close();
      // })

      event.preventDefault();
    });

    this.element.parentElement.removeAttribute("src")

  }

  disconnect() {
    console.log("disconnected")
  }

  close(){
    if (this.offcanvas) {
      this.offcanvas.hide()
      this.element.remove()
    }
  }

  afterFormSubmit = (event) => {
    if (this.offcanvas && event.detail.success && event.detail.formSubmission.method!="get") {
      console.log("Offcanvas: removing")
      this.offcanvas.hide();
      this.element.remove()
    }
  };

  hideBeforeRender(event) {
    console.log("Offcanvas: Hide before render")
    if (this.offcanvas && this.isOpen()) {
      event.preventDefault()
      this.element.addEventListener('hidden.bs.offcanvas', event.detail.resume)
      this.offcanvas.hide()
    }
  }

  isOpen() {
    return this.element.classList.contains("show")
  }
}
