from setuptools import setup

setup(name='HR chatterbot',
      version='0.1',
      description='chatbot with a personality',
      url='https://github.com/imminent-tuba/thesis.git',
      author='imminent-tuba',
      license='MIT',
      packages=['funniest'],
      install_requires=[
          'chatterbot',
          'python-levenshtein'
      ],
      zip_safe=False)