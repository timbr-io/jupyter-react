from setuptools import setup
from setuptools.command.develop import develop as _develop
from setuptools.command.install import install as _install
from notebook.nbextensions import install_nbextension
from notebook.services.config import ConfigManager
import os

project_name = "jupyter_react"

extension_dir = os.path.join(os.path.dirname(__file__), project_name, "static")

class develop(_develop):
    def run(self):
        _develop.run(self)
        install_nbextension(extension_dir, symlink=True,
                            overwrite=True, user=False, destination=project_name)
        cm = ConfigManager()
        cm.update('notebook', {"load_extensions": {"jupyter_react/index": True } })

class install(_install):
    def run(self):
        _install.run(self)
        cm = ConfigManager()
        cm.update('notebook', {"load_extensions": {"jupyter_react/index": True } })

setup(name='jupyter-react',
      cmdclass={'develop': develop, 'install': install},
      version='0.0.1',
      description='React component extension for Jupyter Notebooks',
      url='https://github.com/timbr-io/jupyter-react',
      author='Chris Helm',
      author_email='chelm@timbr.io',
      license='MIT',
      packages=['jupyter_react'],
      zip_safe=False,
      data_files=[
        ('share/jupyter/nbextensions/ju', [
            'jupyter_react/static/index.js'
        ]),
      ],
      install_requires=[
          "ipython",
          "traitlets"
        ]
      )
