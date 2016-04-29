from chatterbot import ChatBot
import sys

bot = ChatBot(
    "My ChatterBot",
    storage_adapter="chatterbot.adapters.storage.MongoDatabaseAdapter",
    logic_adapter="chatterbot.adapters.logic.ClosestMatchAdapter",
    io_adapter="chatterbot.adapters.io.TerminalAdapter",
    database="test"
)

bot.train("chatterbot.corpus.english")
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
