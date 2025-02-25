import { registerPlugin, type RPCCallPayload } from '@pexip/plugin-api'

const plugin = await registerPlugin({
  id: 'rx-presentation',
  version: 0
})

const denyRxButtonPayload: RPCCallPayload<'ui:button:add'> = {
  position: 'participantActions',
  label: 'Deny receive presentation'
}

const allowRxButtonPayload: RPCCallPayload<'ui:button:add'> = {
  position: 'participantActions',
  label: 'Allow receive presentation'
}

const denyRxButton = await plugin.ui.addButton(denyRxButtonPayload)
const allowRxButton = await plugin.ui.addButton(allowRxButtonPayload)

denyRxButton.onClick.add(async ({ participantUuid }) => {
  const payload = {
    path: "participants/" + participantUuid + "/denyrxpresentation",
    method: "POST",
    payload: {}
  };
  await plugin.conference.sendRequest(payload);
})

allowRxButton.onClick.add(async ({ participantUuid }) => {
  const payload = {
    path: "participants/" + participantUuid + "/allowrxpresentation",
    method: "POST",
    payload: {}
  };
  await plugin.conference.sendRequest(payload);
})

plugin.events.participants.add(({ participants }) => {
  const allowedRxParticipants = participants
    .filter((participant) => participant.rxPresentation)
    .map((participant) => participant.uuid)

  const deniedRxParticipants = participants
    .filter((participant) => !participant.rxPresentation)
    .map((participant) => participant.uuid)

  denyRxButton
    .update({
      ...denyRxButtonPayload,
      participantIDs: allowedRxParticipants
    })
    .catch(console.error)

  allowRxButton
    .update({
      ...allowRxButtonPayload,
      participantIDs: deniedRxParticipants
    })
    .catch(console.error)
})
