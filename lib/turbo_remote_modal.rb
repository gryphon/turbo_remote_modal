require "turbo_remote_modal/version"
require "turbo_remote_modal/engine"
require "turbo_remote_modal/configuration"

module TurboRemoteModal
  def self.configuration
    @configuration ||= Configuration.new
  end
  
  def self.configure(&block)
    yield(configuration)
  end
end
