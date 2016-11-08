from setuptools import setup

setup(name='jupyter-react',
      version='0.1.5',
      description='React component extension for Jupyter Notebooks',
      url='https://github.com/timbr-io/jupyter-react',
      author='Chris Helm',
      author_email='chelm@timbr.io',
      license='MIT',
      packages=['jupyter_react'],
      zip_safe=False,
      install_requires=[
          "ipython",
          "traitlets"
        ]
      )
