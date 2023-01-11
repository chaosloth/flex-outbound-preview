import React from "react";
import * as Flex from "@twilio/flex-ui";
import { FlexPlugin } from "@twilio/flex-plugin";
import previewChannel from "./channel/Preview/PreviewChannel";
import { CustomizationProvider } from "@twilio-paste/core/customization";

const PLUGIN_NAME = "FlexOutboundPreviewPlugin";

export default class FlexOutboundPreviewPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof Flex }
   */
  async init(flex: typeof Flex, manager: Flex.Manager): Promise<void> {
    // Add Paste
    flex.setProviders({
      PasteThemeProvider: CustomizationProvider,
    });

    // Add custom channels
    Flex.TaskChannels.register(previewChannel, false);
  }
}
