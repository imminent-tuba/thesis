from chatterbot import ChatBot
import sys
import socket
import threading
import json

threaded = True

bot = ChatBot(
    "My ChatterBot",
    storage_adapter="chatterbot.adapters.storage.MongoDatabaseAdapter",
    logic_adapters=["chatterbot.adapters.logic.ClosestMeaningAdapter",
                    "chatterbot.adapters.logic.ClosestMatchAdapter"],
    io_adapter="chatterbot.adapters.io.NoOutputAdapter",
    database="test"
)

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
    print('chatbot on %s port %s' % server_address)
    sys.stdout.flush()

    while True:
        data, address = sock.recvfrom(4096)
        
        if data:
            msg = json.loads(data.decode('utf-8'))
            if threaded:
                r = threading.Thread(target=responseThread, args=(msg, sock))
                r.start()
            else:
                responseThread(msg, sock)

if threaded:
    t = threading.Thread(target=socketListener)
    t.daemon = True
    t.start()
else:
    socketListener()

print('ready to chat')
sys.stdout.flush()

for line in sys.stdin:
    if line == 'xxstartxx\n':
        trainList = []
    elif line == 'xxendxx\n':
        bot.train(trainList)
        print('training finished')
        sys.stdout.flush()
    elif line == 'xxinitxx\n':
        bot.train("chatterbot.corpus.english")
        print('bot initialized with english')
        sys.stdout.flush()
