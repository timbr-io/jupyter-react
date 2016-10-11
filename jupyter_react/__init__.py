from .component import *

def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'static',
        'dest': 'jupyter_react',
        'require': 'jupyter_react/index'
    }]
