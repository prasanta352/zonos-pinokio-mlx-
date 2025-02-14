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
        ]
      }
    },
    {
      when: "{{platform === 'win32'}}",
      method: "shell.run",
      params: {
        venv: "env",                // Edit this to customize the venv folder path
        path: "app",                // Edit this to customize the path to start the shell from
        build: true,
//        env: {
//          USE_NINJA: 0,
//          DISTUTILS_USE_SDK: 1,
//          NVCC_PREPEND_FLAGS: "-DWIN32_LEAN_AND_MEAN"
//        },
        message: [
          //"uv pip install mamba-ssm>=2.2.4",
          //"uv pip install git+https://github.com/Dao-AILab/causal-conv1d --no-build-isolation"
          "uv pip install https://github.com/woct0rdho/triton-windows/releases/download/v3.1.0-windows.post8/triton-3.1.0-cp310-cp310-win_amd64.whl",
          "uv pip install https://github.com/sdbds/Zonos-for-windows/releases/download/windows-wheel/mamba_ssm-2.2.4-cp310-cp310-win_amd64.whl",
          "uv pip install https://github.com/sdbds/Zonos-for-windows/releases/download/windows-wheel/causal_conv1d-1.5.0.post8-cp310-cp310-win_amd64.whl"
        ]
      }
    },
    {
      when: "{{platform !== 'win32'}}",
      method: "shell.run",
      params: {
        venv: "env",                // Edit this to customize the venv folder path
        path: "app",                // Edit this to customize the path to start the shell from
        message: [
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
