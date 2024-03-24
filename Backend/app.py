from flask import Flask, request, jsonify
from flask_cors import CORS
import pymongo
from base64 import b64encode , b64decode
from bson import ObjectId



app = Flask(__name__)
CORS(app)

# Connexion à MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["projetmobile"]
collection = db["users"]
products_collection = db["products"]


@app.route('/API/signup', methods=['POST'])
def signup():
    name = request.form.get('name')
    email = request.form.get('email')
    password = request.form.get('password')
    userType = request.form.get('userType')
    termsAccepted = request.form.get('termsAccepted')

    # Construct the user document
    user_data = {
        'name': name,
        'email': email,
        'password': password,
        'userType': userType,
        'termsAccepted': termsAccepted
    }

    # Check if image data exists in the request
    if 'image' in request.files:
        image_data = request.files['image'].read()
        encoded_image = b64encode(image_data).decode('utf-8')
        user_data['image'] = encoded_image

    # Insert the data into the collection
    result = collection.insert_one(user_data)

    print("Data inserted with ID:", result.inserted_id)

    return jsonify('User inserted successfully')




@app.route('/API/login', methods=['GET'])
def login():
    email = request.args.get('email')
    password = request.args.get('password')
    user = collection.find_one({'email': email, 'password': password})

    if user:
        response_data = {
            'userId': str(user['_id']),  # Convert ObjectId to string
            'userType': user['userType']
        }

        return jsonify(response_data)
    else:
        return jsonify('Login failed')



## PRODUCTS ##

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


@app.route('/API/products/<category>', methods=['GET'])
def get_products_by_category(category):
    # Assuming you have retrieved products from MongoDB for the specified category
    products = products_collection.find({'category': category})

    # Convert MongoDB cursor to a list of dictionaries
    products_list = []
    for product in products:
        # Convert ObjectId to string
        product['_id'] = str(product['_id'])
        products_list.append(product)

    return jsonify(products_list)

@app.route('/API/products/all', methods=['GET'])
def get_all_products():
    products = products_collection.find({})
    products_list = []
    for product in products:
        product['_id'] = str(product['_id'])  # Convert ObjectId to string
        products_list.append(product)
    return jsonify(products_list)


@app.route('/API/user/<user_id>', methods=['GET'])
def get_user_by_id(user_id):
    user = collection.find_one({'_id': ObjectId(user_id)})
    if user:
        user['_id'] = str(user['_id'])
        return jsonify(user)
    else:
        return jsonify({'error': 'User not found'}), 404



@app.route('/API/articles/<seller_id>', methods=['GET'])
def get_articles_by_seller(seller_id):
    products = products_collection.find({'id_Seller': seller_id})
    products_list = []
    for product in products:
        product['_id'] = str(product['_id'])  # Convert ObjectId to string
        products_list.append(product)
    return jsonify(products_list)

##  UPDATE PROFILE ##

@app.route('/API/update_profile/<user_id>', methods=['PUT'])
def update_profile(user_id):
    updated_profile = request.form.to_dict()
    image_file = request.files.get('image')
    if image_file:
        image_data = image_file.read()
        encoded_image = b64encode(image_data).decode('utf-8')  
        updated_profile['image'] = encoded_image

    result = collection.update_one({'_id': ObjectId(user_id)}, {'$set': updated_profile})
    if result.modified_count == 1:
        userType = get_user_type(user_id)

        # Construct response data with updated profile and userType
        response_data = {
            'message': 'Profile updated successfully',
            'userType': userType
        }
        return jsonify(response_data), 200
    else:
        return jsonify({'error': 'Failed to update profile'}), 500
    


## FONCTION TO RETURN THE USER TYPE ##
def get_user_type(user_id):
    user = collection.find_one({'_id': ObjectId(user_id)})
    if user:
        return user.get('userType')
    else:
        return None



@app.route('/API/sellers', methods=['GET'])
def get_seller_users():
    filtre = {"userType": "seller", "canSell": True}
    utilisateurs = collection.find(filtre)

    liste_utilisateurs = []
    for  utilisateur in utilisateurs:
        utilisateur['_id'] = str(utilisateur['_id'])  # Convert ObjectId to string
        liste_utilisateurs.append(utilisateur)
    
    return jsonify(liste_utilisateurs)

@app.route('/API/products/<product_id>', methods=['PUT'])
def update_product_quantity(product_id):
    new_quantity = request.json.get('quantity')
    result = products_collection.update_one(
        {'_id': ObjectId(product_id)},
        {'$set': {'quantity': new_quantity}}
    )

    if result.modified_count == 1:
        return jsonify({'message': 'Quantity updated successfully'}), 200
    else:
        return jsonify({'error': 'Failed to update quantity'}), 500

@app.route('/API/addseller', methods=['PUT'])
def add_seller():
    name = request.json.get('name')
    email = request.json.get('email')
    cansell = request.json.get('cansell')
    user = collection.find_one({'name': name, 'email': email , 'userType': seller})

    if user:
        result = collection.update_one({'_id': user['_id']}, {'$set': {'canSell': cansell}})
        return jsonify('Seller updated successfully')
    
    else:
        return jsonify('Seller not found'), 404

@app.route('/API/seller/<seller_id>', methods=['DELETE'])
def delete_seller(seller_id):
    # Supprimer le vendeur avec l'ID spécifié de la base de données
    result = collection.delete_one({'_id': ObjectId(seller_id)})
    if result.deleted_count == 1:
        return jsonify('Seller deleted successfully')
    else:
        return jsonify('Seller not found'), 404
if __name__ == "__main__":
    app.run(debug=True)
