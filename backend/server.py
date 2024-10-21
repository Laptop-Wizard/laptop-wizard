import requests
from langchain.prompts import PromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from datetime import datetime
from dotenv import load_dotenv
from langchain.text_splitter import RecursiveCharacterTextSplitter
import google.generativeai as genai
from langchain_community.vectorstores import FAISS
import os
from PyPDF2 import PdfReader

load_dotenv()
api_key=os.getenv('GEMINI_API_KEY')
# os.getenv("GOOGLE_API_KEY")
# genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

genai.configure(api_key=api_key)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)


# Database connection
client = MongoClient("mongodb://localhost:27017/")
# mongo = client.<database>
mongo = client.laptopwizard

def get_text_chunks(text):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=10000, chunk_overlap=1000)
    chunks = text_splitter.split_text(text)
    return chunks

# @app.route('/process', methods=['POST'])
def process_pdf():
    print("Hello from process_pdf")
    try:
        # pdf_docs = request.files.getlist('file')
        filepath = os.path.join(os.path.dirname(__file__),'issues.pdf')
        # pdf_docs =  get_pdf_text('file')
        # raw_text = get_pdf_text(pdf_docs)
        raw_text = get_pdf_text(filepath)
        text_chunks = get_text_chunks(raw_text)

        # Debug information
        print("Length of text_chunks:", len(text_chunks))
        print("Contents of text_chunks:", text_chunks)

        get_vector_store(text_chunks)
        return jsonify({'message': 'Processing completed'})
    except Exception as e:
        print(f"Error in process_pdf: {e}")
        return jsonify({'error': 'Internal Server Error'})

# def get_conversational_chain():
#     prompt_template = """
#     Answer the question as detailed as possible from the provided context, make sure to provide all the details, if the answer is not in
#     provided context just say, "answer is not available in the context", don't provide the wrong answer\n\n
#     Context:\n {context}?\n
#     Question: \n{question}\n

#     Answer:
#     """
#     model = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.3)
#     prompt = PromptTemplate(template=prompt_template,
#                             input_variables=["context", "question"])
#     chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)
#     return chain


# test comment
# def user_input(user_question):
#     # Load GoogleGenerativeAIEmbeddings
#     embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
#     new_db = FAISS.load_local(
#         "faiss_index", embeddings, allow_dangerous_deserialization=True)
#     docs = new_db.similarity_search(user_question)
#     # chain = get_conversational_chain()
#     # response = chain.invoke(
#         # {"input_documents": docs, "question": user_question}, return_only_outputs=True)
#     print(docs)
#     # return response["output_text"]
#     return docs

def user_input(user_question):
    # Load GoogleGenerativeAIEmbeddings and FAISS
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    new_db = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)
    
    # Perform similarity search to find relevant document chunks
    docs = new_db.similarity_search(user_question)
    
    # Combine the retrieved documents into a context for the model
    # Limit the context to ensure it fits within the model's token limit
    context = "\n".join([doc.page_content for doc in docs[:5]])  # Example: Taking the top 5 chunks
    
    return context  # Return relevant chunks as context

def get_pdf_text(file_path):
    reader = PdfReader(file_path)
    text = ''
    for page in reader.pages:
        text += page.extract_text()
    return text

def get_vector_store(text_chunks):
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    # Remove the insecure setting
    vector_store = FAISS.from_texts(text_chunks, embedding=embeddings)
    # vector_store = FAISS.from_texts(text_chunks, embedding=embeddings,allow_dangerous_deserialization=True)  # Remove the insecure setting
    vector_store.save_local("faiss_index")

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
    # process_pdf()
    data = request.json
    messages = data.get('messages')
    question = data.get('question')

    # Retrieve relevant chunks based on the user's question
    relevant_chunks = user_input(question)

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
    # filepath = os.path.join(os.path.dirname(__file__),'issues.pdf')
    # pdf_text = get_pdf_text(filepath)
    # print(pdf_text)
    summarized_messages = model.generate_content(f"Context: {messages}\n{summarization_prompt}\nIf context is empty,simply return 'Empty'.")
    combined_input = (
        f"Chat history: {summarized_messages.text}\n"
        f"Use the above chat history to remember past conversations."
        f"Relevant Information from Document: {relevant_chunks}\n"
        f"Question: {question}\n"
        f"If solution to the question is found within the provided document, return that."
        f"If not, answer the question as you normally would."
        f"Don't mention anything about the context."
    )
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