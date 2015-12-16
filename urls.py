# You should import all your Resources and put them here in a tuple of the form:
# urlpatterns = [
#     ('url/to/my/resource', MyResource),
# ]
from lupulo.http import LupuloResource
from lupulo.tests.backend.benchmarking import BenchmarkingResource
from lupulo.listeners_manager import listeners_manager

from settings import settings

class Move(LupuloResource):
    def render_GET(self, request):
        if settings['listener'] == 'serial':
            serial = listeners_manager.get_actual_listener().get_serial_port()
            for key, value in request.args.items():
                if key in ['forward', 'backward', 'left', 'right', 'stop']:
                    serial.write(key[0])
                    return "Moved " + key
        return "The listener is not the serial port."

urlpatterns = [
    ('move', Move),
    ('benchmarking', BenchmarkingResource)
]
