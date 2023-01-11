# Preview Dialing

A demo plugin to show a custom Task Channel named "preview", that will make an outbound call when the agent accepts the task.

It will only make an outbound call if a task attribute `destination` exists.

Once the outbound call is made it will complete the preview task

See `src/channel/Preview/PreviewChannel.tsx` for more details