from chatterbot import ChatBot
import threading
import json
import sys

threaded = True
botID = sys.argv[1]
trainList = []

bot = ChatBot(
  "My ChatterBot",
  storage_adapter="chatterbot.adapters.storage.MongoDatabaseAdapter",
  logic_adapter="chatterbot.adapters.logic.ClosestMatchAdapter",
  io_adapter="chatterbot.adapters.io.NoOutputAdapter",
  database=sys.argv[2]
)

if sys.argv[3] == 1:
  bot.train("chatterbot.corpus.english")

from socketIO_client import SocketIO, BaseNamespace

HOST = "127.0.0.1"
PORT = 1234

socketIO = SocketIO(HOST, PORT)

def connect():
  print('chatterbot connected')
  sys.stdout.flush()

def training(msg):
  global trainList
  if msg != 'end':
    trainList.append(msg)
  else:
    bot.train(trainList)
    trainList = []

def chat(ID, msg):
  msg = bot.get_response(msg)
  toSend = {'id': ID, 'message': msg.rstrip()}
  print('outgoing: ', toSend)
  sys.stdout.flush()
  socketIO.emit('chat', json.dumps(toSend))

def on_chat(msg):
  msg = json.loads(msg)
  print('incoming : ', msg)
  sys.stdout.flush()
  if threaded:
    r = threading.Thread(target=chat, args=([msg['id'], msg['message']]))
    r.start()
  else:
    chat(msg)

def sendID():
  socketIO.emit('botID', botID)

socketIO.on('chat', on_chat)
socketIO.on('train', training)
socketIO.on('connect', connect)
socketIO.on('botID', sendID)

socketIO.wait()