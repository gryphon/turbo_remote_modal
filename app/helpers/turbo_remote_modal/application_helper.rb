module TurboRemoteModal
  module ApplicationHelper

    # This is element wrapper for modal
    def remote_modal **params, &block

      content = capture(&block)

      render "remote_modal", **params do
        content
      end

    end

    # This is element wrapper for modal
    def remote_offcanvas **params, &block

      content = capture(&block)

      render "remote_offcanvas", **params do
        content
      end
      
    end

  end
end
