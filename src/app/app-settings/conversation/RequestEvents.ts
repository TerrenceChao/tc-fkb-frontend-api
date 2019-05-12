export const RequestEvents = {
  // AuthenticationManager
  LOGIN: 'req_authentication_login',
  LOGOUT: 'req_authentication_logout',
  EXTEND_VALIDITY: 'req_authentication_extend_validity',

  // ChannelManager
  GET_CHANNEL_LIST: 'req_channel_get_channel_list',
  CREATE_CHANNEL: 'req_channel_create_channel',
  JOIN_CHANNEL: 'req_channel_join_channel',
  LEAVE_CHANNEL: 'req_channel_leave_channel',

  // ConversationManager
  COMPETE_LOCK: 'req_conversation_compete_lock',
  RELEASE_LOCK: 'req_conversation_release_lock',
  SEND_CONVERSATION: 'req_conversation_send_conversation',
  GET_CONVERSATION: 'req_conversation_get_conversation',
  // MARK_AS_READ: 'req_conversation_mark_as_read',

  // InvitationManager
  GET_INVITATION_LIST: 'req_invitation_get_invitation_list',
  SEND_INVITATION: 'req_invitation_send_invitation',
  DEAL_WITH_INVITATION: 'req_invitation_deal_with_invitation',
  CONFIRM_INVITATION: 'req_invitation_confirm_invitation',

  // MessageManager
  SEND_MESSAGE: 'req_message_send_message'
};

