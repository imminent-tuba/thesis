from chatterbot.adapters.io import IOAdapter
import socket
import sys
from queue import Queue

UDP_IP = "127.0.0.1"
UDP_PORT = 41234

class UDPAdapter(IOAdapter):
    """
    A simple adapter that allows ChatterBot to over upd sockets
    """

    def process_input(self, *args, **kwargs):
        return user_input

    def process_response(self, statement):
        print('responding')
        print(statement.text)
        sys.stdout.flush()
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sock.sendto(statement.text, (UDP_IP, UDP_PORT))
        return statement.text