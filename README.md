# TurboRemoteModal

Turbo remote modal for Bootstrap

## Installation

* Add JS stimulus controller:

`
import RemoteModalController from "turbo_remote_modal/app/javascript/controllers/remote_modal_controller.js"
application.register("remote-modal", RemoteModalController)
`

* Add `turbo_frame_tag "remote-modal", target: "_top"` somewhere in the bottom of your app layout

## Usage

Just use the following helper in your views (new/edit actions typically):

```ruby

= remote_modal title: "New record" do
  = render 'form'

```
