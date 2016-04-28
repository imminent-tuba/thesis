from setuptools import setup

setup(name='tubachatbot',
      version='0.1',
      description='chatbot with a personality',
      url='https://github.com/imminent-tuba/thesis.git',
      author='imminent-tuba',
      license='MIT',
      packages=[],
      install_requires=[
          'chatterbot',
          'python-levenshtein'
      ],
      zip_safe=False)