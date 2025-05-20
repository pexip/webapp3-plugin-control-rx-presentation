import {
  Button,
  InfinityParticipant,
  registerPlugin,
  type RPCCallPayload,
} from "@pexip/plugin-api";

const plugin = await registerPlugin({
  id: "rx-presentation",
  version: 0,
});

const denyRxButtonPayload: RPCCallPayload<"ui:button:add"> = {
  position: "participantActions",
  label: "Deny receive presentation",
};

const allowRxButtonPayload: RPCCallPayload<"ui:button:add"> = {
  position: "participantActions",
  label: "Allow receive presentation",
};

let isDirectMedia: boolean | undefined = undefined;

let participantList: Map<string, InfinityParticipant> = new Map();

const denyRxButton = await plugin.ui.addButton(denyRxButtonPayload);
const allowRxButton = await plugin.ui.addButton(allowRxButtonPayload);

denyRxButton.onClick.add(async ({ participantUuid }) => {
  const payload = {
    path: "participants/" + participantUuid + "/denyrxpresentation",
    method: "POST",
    payload: {},
  };
  await plugin.conference.sendRequest(payload);
  plugin.ui.showToast({
    message:
      "Denying receive presentation for " +
      participantList.get(participantUuid)?.displayName,
  });
});

allowRxButton.onClick.add(async ({ participantUuid }) => {
  const payload = {
    path: "participants/" + participantUuid + "/allowrxpresentation",
    method: "POST",
    payload: {},
  };
  await plugin.conference.sendRequest(payload);
  plugin.ui.showToast({
    message:
      "Allowing receive presentation for " +
      participantList.get(participantUuid)?.displayName,
  });
});

plugin.events.conferenceStatus.add(async ({ status }) => {
  isDirectMedia = status.directMedia;
});

const updateParticipantButtons = (participants: InfinityParticipant[]) => {
  const allowedRxParticipants = participants
    .filter((participant) => participant.rxPresentation && !isDirectMedia)
    .map((participant) => participant.uuid);

  const deniedRxParticipants = participants
    .filter((participant) => !participant.rxPresentation && !isDirectMedia)
    .map((participant) => participant.uuid);

  denyRxButton
    .update({
      ...denyRxButtonPayload,
      participantIDs: allowedRxParticipants,
    })
    .catch(console.error);

  allowRxButton
    .update({
      ...allowRxButtonPayload,
      participantIDs: deniedRxParticipants,
    })
    .catch(console.error);
};

plugin.events.participants.add(({ participants }) => {
  participantList = new Map();
  participants.forEach((participant) =>
    participantList.set(participant.uuid, participant)
  );
    updateParticipantButtons(participants);
});
