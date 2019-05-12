export class MessageAppSettings {
  public static DOMAIN: string = 'http://localhost:8080';

  public static REQUEST_EVENTS = {
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

  public static RESPONSE_EVENTS = {
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
}
