from flask import Flask, request, jsonify
from flask_cors import CORS
import pymongo

app = Flask(__name__)
CORS(app)

# Connexion à MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["projetmobile"]
collection = db["users"]



@app.route('/API/signup', methods=['POST'])
def signup():
    data = request.json  
    print(data)
    result = collection.insert_one(data)
    print("Data inserted with ID:", result.inserted_id)

    return jsonify('data inserted successful')

@app.route('/API/login', methods=['GET'])
def login():
    email = request.args.get('email')
    password = request.args.get('password')
    user = collection.find_one({'email': email, 'password': password})

    if user:
        return jsonify('Login successful')
    else:
        return jsonify('Login failed')

if __name__ == "__main__":
    app.run(debug=True)
