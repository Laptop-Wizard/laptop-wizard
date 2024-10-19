import requests
from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS
from datetime import datetime
import google.generativeai as genai
import os

# AIzaSyDAGgewYDmpe1nmfvJq9QRhB4h9_0wIc6Y
genai.configure(api_key="AIzaSyDAGgewYDmpe1nmfvJq9QRhB4h9_0wIc6Y")

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)


# Database connection
client = MongoClient("mongodb://localhost:27017/")
# mongo = client.<database>
mongo = client.laptopwizard

# test
@app.route('/get-data', methods=['GET'])
def get_laptops():
    user_collection = mongo['user'] # fetch 'user' collection
    users = user_collection.find() # get all documents, returns a cursor

    data = list(users) # convert to a list for convenience
    user_list = []
    for userdata in data:
        user_list.append(userdata['email']) # get email field in each document

    return jsonify(user_list)

@app.route('/get-msgs', methods=['GET'])
def getmsgs():
    # Access the 'user' collection
    users_collection = mongo['user']
    
    # Find the user with the given email
    user = users_collection.find_one({"email": "user@gmail.com"})
    if user:
        msglist = [{"message": obj["message"], "sender": obj["sender"],  "timestamp": obj["timestamp"]} for obj in user['messages']]
        print(msglist)
        return jsonify({"message": "Success", "messages": msglist}), 200
    else:
        return jsonify({"error": "User not found"}), 404

@app.route('/ask-query', methods=['POST'])
def ask_query():
    data = request.json
    question = data.get('question')
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(question)
    print(response.text)
    return jsonify({"answer": response.text})

    # Define the Gemini API endpoint and parameters
    # AIzaSyDAGgewYDmpe1nmfvJq9QRhB4h9_0wIc6Y
    api_url = "https://api.gemini.com/v1/query"  # Replace with the correct Gemini API endpoint
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer AIzaSyDAGgewYDmpe1nmfvJq9QRhB4h9_0wIc6Y'  # Replace with your actual token
    }
    payload = {
        "query": question  # Adjust this based on Gemini's API documentation
    }

    try:
        # Send a request to the Gemini API
        response = requests.post(api_url, json=payload, headers=headers)

        if response.status_code == 200:
            # Return the response data from Gemini API
            response_data = response.json()
            return jsonify({"answer": response_data}), 200
        else:
            # Handle non-200 responses from Gemini API
            return jsonify({"error": "Failed to get a valid response from Gemini API"}), response.status_code

    except requests.exceptions.RequestException as e:
        # Handle request exceptions
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    

@app.route('/upload-msg', methods=['POST'])
def upload_msg():
    data = request.json
    message = data.get('message')
    sender = data.get('sender')
    
    # Access the 'user' collection
    users_collection = mongo['user']
    
    # Find the user with the given email
    user = users_collection.find_one({"email": "user@gmail.com"})
    timestamp = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
    message_object = {
        "sender": sender,
        "message": message,
        "timestamp": timestamp,
    }
    if user:
        # Append the message to the 'messages' array
        users_collection.update_one(
            {"email": "user@gmail.com"},   # The user to update
            {"$push": {"messages": message_object}}  # Append the new message to the 'messages' array
        )
        return jsonify({"message": "Message added successfully"}), 200
    else:
        return jsonify({"error": "User not found"}), 404

@app.route('/login', methods=['POST'])
def signup():
    data = request.json  # Get the JSON data from the request body
    email = data.get('email')
    password = data.get('password')
    users_collection = mongo['user']
    
    # You can now save this user data to your MongoDB (or any other DB)
    user = users_collection.find_one({"email": email})
    print("Reached")
    
    if user:
        if (user['password'] == password):
            user_messages = user['messages']
            return jsonify(
                {"message": "Login successful", 
                 "user": user['email'],
                 "messages": user['messages']
                }), 200
        else:
            return jsonify({"error": "Incorrect password"}), 401
    else:
        return jsonify({"error": "User not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)