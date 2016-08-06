from ipykernel.comm import Comm
from IPython.display import display, Javascript
from IPython.core.getipython import get_ipython
from traitlets import Instance, List, observe
from traitlets.config import LoggingConfigurable
import uuid

# Taken from ipywidgets callback pattern, cause its nice
class CallbackDispatcher(LoggingConfigurable):
    callbacks = List()

    def __call__(self, *args, **kwargs):
        value = None
        for callback in self.callbacks:
            try:
                local_value = callback(*args, **kwargs)
            except Exception as e:
                ip = get_ipython()
                if ip is None:
                    self.log.warn("Exception in callback %s: %s", callback, e, exc_info=True)
                else:
                    ip.showtraceback()
            else:
                value = local_value if local_value is not None else value
        return value

    def register_callback(self, callback, remove=False):
        # (Un)Register the callback.
        if remove and callback in self.callbacks:
            self.callbacks.remove(callback)
        elif not remove and callback not in self.callbacks:
            self.callbacks.append(callback)


class Component(LoggingConfigurable):
  comm = Instance('ipykernel.comm.Comm', allow_none=True)
  _module = None
  _msg_callbacks = Instance(CallbackDispatcher, ())

  @property
  def module(self):
      if self._module is not None:
          return self._module
      else:
          return self.__class__.__name__

  def __init__(self, target_name='jupyter.react', props={}, comm=None):
      self.target_name = target_name
      self.props = props
      if comm is None:
        self.open(props)
      else:
        self.comm = comm

  def open(self, props):
      props['module'] = self.module
      args = dict(target_name=self.target_name, data=props)
      args['comm_id'] = 'jupyter_react.{}.{}'.format( uuid.uuid4(), props['module'] )
      self.comm = Comm(**args)

  @observe('comm')
  def _comm_changed(self, change):
      if change['new'] is None:
          return
      self.comm.on_msg(self._handle_msg)
  
  def __del__(self):
      self.close()

  def close(self):
      if self.comm is not None:
          self.comm.close()
          self.comm = None
          self._ipython_display_ = None

  def send(self, data):
      self.comm.send( data )

  def _ipython_display_(self, **kwargs):
      self.send({"method": "display"})

  def _handle_msg(self, msg):
      if 'content' in msg:
          self._msg_callbacks(self, msg['content'], msg['buffers'])

  def on_msg(self, callback, remove=False):
      self._msg_callbacks.register_callback(callback, remove=remove)

