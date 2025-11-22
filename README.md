# image2oled

A web-based tool to convert images into C `PROGMEM` arrays for OLED displays.  
Supports multiple dithering methods (Threshold, Floyd–Steinberg, Atkinson, Bayer, JJN, Stucki) and various OLED resolutions.

Try it online: https://nipundharmarathne.github.io/image2oled/

If you find this tool helpful, consider supporting its development:

<p>
  <a href="https://github.com/sponsors/NipunDharmarathne" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-Sponsor-181717?logo=github&style=for-the-badge" alt="GitHub Sponsors" width="150" style="vertical-align:middle;" />
  </a>
  &nbsp;&nbsp;
  <a href="https://buymeacoffee.com/nipundharmarathne" target="_blank">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me a Coffee" width="150" style="vertical-align:middle;" />
  </a>
</p>



## Features

- Upload any image and resize to OLED-compatible resolutions.
- Preview different dithering techniques.
- Generate ready-to-use C `PROGMEM` arrays.
- Copy output directly to clipboard.



## Usage

1. Open the online tool in your browser: https://nipundharmarathne.github.io/image2oled/
2. Upload an image.
3. Choose the desired OLED resolution.
4. Select a dithering method to preview.
5. Click Generate C PROGMEM Array.
6. Copy the generated array and paste it into your Arduino or microcontroller project.



## Supported Resolutions

- 128×64, 128×32, 96×64, 64×48, 64×32, 32×32, 128×128, 256×64



## Dithering Algorithms

- Threshold
- Floyd–Steinberg
- Atkinson
- Bayer 4×4
- JJN
- Stucki



## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



