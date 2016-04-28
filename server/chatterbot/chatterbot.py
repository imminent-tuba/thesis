from chatterbot import ChatBot

bot = ChatBot(
    "My ChatterBot",
    storage_adapter="chatterbot.adapters.storage.MongoDatabaseAdapter",
    logic_adapters=["chatterbot.adapters.logic.ClosestMatchAdapter",
    "chatterbot.adapters.logic.ClosestMeaningAdapter",
    "chatterbot.adapters.logic.EvaluateMathematically",
    "chatterbot.adapters.logic.TimeLogicAdapter"],
    io_adapter="chatterbot.adapters.io.NoOutputAdapter",
    database="test"
)

bot.train("chatterbot.corpus.english")

print('begin dialogue')

while True:
    try:
        user_input = bot.get_input()
        bot_input = bot.get_response(user_input)
        print(bot_input)

    except (KeyboardInterrupt, EOFError, SystemExit):
        break