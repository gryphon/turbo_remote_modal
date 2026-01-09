module TurboRemoteModal
  class Engine < ::Rails::Engine
    isolate_namespace TurboRemoteModal

    config.generators do |g|
      g.test_framework :rspec
      g.fixture_replacement :factory_bot
      g.factory_bot dir: 'spec/factories'
    end
    
    initializer 'action_controller.include_concern' do

      config.to_prepare do
        # Safely include the concern into the main app's ApplicationController
        # ::ApplicationController.include CustomTableConcern
        # ::ApplicationController.helper TurboRemoteModal::ApplicationHelper
        ::ApplicationHelper.include TurboRemoteModal::ApplicationHelper

      end

    end

  end
end
