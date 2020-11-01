from flask import Flask, request, jsonify
from lib import matrix_utils

app = Flask(__name__)

@app.route('/getimage/', methods=['POST'])
def respond():
    rows_num = request.form.get("rows_num")
    cols_num = request.form.get("cols_num")
    start_pos = request.form.get("start_pos")
    finish_pos = request.form.get("finish_pos")
    shelves = request.form.get("shelves")
    interest = request.form.get("interest")

    matrix = matrix_utils.get_matrix(rows_num, cols_num, shelves)
    total_cost, path = matrix_utils.solve_hamiltonian_path(start_pos, finish_pos, interest, matrix)

    # For debugging
    # print(f"")

    response = {}
    response["total_cost"] = total_cost
    response["path"] = path

    # # Check if user sent a name at all
    # if not name:
    #     response["ERROR"] = "no name found, please send a name."
    # # Check if the user entered a number not a name
    # elif str(name).isdigit():
    #     response["ERROR"] = "name can't be numeric."
    # # Now the user entered a valid name
    # else:
    #     response["MESSAGE"] = f"Welcome {name} to our awesome platform!!"

    # Return the response in json format
    return jsonify(response)

@app.route('/post/', methods=['POST'])
def post_something():
    param = request.form.get('name')
    print(param)
    # You can add the test cases you made in the previous function, but in our case here you are just testing the POST functionality
    if param:
        return jsonify({
            "Message": f"Welcome {param} to our awesome platform!!",
            # Add this option to distinct the POST request
            "METHOD" : "POST"
        })
    else:
        return jsonify({
            "ERROR": "no name found, please send a name."
        })

# # A welcome message to test our server
# @app.route('/')
# def index():
#     return "<h1>Welcome to our server !!</h1>"

if __name__ == '__main__':
    app.run(threaded=True, port=5000)