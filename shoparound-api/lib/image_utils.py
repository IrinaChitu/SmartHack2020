from PIL import Image, ImageDraw, ImageFont


def get_image(rows_num, cols_num, matrix, start_pos, finish_pos, interest, path, index_path):
    patch_size = 80
    image = Image.new('RGB', (cols_num * patch_size + 1, rows_num * patch_size + 1))
    draw = ImageDraw.Draw(image)
    for i in range(rows_num):
        for j in range(cols_num):
            dark = (10, 10, 10)
            light = (230, 230, 230)
            fill_color = dark
            outline = light
            if matrix[i][j] == 0:
                fill_color = light
                outline = dark
            if (i, j) == start_pos:
                fill_color = (237, 184, 121)
            if (i, j) == finish_pos:
                fill_color = (50,205,50)
            draw.rectangle((j * patch_size, i * patch_size, (j + 1) * patch_size, (i + 1) * patch_size), fill=fill_color, outline=outline)

    def center(x, y, patch_size):
        return x * patch_size + patch_size // 2, y * patch_size + patch_size // 2

    for x, y in interest:
        cx, cy = center(x, y, patch_size)
        draw.ellipse((cy - patch_size // 4, cx - patch_size // 4, cy + patch_size // 4, cx + patch_size // 4), fill=(25, 120, 169))

    for i in range(len(path) - 1):
        xa, ya = path[i]
        xa, ya = center(xa, ya, patch_size)
        xb, yb = path[i + 1]
        xb, yb = center(xb, yb, patch_size)

        draw.line((ya, xa, yb, xb), fill=(255, 0, 0), width = patch_size // 8)

    font_size = 30
    font = ImageFont.truetype("/app/Arial.ttf", size=font_size)
    for i in range(1, len(index_path) - 1):
        x, y = interest[index_path[i] - 1]
        cx, cy = center(x, y, patch_size)
        draw.text((cy - font_size // 4, cx - font_size // 2), str(i), font=font, fill=(255, 255, 255))

    return image