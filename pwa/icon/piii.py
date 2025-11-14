from PIL import Image

img = Image.open("Lerri_wbg.png").convert("RGBA")
pixels = img.load()
width, height = img.size
cx, cy = width // 2, height // 2
radius = min(cx, cy)
border = 7  # numero di pixel da aggiungere per evitare il bordo bianco

for y in range(height):
    for x in range(width):
        r, g, b, a = pixels[x, y]
        dx, dy = x - cx, y - cy
        if a == 0 and dx*dx + dy*dy < (radius-border)*(radius-border):
            pixels[x, y] = (255, 255, 255, 255)

img.save("logo_outer_white.png")

icon_sizes = [(16,16),(32,32),(48,48),(64,64),(128,128),(256,256)]
img.save("favicon.ico", format="ICO", sizes=icon_sizes)
img.resize((512,512), Image.Resampling.LANCZOS).save("icon-512.png")
img.resize((192,192), Image.Resampling.LANCZOS).save("icon-192.png")
