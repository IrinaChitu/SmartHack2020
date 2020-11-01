import io
from flask import Flask, request, jsonify, send_file
from lib import matrix_utils, image_utils

app = Flask(__name__)

@app.route('/getimage/', methods=['POST'])
def respond():
    print(request.json)
    rows_num = int(request.json.get("rows_num"))
    cols_num = int(request.json.get("cols_num"))
    start_pos_arr = request.json.get("start_pos")
    start_pos = (int(start_pos_arr[0]), int(start_pos_arr[1]))
    finish_pos_arr = request.json.get("finish_pos")
    finish_pos = (int(finish_pos_arr[0]), int(finish_pos_arr[1]))
    shelves = [(int(shelf[0]), int(shelf[1])) for shelf in request.json.get("shelves")]
    interest = [(int(var[0]), int(var[1])) for var in request.json.get("interest")]

    matrix = matrix_utils.get_matrix(rows_num, cols_num, shelves)
    index_path, total_cost, path = matrix_utils.solve_hamiltonian_path(start_pos, finish_pos, interest, matrix)

    image = image_utils.get_image(rows_num, cols_num, matrix, start_pos, finish_pos, interest, path, index_path)
    file_object = io.BytesIO()
    image.save(file_object, 'PNG')
    file_object.seek(0)
    return send_file(file_object, mimetype='image/PNG')

    # response = {}
    # response["total_cost"] = total_cost
    # response["path"] = path

    # return jsonify(response)

if __name__ == '__main__':
    app.run(threaded=True, port=5000)