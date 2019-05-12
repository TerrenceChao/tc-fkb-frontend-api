export const ResponseEvents = {
  // Personal info (to.USER)
  PERSONAL_INFO: 'personal_info',
  EXCEPTION_ALERT: 'exception_alert',

  // Invitation (realtime) (to.USER)
  INVITATION_TO_ME: 'invitation_to_me',
  // Invitation (non-realtime) (to.USER)
  INVITATION_LIST: 'invitation_list',

  // Channel (realtime) (to.USER)
  CHANNEL_CREATED: 'channel_created',
  CHANNEL_REMOVED: 'channel_removed',
  // Channel (realtime) (to.CHANNEL / USER)
  CHANNEL_JOINED: 'channel_joined',
  CHANNEL_LEFT: 'channel_left',
  // Channel (non-realtime) (to.USER)
  CHANNEL_LIST: 'channel_list',

  // Conversation (realtime) (to.CHANNEL)
  CONVERSATION_FROM_CHANNEL: 'conversation_from_channel',
  // Conversation (non-realtime) (to.USER)
  CONVERSATION_LIST: 'conversation_list'
};

