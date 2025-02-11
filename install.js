module.exports = {
  run: [
    // Edit this step to customize the git repository to use
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/Zyphra/Zonos app",
        ]
      }
    },
    // Delete this step if your project does not use torch
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",                // Edit this to customize the venv folder path
          path: "app",                // Edit this to customize the path to start the shell from
          // xformers: true   // uncomment this line if your project requires xformers
        }
      }
    },
    // Edit this step with your custom install commands
    {
      method: "shell.run",
      params: {
        venv: "env",                // Edit this to customize the venv folder path
        path: "app",                // Edit this to customize the path to start the shell from
        message: [
          "uv pip install -e .",
          "{{platform === 'win32' ? 'uv pip install https://github.com/bdashore3/flash-attention/releases/download/v2.7.1.post1/flash_attn-2.7.1.post1+cu124torch2.5.1cxx11abiFALSE-cp310-cp310-win_amd64.whl' : ''}}",
          "uv pip install -e .[compile]"
        ]
      }
    },
//    {
//      method: "fs.link",
//      params: {
//        venv: "app/env"
//      }
//    },

    // espeak-ng installer script lifted from AllTalk Launcher from 6Morpheus6
    // https://github.com/pinokiofactory/AllTalk-TTS/blob/main/install.js
    {
      when: "{{which('brew')}}",
      method: "shell.run",
      params: {
        message: "brew install espeak-ng"
      },
      next: null
    },
    {
      when: "{{which('apt')}}",
      method: "shell.run",
      params: {
        sudo: true,
        message: "apt install libaio-dev espeak-ng"
      },
      next: null
    },
    {
      when: "{{which('yum')}}",
      method: "shell.run",
      params: {
        sudo: true,
        message: "yum install libaio-devel espeak-ng"
      },
      next: null
    },
    {
      when: "{{which('winget')}}",
      method: "shell.run",
      params: {
        sudo: true,
        message: "winget install --id=eSpeak-NG.eSpeak-NG -e --silent --accept-source-agreements --accept-package-agreements"
      }
    },
  ]
}
