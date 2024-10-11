module TurboRemoteModal
  class Engine < ::Rails::Engine
    isolate_namespace TurboRemoteModal

    config.generators do |g|
      g.test_framework :rspec
      g.fixture_replacement :factory_bot
      g.factory_bot dir: 'spec/factories'
    end
    
    initializer 'action_controller.include_concern' do
      ActiveSupport.on_load(:action_controller) do
        helper TurboRemoteModal::ApplicationHelper
      end
    end

  end
end
