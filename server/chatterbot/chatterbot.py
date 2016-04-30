from chatterbot import ChatBot
import sys
import socket
import threading
import json

bot = ChatBot(
    "My ChatterBot",
    storage_adapter="chatterbot.adapters.storage.MongoDatabaseAdapter",
    logic_adapter="chatterbot.adapters.logic.ClosestMatchAdapter",
    io_adapter="chatterbot.adapters.io.NoOutputAdapter",
    database="test"
)

bot.train("chatterbot.corpus.english")

LOCALHOST = "127.0.0.1"
NODE_PORT = 41234
PY_PORT = 51234

def responseThread(data, socket):
    data['message'] = bot.get_response(data['message'])
    socket.sendto(json.dumps(data).encode(encoding='UTF-8',errors='strict'), (LOCALHOST, NODE_PORT))

def socketListener():
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    server_address = (LOCALHOST, PY_PORT)
    sock.bind(server_address)
    print('starting up on %s port %s' % server_address)
    sys.stdout.flush()

    while True:
        data, address = sock.recvfrom(4096)
        
        if data:
            msg = json.loads(data.decode('utf-8'))
            responseThread(msg, sock)
            # r = threading.Thread(target=responseThread, args=(data, sock))

socketListener()
# t = threading.Thread(target=socketListener)
# t.daemon = True
# t.start()

print('ready to chat')
sys.stdout.flush()

inputMode = 'respond'
for line in sys.stdin:
    if line == 'xxstartxx\n':
        inputMode = 'train'
        trainList = []
    elif line == 'xxendxx\n':
        inputMode = 'respond'
        bot.train(trainList)
        print('training finished')
        sys.stdout.flush()
    else:
        if inputMode == 'respond':
            bot.get_response(line)
        elif inputMode == 'train':
            trainList.append(line)
