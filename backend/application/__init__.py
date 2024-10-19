from flask import Flask
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Database connection
client = MongoClient("mongodb://localhost:27017/")
mongo = client.laptopwizard

from application import routes