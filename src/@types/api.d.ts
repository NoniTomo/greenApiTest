interface ChatData {
  chatId: string
  message: string
  quotedMessageId: string
}

type StateInstance = 'yellowCard' | 'starting' | 'sleepMode' | 'blocked' | 'authorized' | 'notAuthorized'
interface GetStateInstanceResponse {
  stateInstance: StateInstance
}

type GetReceiveNotificationResponse = {
  receiptId: number
  body: {
    typeWebhook: string
    instanceData: {
      idInstance: number
      wid: string
      typeInstance: string
    }
    timestamp: number
    idMessage: string
    senderData: {
      chatId: string
      sender: string
      senderName: string
      senderContactName: string
    }
    messageData?:
      | {
          typeMessage: string
          extendedTextMessageData: {
            text: string
          }
        }
      | {
          typeMessage: string
          textMessageData: {
            textData: string
          }
        }
  }
} | null

interface SendMessageRequest {
  chatId: string
  message: string
  quotedMessageId?: string
}

interface SendMessageResponse {
  idMessage: string
}

interface MessageBody {
  instanceData: {
    idInstance: number
    wid: string
    typeInstance: string
  }
  timestamp: 1588091580
  idMessage: string
  senderData: {
    chatId: string
    sender: string
    senderName: string
    senderContactName: string
  }
  messageData: {
    typeMessage: string
    textMessageData: {
      textMessage: string
    }
  }
}

interface GetWaInstanceResponse {
  avatar: string
  phone: string
  stateInstance: StateInstance
  deviceId: string
}
