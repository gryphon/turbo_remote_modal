module TurboRemoteModal
  module ApplicationHelper

    # This is element wrapper for modal
    def remote_modal **params
      render "remote_modal", **params do
        yield
      end
    end

  end
end
