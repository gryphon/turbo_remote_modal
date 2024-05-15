# TurboRemoteModal

Turbo remote modal for Bootstrap

## Installation

* Add helpers to your application controller: ```helper TurboRemoteModal::Engine.helpers```
* Add JS stimulus controller

## Usage

Just use the following helper in your views (new/edit actions typically):

```ruby

= remote_modal title: "New record" do
  = render 'form'

```
