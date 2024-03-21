from flask import Flask, request, jsonify
from flask_cors import CORS
import pymongo
from base64 import b64encode


app = Flask(__name__)
CORS(app)

# Connexion à MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["projetmobile"]
collection = db["users"]
products_collection = db["products"]


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


@app.route('/API/add_article', methods=['POST'])
def add_article():
    data = request.form.to_dict() 
    # Convert price to a number
    data['price'] = float(data['price'])
    image_data = request.files['image'].read()
    encoded_image = b64encode(image_data).decode('utf-8')
    data['image'] = encoded_image
    products_collection.insert_one(data)
    return jsonify({"message": "Article added successfully"}), 200


if __name__ == "__main__":
    app.run(debug=True)
