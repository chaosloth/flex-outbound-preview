import { ITask, Tab, Actions, ActionFunction } from "@twilio/flex-ui";
import { DefaultTaskChannels, ContentFragmentProps } from "@twilio/flex-ui";
import { InformationIcon } from "@twilio-paste/icons/esm/InformationIcon";
import { TASK_CHANNEL_PREVIEW } from "../../constants/constants";
import PreviewInfo from "./PreviewInfo";

const isApplicable = (task: ITask) =>
  task.taskChannelUniqueName === TASK_CHANNEL_PREVIEW;

const channel = DefaultTaskChannels.createDefaultTaskChannel(
  TASK_CHANNEL_PREVIEW,
  isApplicable,
  <InformationIcon decorative={true} />,
  <InformationIcon decorative={true} />
);
const options: ContentFragmentProps = { sortOrder: -1 };

// Check if props exist to step TS complaining
if (channel.templates && channel.templates.TaskListItem)
  channel.templates.TaskListItem.firstLine = "Outbound Preview Task";

channel.addedComponents = [
  {
    target: "TaskCanvasTabs",
    component: (
      <Tab
        icon={<InformationIcon title="Customer Info" decorative={true} />}
        iconActive={<InformationIcon decorative={true} />}
        uniqueName="previewInfoTab"
        key="previewInfoTab"
        label="Preview Info"
      >
        <PreviewInfo />
      </Tab>
    ),
    options: options,
  },
];

Actions.addListener("afterAcceptTask", (payload) => {
  // Implement logic after AcceptTask action has stopped executing
  console.log("PreviewChannel - afterAcceptTask, payload", payload);

  if (payload.task) {
    const previewTask: ITask = payload.task;
    if (previewTask.channelType == TASK_CHANNEL_PREVIEW) {
      if (previewTask.attributes?.destination) {
        Actions.invokeAction("StartOutboundCall", {
          destination: previewTask.attributes.destination,
        }).then(() => {
          Actions.invokeAction("CompleteTask", { sid: previewTask.sid });
        });
      } else {
        console.error("Preview Task missing destination task attribute");
      }
    } else {
      console.debug("Task channel is not preview");
    }
  }
});

channel.componentProps;

export default channel;
