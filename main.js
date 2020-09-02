
    var input = document.getElementById("image");
    var result = document.getElementById("result");
    input.addEventListener('change', (e) => {
        var file = URL.createObjectURL(e.target.files[0]);
        Jimp.read(file)
        .then(image => {
          var final = "";
          var width = image.bitmap.width;
          var height = image.bitmap.height;
          document.getElementById("width").textContent = "Width: " + width;
          document.getElementById("height").textContent = "Height: " + height;
          document.getElementById("colorbit").textContent = "Color Bits: " + 24;
            if(height > 128 || width > 128) {
                result.value = "Please use an image less than or euqal to 128x128 pixels!";
                return;
            }
            for(y = 0; y < height; y++) {
              for(x = 0; x < width; x++) {
              const {r, g, b, a} = Jimp.intToRGBA(image.getPixelColor(x, y));
              var hex = rgbToHex(r,g,b);
              final += hex;
            }
          }
          result.value = final;
        })
        .catch(err => {
          // Handle an exception.
          console.log(err)
        });
      
      });
      function rgbToHex(r, g, b) {
        return "" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
      }
