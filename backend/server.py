import requests
from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS
from datetime import datetime
from dotenv import load_dotenv
import google.generativeai as genai
import os

load_dotenv()
api_key=os.getenv('GEMINI_API_KEY')

genai.configure(api_key=api_key)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)


# Database connection
client = MongoClient("mongodb://localhost:27017/")
# mongo = client.<database>
mongo = client.laptopwizard

@app.route('/get-msgs', methods=['GET'])
def getmsgs():
    # Access the 'user' collection
    users_collection = mongo['user']
    
    # Find the user with the given email
    user = users_collection.find_one({"email": "user@gmail.com"})
    if user:
        msglist = [{"message": obj["message"], "sender": obj["sender"],  "timestamp": obj["timestamp"]} for obj in user['messages']]
        # print(msglist)
        return jsonify({"message": "Success", "messages": msglist}), 200
    else:
        return jsonify({"error": "User not found"}), 404

@app.route('/ask-query', methods=['POST'])
def ask_query():
    data = request.json
    messages = data.get('messages')
    question = data.get('question')
    model = genai.GenerativeModel("gemini-1.5-flash")
    summarization_prompt =  """
        summarize the chat history. only summarize that message content of the user and chatbot. For example:
        [
        {
        sender: user,
        message: <question 1>
        },
        {
        sender: chatbot,
        message: <answer>
        },
        {
        sender: user,
        message: <question 2>
        },
        {
        sender: chatbot,
        message: <answer>
        },
        ]

        Return summary in json format, not plaintext.
    """
    summarized_context = model.generate_content(f"Context: {messages}\n{summarization_prompt}\nIf context is empty,simply return 'Empty'.")
    combined_input = f"Context: {summarized_context.text}\nQuestion: {question}\nIf context provided is 'Empty', just answer like you normally would, don't mention anything about context, just answer the question."
    response = model.generate_content(combined_input)
    # response = model.generate_content(question)
    return jsonify({"answer": response.text})

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
    
    if user:
        if (user['password'] == password):
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