from application import app,mongo
from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash



@app.route("/register", methods=["POST"])
def register():
    # Get the data from the request (from React frontend)
    data = request.get_json()
    
    # Extract user details
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Basic validation
    if not username or not password:
        return jsonify({"error": "Missing username or password"}), 400

    # Check if the user already exists
    existing_user = mongo.db.users.find_one({"username": username})
    if existing_user:
        return jsonify({"error": "User already exists"}), 400

    # Hash the password and insert the user into the database
    hashed_password = generate_password_hash(password)
    mongo.db.users.insert_one({
        "username": username,
        "email":email,
        "password": hashed_password
    })

    return jsonify({"message": "User registered successfully"}), 201




# Login logic



@app.route("/login", methods=["POST"])
def login():
    # Get the data from the request (from React frontend)
    data = request.get_json()

    # Extract user details
    username = data.get('username')
    password = data.get('password')

    # Basic validation
    if not username or not password:
        return jsonify({"error": "Missing username or password"}), 400

    # Fetch the user from the database
    user = mongo.db.users.find_one({"username": username})
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Check if the provided password matches the hashed password
    if not check_password_hash(user["password"], password):
        return jsonify({"error": "Invalid credentials"}), 401

    return jsonify({"message": "Login successful", "username": username}), 200


# gemini API

def process_query_with_gemini(query):
    # Replace with your Gemini API key
    api_key = "AIzaSyDAGgewYDmpe1nmfvJq9QRhB4h9_0wIc6Y"

    # Construct the API request URL
    url = "https://api.gemini.com/chat"

    # Set the headers with the API key
    headers = {
        "Authorization": f"Bearer {api_key}"
    }

    # Send the POST request with the query
    data = {
        "query": query
    }
    response = requests.post(url, headers=headers, json=data)

    # Extract the response from the API
    api_response = response.json()
    return api_response['response']




@app.route('/chatbot', methods=['POST'])
def chatbot():
    # Get the user query from the request body
    user_query = request.json['query']

    # Process the query using the Gemini API
    response = process_query_with_gemini(user_query)

    # Return the response to the frontend
    return jsonify({'response': response})




@app.route("/")
def index():
    mongo.db.user.insert_one({"ayush": 12345678})
    return "<h1>Hello World</h1>"

